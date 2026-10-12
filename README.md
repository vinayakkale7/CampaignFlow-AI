# CampaignFlow AI
### AI-Powered Marketing Automation Platform

CampaignFlow AI is an AI-powered marketing automation platform designed to transform a campaign brief into structured marketing deliverables using specialized AI agents. The platform combines large language models, multi-agent workflows, and vector-based memory to streamline research, marketing strategy, creative content generation, and landing page copy.

Built using React, FastAPI, Google Gemini 2.0 Flash, and ChromaDB, CampaignFlow AI demonstrates how AI agents can collaborate to automate multiple stages of a marketing campaign.

## Key Features

- **Multi-Agent AI Workflow:** Coordinates specialized agents across different stages of campaign generation.
- **AI-Powered Research:** Generates industry research, competitor analysis, and market insights.
- **Marketing Content Generation:** Creates advertising copy, social media content, and email marketing content.
- **Creative Content Generation:** Generates campaign headlines, calls to action (CTAs), and AI image prompts.
- **Landing Page Content:** Produces structured landing page copy, including hero sections, feature descriptions, and CTAs.
- **Persistent Vector Memory:** Uses ChromaDB to store and retrieve campaign-related knowledge.
- **AI Guardrails:** Incorporates mechanisms intended to improve output reliability and reduce hallucinations.
- **Campaign Export:** Supports exporting generated campaign deliverables in PDF and JSON formats.
- **Interactive Dashboard:** Provides a centralized interface for campaign briefs, agent status, workflow progress, and campaign outputs.

## System Architecture

CampaignFlow AI uses a multi-agent workflow coordinated by a FastAPI backend and accessed through a React frontend.

### Workflow

1. **Campaign Brief:** Accepts the information needed to define the marketing campaign.
2. **Research Agent:** Generates research findings and competitor insights.
3. **Marketing Agent:** Develops advertising copy, social media content, and email marketing material.
4. **Creative Agent:** Produces headlines, CTAs, and image prompts.
5. **Landing Page Agent:** Generates structured landing page content.
6. **Brand Memory:** Uses ChromaDB for vector-based storage and retrieval of campaign-related knowledge.
7. **Campaign Export:** Makes campaign outputs available in PDF and JSON formats.

### Core Components

| Component | Responsibility |
|---|---|
| React Frontend | User interface for campaign creation and generated results |
| FastAPI Backend | API layer and backend workflow coordination |
| Research Agent | Industry research and competitor analysis |
| Marketing Agent | Advertising and promotional content |
| Creative Agent | Headlines, CTAs, and image prompts |
| Landing Page Agent | Structured landing page copy |
| ChromaDB | Vector storage and retrieval |
| ReportLab | PDF generation |
| JSON | Structured campaign output |

## Technology Stack

### Frontend
- React 18
- Babel Standalone
- Vanilla CSS
- Framer Motion

### Backend
- Python
- FastAPI
- Uvicorn

### AI and Agent Orchestration
- Google Gemini 2.0 Flash
- Prompt Engineering
- Multi-Agent Workflow

### Vector Database
- ChromaDB

### Export and Reporting
- ReportLab
- JSON

## Project Structure

```text
CampaignFlow-AI/
|
|-- backend/
|   |-- main.py
|   |-- agent.py
|   |-- automation.py
|   |-- memory.py
|   |-- prompts.py
|   |-- requirements.txt
|
|-- frontend/
|   |-- components/
|   |-- App.jsx
|   |-- main.jsx
|   |-- styles.css
|   |-- index.html
|
|-- README.md
```

## Getting Started

Follow these steps to run CampaignFlow AI locally.

### Prerequisites

- Python compatible with the backend dependencies
- pip
- Git
- Google Gemini API key

### 1. Clone the Repository

```bash
git clone https://github.com/vinayakkale7/CampaignFlow-AI.git
cd CampaignFlow-AI
```

### 2. Configure the Backend

Navigate to the backend directory:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate the environment.

**Windows:**

```powershell
venv\Scripts\activate
```

**macOS / Linux:**

```bash
source venv/bin/activate
```

Install the required dependencies:

```bash
pip install -r requirements.txt
```

Configure your Google Gemini API key using the environment variable or configuration mechanism expected by the application. Do not commit API keys or secrets to GitHub.

Start the FastAPI server:

```bash
uvicorn main:app --reload
```

The backend is typically available at:

`http://127.0.0.1:8000`

FastAPI interactive API documentation:

`http://127.0.0.1:8000/docs`

### 3. Run the Frontend

Open a new terminal from the repository root:

```bash
cd frontend
```

If the frontend consists of static files and does not require a separate build process, start a local HTTP server:

```bash
python -m http.server 5500
```

Open the application in your browser:

`http://localhost:5500`

Ensure that the frontend API configuration points to the running FastAPI backend.

**Note:** The commands above assume the repository uses the documented static frontend structure. Follow the actual frontend dependencies and configuration if additional setup is required.

## Security

- Keep API keys and credentials out of source control.
- Store sensitive configuration in environment variables or an appropriate secrets manager.
- Validate user inputs and handle API errors appropriately.
- Configure CORS and API access according to your deployment environment.


---

*CampaignFlow AI - Applying multi-agent AI to marketing campaign generation.*
