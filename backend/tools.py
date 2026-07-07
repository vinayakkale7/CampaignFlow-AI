"""
tools.py
Reusable tools for the multi-agent system.
"""
import json
import os
import time

def search_memory(brand: str, memory_module) -> dict:
    """Retrieve past campaigns and knowledge base documents for a brand."""
    return {
        "past_campaigns": memory_module.recall_brand_context(brand, n_results=5),
        "knowledge_base": memory_module.search_knowledge_base(brand)
    }

def save_memory(brand: str, data: dict, memory_module) -> None:
    """Save newly generated campaign data back to memory."""
    # Serialize the data as a string for the simple text memory, or save as dict.
    document = json.dumps(data)
    memory_module.remember_campaign(brand, data.get('product', 'Unknown'), data.get('audience', 'Unknown'), data.get('tone', 'Unknown'), document)

def export_pdf(brand: str, data: dict, automation_module) -> str:
    """Export campaign results to PDF using the automation module."""
    # Wrap data into the old format expected by export_campaign_pdf for now
    variants = []
    if "creative" in data:
        variants.append({
            "headline": data["creative"].get("headline", ""),
            "body": data.get("marketing", {}).get("instagram_caption", ""),
            "image_prompt": data["creative"].get("image_prompt", "")
        })
    return automation_module.export_campaign_pdf(
        brand, 
        data.get("product", ""), 
        data.get("audience", ""), 
        data.get("tone", ""), 
        variants
    )

def export_json(brand: str, data: dict) -> str:
    """Export the entire campaign payload as a JSON file."""
    output_dir = os.getenv("OUTPUT_DIR", "./outputs")
    os.makedirs(output_dir, exist_ok=True)
    safe_brand = "".join(c for c in brand if c.isalnum() or c in ("_", "-")) or "campaign"
    filename = f"{safe_brand}_campaign_{int(time.time())}.json"
    path = os.path.join(output_dir, filename)
    with open(path, "w") as f:
        json.dump(data, f, indent=2)
    return path

def export_markdown(brand: str, data: dict) -> str:
    """Export the campaign payload as a Markdown document."""
    output_dir = os.getenv("OUTPUT_DIR", "./outputs")
    os.makedirs(output_dir, exist_ok=True)
    safe_brand = "".join(c for c in brand if c.isalnum() or c in ("_", "-")) or "campaign"
    filename = f"{safe_brand}_campaign_{int(time.time())}.md"
    path = os.path.join(output_dir, filename)
    
    md = f"# Campaign Brief: {brand}\n\n"
    for k, v in data.get("brief", {}).items():
        md += f"**{k.capitalize()}**: {v}\n"
    
    md += "\n## Research\n\n"
    md += f"{data.get('research', {}).get('industry_research', '')}\n"
    
    md += "\n## Creative Concept\n\n"
    md += f"**Headline**: {data.get('creative', {}).get('headline', '')}\n"
    md += f"**Visual**: {data.get('creative', {}).get('image_prompt', '')}\n"
    
    with open(path, "w", encoding="utf-8") as f:
        f.write(md)
    return path

def generate_image_prompt(model, headline: str, brand: str) -> str:
    """Use the LLM to generate an image prompt."""
    prompt = f"Write one image-generation prompt (max 40 words, no line breaks) for an ad creative for this headline: '{headline}'. Brand: {brand}."
    if model is None:
        return "Product shot in studio lighting, highly detailed, 4k."
    response = model.generate_content(prompt)
    return response.text.strip()

def generate_video_script(model, brand: str, product: str) -> str:
    """Use the LLM to generate a short video script."""
    prompt = f"Write a 15-second TikTok/Reels video script for {brand} promoting {product}."
    if model is None:
        return "Scene 1: Show product. Scene 2: Happy customer. Scene 3: Logo."
    response = model.generate_content(prompt)
    return response.text.strip()

def landing_page_builder(data: dict) -> str:
    """Convert JSON landing page data into HTML/Markdown."""
    hero = data.get("hero", {})
    return f"# {hero.get('headline', 'Welcome')}\n\n## {hero.get('subheadline', '')}\n\n[ {hero.get('cta', 'Click Here')} ]"

def logger(message: str) -> None:
    """Print to terminal log."""
    print(f"[{time.strftime('%H:%M:%S')}] {message}")
