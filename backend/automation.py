"""
automation.py
Sequential Workflow Engine handling the multi-agent pipeline.
"""
import os
import json
import time
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.units import inch
from reportlab.pdfgen import canvas

import agent
import tools
import memory

OUTPUT_DIR = os.getenv("OUTPUT_DIR", "./outputs")
LOG_PATH = os.path.join(OUTPUT_DIR, "experiment_log.json")
os.makedirs(OUTPUT_DIR, exist_ok=True)

class WorkflowEngine:
    def __init__(self):
        self.manager = agent.AgentManager()

    def run_campaign_workflow(self, brief: dict) -> dict:
        brand = brief.get("brand", "Unknown")
        product = brief.get("product", "Unknown")
        
        tools.logger(f"Campaign Started: {brand} - {product}")
        
        # 1. RAG Memory context
        context = tools.search_memory(brand, memory)
        
        # 2. Research Agent
        tools.logger("Research Agent Running")
        research = self.manager.run_research_agent(brief, context)
        tools.logger("Research Complete")
        
        # 3. Marketing Agent
        tools.logger("Marketing Agent Running")
        marketing = self.manager.run_marketing_agent(brief, research)
        tools.logger("Marketing Complete")
        
        # 4. Creative Agent
        tools.logger("Creative Agent Running")
        creative = self.manager.run_creative_agent(brief, marketing)
        
        # Guardrail check on creative outputs
        headline_flags = agent.guardrail_check(creative.get("headline", ""))
        body_flags = agent.guardrail_check(marketing.get("instagram_caption", ""))
        all_flags = headline_flags + body_flags
        tools.logger("Creative Complete")
        
        # 5. Landing Page Agent
        tools.logger("Landing Page Agent Running")
        landing_page = self.manager.run_landing_page_agent(brief, creative)
        tools.logger("Landing Page Complete")
        
        # 6. Operations Agent
        tools.logger("Operations Agent Running")
        operations = self.manager.run_operations_agent(brief)
        tools.logger("Operations Complete")
        
        payload = {
            "brief": brief,
            "research": research,
            "marketing": marketing,
            "creative": creative,
            "landing_page": landing_page,
            "operations": operations,
            "guardrail_flags": all_flags,
            "demo_mode": self.manager.demo_mode,
            "total_tokens_used": self.manager.total_tokens_used
        }
        
        # 7. Exports
        pdf_path = tools.export_pdf(brand, payload, self)
        tools.logger("PDF Generated")
        json_path = tools.export_json(brand, payload)
        tools.logger("JSON Generated")
        md_path = tools.export_markdown(brand, payload)
        tools.logger("Markdown Generated")
        
        payload["pdf_filename"] = os.path.basename(pdf_path)
        payload["json_filename"] = os.path.basename(json_path)
        payload["md_filename"] = os.path.basename(md_path)
        
        # 8. Update Brand Memory
        tools.save_memory(brand, payload, memory)
        tools.logger("Brand Memory Updated")
        
        # 9. Save Automation Log
        log_entry = self.log_experiment(brand, product, payload)
        payload["experiment_log_entry"] = log_entry
        
        tools.logger("Campaign Completed Successfully")
        
        return payload

    def export_campaign_pdf(self, brand: str, product: str, audience: str, tone: str, variants: list[dict]) -> str:
        safe_brand = "".join(c for c in brand if c.isalnum() or c in ("_", "-")) or "campaign"
        filename = f"{safe_brand}_brief_{int(time.time())}.pdf"
        path = os.path.join(OUTPUT_DIR, filename)

        c = canvas.Canvas(path, pagesize=LETTER)
        width, height = LETTER
        margin = 0.75 * inch
        y = height - margin

        c.setFont("Helvetica-Bold", 18)
        c.drawString(margin, y, f"Campaign Brief — {brand}")
        y -= 0.35 * inch

        c.setFont("Helvetica", 10)
        c.drawString(margin, y, f"Product: {product}    Audience: {audience}    Tone: {tone}")
        y -= 0.3 * inch
        c.line(margin, y, width - margin, y)
        y -= 0.3 * inch

        for i, v in enumerate(variants, start=1):
            if y < 1.5 * inch:
                c.showPage()
                y = height - margin
            c.setFont("Helvetica-Bold", 12)
            c.drawString(margin, y, f"Take {i:02d}: {v.get('headline', '')[:50]}")
            y -= 0.22 * inch
            c.setFont("Helvetica", 10)
            c.drawString(margin, y, v.get("body", "")[:100] + "...")
            y -= 0.18 * inch
            c.setFont("Helvetica-Oblique", 9)
            c.drawString(margin, y, f"Image direction: {v.get('image_prompt', '')[:100]}")
            y -= 0.3 * inch

        c.save()
        return path

    def log_experiment(self, brand: str, product: str, payload: dict) -> dict:
        entry = {
            "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
            "brand": brand,
            "product": product,
            "guardrail_flags": payload.get("guardrail_flags", []),
            "status": "completed",
        }
        log = []
        if os.path.exists(LOG_PATH):
            try:
                with open(LOG_PATH, "r") as f:
                    log = json.load(f)
            except Exception:
                pass
        log.append(entry)
        with open(LOG_PATH, "w") as f:
            json.dump(log, f, indent=2)
        return entry

def read_experiment_log() -> list[dict]:
    if not os.path.exists(LOG_PATH):
        return []
    try:
        with open(LOG_PATH, "r") as f:
            return json.load(f)
    except Exception:
        return []
