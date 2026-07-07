"""
agent.py
AgentManager orchestrating the 5 specialized AI Agents.
Includes extended guardrails (Prompt Injection, Medical, Financial, etc.)
"""

import os
import re
import json
import time

import prompts
import memory

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "").strip()
DEMO_MODE = not GEMINI_API_KEY

_model = None
if not DEMO_MODE:
    import google.generativeai as genai
    genai.configure(api_key=GEMINI_API_KEY)
    _model = genai.GenerativeModel("gemini-2.5-flash")

# ---- Extended Guardrails ------------------------------------------------

GUARDRAIL_PATTERNS = {
    "unsupported_claim": [
        r"\b#1\b", r"\bclinically proven\b", r"\bguaranteed\b", r"\bworld'?s best\b",
        r"\bcertified\b", r"\bpatented\b", r"\b100% (?:safe|effective|guaranteed)\b",
        r"\bscientifically proven\b", r"\bno\.?\s*1\b"
    ],
    "medical_claim": [
        r"\bcures\b", r"\bheals\b", r"\btreats\b", r"\bprevents cancer\b"
    ],
    "financial_claim": [
        r"\bget rich quick\b", r"\bguaranteed return\b", r"\bdouble your money\b", r"\bno risk\b"
    ],
    "profanity": [
        r"\bshit\b", r"\bfuck\b", r"\basshole\b", r"\bbitch\b" # rudimentary
    ],
    "prompt_injection": [
        r"\bignore all previous instructions\b", r"\bsystem prompt\b", r"\bbypass\b"
    ],
    "pii": [
        r"\b\d{3}-\d{2}-\d{4}\b",
        r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b"
    ]
}

def guardrail_check(text: str) -> list[str]:
    """Check text against all guardrail categories."""
    flags = []
    lowered = text.lower()
    for category, patterns in GUARDRAIL_PATTERNS.items():
        for pattern in patterns:
            if re.search(pattern, lowered):
                flags.append(f"{category}: {pattern.strip(r'\\b')}")
    return flags

def _clean_json_response(raw: str) -> str:
    raw = raw.strip().strip("`")
    if raw.startswith("json\n"):
        raw = raw[5:]
    return raw

# ---- AgentManager -------------------------------------------------------

class AgentManager:
    def __init__(self):
        self.demo_mode = DEMO_MODE
        self.total_tokens_used = 0

    def _call_agent(self, prompt: str, system_instruction: str, fallback_json: dict) -> dict:
        if self.demo_mode:
            time.sleep(1) # simulate work
            return fallback_json
            
        full_prompt = f"{system_instruction}\n\nTask:\n{prompt}"
        try:
            response = _model.generate_content(full_prompt)
            raw = _clean_json_response(response.text)
            if hasattr(response, "usage_metadata") and response.usage_metadata:
                self.total_tokens_used += getattr(response.usage_metadata, "total_token_count", 0)
            return json.loads(raw)
        except Exception as e:
            print(f"Agent error: {e}")
            return fallback_json

    def run_research_agent(self, brief: dict, context: list) -> dict:
        prompt = f"Brand: {brief['brand']}\nProduct: {brief['product']}\nAudience: {brief['audience']}\nContext: {context}"
        fallback = {
            "industry_research": f"Research on {brief['product']} industry.",
            "competitor_analysis": ["Competitor A", "Competitor B"],
            "swot": {"strengths": ["Strong brand"], "weaknesses": [], "opportunities": [], "threats": []},
            "customer_persona": {"demographics": brief['audience'], "psychographics": "Aspirational", "pain_points": ["Cost", "Time"]},
            "market_trends": ["Digital transformation", "AI adoption"]
        }
        return self._call_agent(prompt, prompts.RESEARCH_PROMPT, fallback)

    def run_marketing_agent(self, brief: dict, research: dict) -> dict:
        prompt = f"Brand: {brief['brand']}\nProduct: {brief['product']}\nTone: {brief['tone']}\nResearch: {json.dumps(research)}"
        fallback = {
            "google_ads": [{"headline": f"Buy {brief['product']}", "description": f"The best {brief['product']} from {brief['brand']}"}],
            "facebook_ads": [{"primary_text": f"Check out {brief['brand']}", "headline": "Limited Offer"}],
            "instagram_caption": f"Loving the new {brief['product']}! #ad #{brief['brand'].replace(' ', '')}",
            "linkedin_post": f"Excited to announce the launch of {brief['product']} by {brief['brand']}.",
            "email_campaign": {"subject": "New Release!", "body": "Check it out today."},
            "blog_outline": [f"Why {brief['product']}?", "Features", "Benefits", "Conclusion"]
        }
        return self._call_agent(prompt, prompts.MARKETING_PROMPT, fallback)

    def run_creative_agent(self, brief: dict, marketing: dict) -> dict:
        prompt = f"Brand: {brief['brand']}\nProduct: {brief['product']}\nTone: {brief['tone']}\nMarketing Ads: {json.dumps(marketing.get('google_ads'))}"
        fallback = {
            "headline": f"{brief['brand']}: The Future of {brief['product']}",
            "tagline": "Innovation realized.",
            "cta": "Buy Now",
            "creative_concepts": ["Concept 1: Futuristic", "Concept 2: Minimalist"],
            "image_prompt": f"Product shot of {brief['product']}, {brief['tone']} lighting, 4k.",
            "video_prompt": "Fast-paced montage of product features."
        }
        return self._call_agent(prompt, prompts.CREATIVE_PROMPT, fallback)

    def run_landing_page_agent(self, brief: dict, creative: dict) -> dict:
        prompt = f"Brand: {brief['brand']}\nProduct: {brief['product']}\nCreative: {json.dumps(creative)}"
        fallback = {
            "hero": {"headline": creative.get("headline", ""), "subheadline": creative.get("tagline", ""), "cta": creative.get("cta", "")},
            "features": [{"title": "Feature 1", "description": "Awesome feature"}],
            "benefits": ["Saves time", "Saves money"],
            "pricing": {"tier_name": "Pro", "price": "$99", "features": ["All features"]},
            "faq": [{"question": "Is it safe?", "answer": "Yes."}]
        }
        return self._call_agent(prompt, prompts.LANDING_PAGE_PROMPT, fallback)

    def run_operations_agent(self, brief: dict) -> dict:
        prompt = f"Brand: {brief['brand']}\nProduct: {brief['product']}"
        fallback = {
            "meeting_summary": "Campaign generated successfully.",
            "task_breakdown": ["Review copy", "Approve images", "Launch"],
            "email_draft": {"to": "marketing@team.com", "subject": "Campaign Ready", "body": "Please review."},
            "sop_generator": ["Step 1: Review", "Step 2: Deploy"]
        }
        return self._call_agent(prompt, prompts.OPERATIONS_PROMPT, fallback)
