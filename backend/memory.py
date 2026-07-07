"""
memory.py
Expanded Brand Memory & RAG Knowledge Base
Stores brand profiles and past campaigns.
"""

import time
import json

# Advanced structured memory store
_brand_memory = {}
_campaign_history = []
_knowledge_base = {}

def add_knowledge_pdf(brand: str, text: str):
    """Store extracted PDF text into the knowledge base for RAG."""
    target = brand.lower().strip()
    if target not in _knowledge_base:
        _knowledge_base[target] = []
    _knowledge_base[target].append(text)

def search_knowledge_base(brand: str) -> str:
    """Retrieve concatenated knowledge base documents."""
    target = brand.lower().strip()
    docs = _knowledge_base.get(target, [])
    return "\n\n".join(docs)[:2000] if docs else ""

def remember_campaign(brand: str, product: str, audience: str, tone: str, full_json: str) -> None:
    """Store campaign details in the RAG knowledge base."""
    target = brand.lower().strip()
    
    if target not in _brand_memory:
        _brand_memory[target] = {
            "Brand": brand,
            "Audience": audience,
            "Products": set(),
            "Writing Style": "Professional",
            "Tone": tone,
            "Image Style": "Modern",
            "Competitors": [],
            "Marketing Preferences": "Data-driven"
        }
        
    _brand_memory[target]["Products"].add(product)
    
    _campaign_history.append({
        "brand": target,
        "product": product,
        "document": full_json,
        "created_at": time.time(),
    })

def get_brand_profile(brand: str) -> dict:
    """Retrieve the structured brand profile."""
    target = brand.lower().strip()
    if target in _brand_memory:
        profile = dict(_brand_memory[target])
        profile["Products"] = list(profile["Products"])
        return profile
    return {}

def recall_brand_context(brand: str, n_results: int = 3) -> list[str]:
    """RAG-style retrieval: Pull most recent campaigns for this brand."""
    target = brand.lower().strip()
    matches = [m["document"] for m in _campaign_history if m["brand"] == target]
    return matches[-n_results:] if matches else []

def brand_history_count(brand: str) -> int:
    target = brand.lower().strip()
    return sum(1 for m in _campaign_history if m["brand"] == target)

