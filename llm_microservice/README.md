# Resume Evaluator Microservice

This microservice provides both a Streamlit UI and a FastAPI backend for evaluating resumes against job descriptions using AI.

## Files

- `app.py` - Streamlit web interface
- `api.py` - FastAPI REST API
- `requirements.txt` - Python dependencies

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Create a `.env` file (optional):
```
OPENROUTER_API_KEY=your_key_here
```

## Running the Services

### Streamlit UI
```bash
cd llm_microservice
streamlit run app.py
```
Access at: http://localhost:8501

### FastAPI Server
```bash
cd llm_microservice
python api.py
```
Access at: http://localhost:8000
API docs at: http://localhost:8000/docs

Or use uvicorn:
```bash
uvicorn api:app --reload --host 0.0.0.0 --port 8000
```

## API Endpoints

### POST /evaluate
Evaluate a resume against a job description.

**Request:**
- `resume` (file): PDF file
- `job_description` (form): Job description text
- `api_key` (form): OpenRouter API key
- `model` (form, optional): AI model name (default: openai/gpt-4o-mini)

**Response:**
```json
{
  "jd_match": "85%",
  "missing_keywords": ["Docker", "Kubernetes"],
  "profile_summary": "Strong candidate with...",
  "prompt_used": "Act as a skilled..."
}
```

### POST /evaluate-json
Alternative endpoint with different response format.

### GET /health
Health check endpoint.

## Usage from Next.js

```javascript
const formData = new FormData();
formData.append('resume', pdfFile);
formData.append('job_description', jobDesc);
formData.append('api_key', apiKey);
formData.append('model', 'openai/gpt-4o-mini');

const response = await fetch('http://localhost:8000/evaluate', {
  method: 'POST',
  body: formData
});

const result = await response.json();
```

## Available Models

- `openai/gpt-4o-mini`
- `meta-llama/llama-3.1-70b-instruct`
- `anthropic/claude-3-haiku`
- `google/gemini-flash-1.5`
