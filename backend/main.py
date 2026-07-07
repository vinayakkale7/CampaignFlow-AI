"""
main.py - CampaignForge AI OS
Backend endpoints for the AI Marketing Operating System.
"""

import os
from dotenv import load_dotenv
load_dotenv(override=True)

from fastapi import FastAPI, HTTPException, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel

import memory
import automation
import agent
import pypdf

app = FastAPI(title="CampaignForge AI OS")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/knowledge/upload")
def upload_knowledge(brand: str = Form(...), file: UploadFile = File(...)):
    if not file.filename.endswith(".pdf"):
        raise HTTPException(400, "Only PDF files are supported")
    try:
        reader = pypdf.PdfReader(file.file)
        text = ""
        for page in reader.pages:
            text += page.extract_text() + "\n"
        memory.add_knowledge_pdf(brand, text)
        return {"status": "success", "pages_processed": len(reader.pages)}
    except Exception as e:
        raise HTTPException(500, f"Error processing PDF: {str(e)}")

class CampaignRequest(BaseModel):
    brand: str
    product: str
    industry: str = ""
    audience: str
    goal: str = ""
    platform: str = ""
    tone: str = "confident"
    notes: str = ""

@app.get("/api/health")
def health():
    return {"status": "ok", "demo_mode": agent.DEMO_MODE}

@app.post("/api/campaign/generate")
def generate_campaign(req: CampaignRequest):
    if not req.brand.strip() or not req.product.strip():
        raise HTTPException(400, "brand and product are required")

    engine = automation.WorkflowEngine()
    result = engine.run_campaign_workflow(req.dict())
    return result

@app.get("/api/campaign/history/{brand}")
def campaign_history(brand: str):
    profile = memory.get_brand_profile(brand)
    return {
        "brand": brand,
        "profile": profile,
        "past_campaigns": memory.recall_brand_context(brand, n_results=10),
        "total_campaigns": memory.brand_history_count(brand),
    }

@app.get("/api/experiments")
def experiments():
    return {"log": automation.read_experiment_log()}

@app.get("/api/download/{filename}")
def download(filename: str):
    path = os.path.join(os.getenv("OUTPUT_DIR", "./outputs"), filename)
    if not os.path.exists(path):
        raise HTTPException(404, "file not found")
    # Determine media type by extension
    media_type = "application/json" if filename.endswith(".json") else "application/pdf"
    return FileResponse(path, media_type=media_type, filename=filename)
