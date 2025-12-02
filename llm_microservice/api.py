from fastapi import FastAPI, File, UploadFile, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from pydantic import BaseModel
from typing import Optional
from pypdf import PdfReader
import openai
import json
import os
import io

load_dotenv()

app = FastAPI(title="Velocity-H Backend API")

# CORS Configuration for Next.js
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Add your Next.js URLs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class ResumeEvaluationResponse(BaseModel):
    jd_match: str
    missing_keywords: list[str]
    profile_summary: str
    prompt_used: str

class ErrorResponse(BaseModel):
    error: str
    prompt_used: str
    details: Optional[str] = None

# Helper Functions
def get_response(client, input_prompt, model_name="x-ai/grok-4.1-fast:free"):
    """
    Sends the prompt to OpenRouter and returns the text response.
    """
    try:
        response = client.chat.completions.create(
            model=model_name,
            messages=[
                {"role": "system", "content": "You are a helpful ATS assistant."},
                {"role": "user", "content": input_prompt}
            ],
        )
        return response.choices[0].message.content
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"OpenRouter API error: {str(e)}")

def extract_pdf_text(file_bytes):
    """
    Extracts text from PDF file bytes.
    """
    try:
        reader = PdfReader(io.BytesIO(file_bytes))
        text = ""
        for page in reader.pages:
            text += page.extract_text()
        return text
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"PDF extraction error: {str(e)}")

# Prompt Template
input_prompt_template = """
Act as a skilled and very experienced Application Tracking System (ATS) with a deep understanding of 
tech field, software engineering, data science, data analysis, and big data engineering. 
Your task is to evaluate the resume based on the given job description. 
You must consider the job market is very competitive and you should provide 
best assistance for improving the resumes.

resume: {text}
description: {jd}

I want the response in a single string having the structure:
{{"JD Match": "%", "MissingKeywords": [], "Profile Summary": ""}}
"""

# API Endpoints
@app.get("/")
async def root():
    return {
        "message": "Velocity H Endpoint API",
        "version": "1.0.0",
        "endpoints": {
            "/evaluate": "POST - Evaluate resume against job description",
            "/health": "GET - Health check"
        }
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.post("/evaluate", response_model=ResumeEvaluationResponse)
async def evaluate_resume(
    resume: UploadFile = File(..., description="Resume PDF file"),
    job_description: str = Form(..., description="Job description text"),
):
    """
    Evaluate a resume against a job description using AI.
    
    - **resume**: PDF file of the resume
    - **job_description**: The job description text
      
    Returns the match percentage, missing keywords, and profile summary.
    """
    
    # Validate file type
    if not resume.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are supported")
    
    # Validate inputs
    if not job_description.strip():
        raise HTTPException(status_code=400, detail="Job description cannot be empty")
    
    try:
        # Read PDF content
        pdf_bytes = await resume.read()
        resume_text = extract_pdf_text(pdf_bytes)
        
        if not resume_text.strip():
            raise HTTPException(status_code=400, detail="Could not extract text from PDF")
        
        # Initialize OpenRouter client
        client = openai.OpenAI(
            base_url="https://openrouter.ai/api/v1",
            api_key= os.getenv("OPENROUTER_API_KEY", ''),
        )
        
        # MODEL
        model = "x-ai/grok-4.1-fast:free"

        # Format prompt
        final_prompt = input_prompt_template.format(text=resume_text, jd=job_description)
        
        # Get AI response
        response_text = get_response(client, final_prompt, model)
        
        # Parse JSON response
        clean_json = response_text.replace("```json", "").replace("```", "").strip()
        data = json.loads(clean_json)
        
        return ResumeEvaluationResponse(
            jd_match=data.get("JD Match", "N/A"),
            missing_keywords=data.get("MissingKeywords", []),
            profile_summary=data.get("Profile Summary", ""),
            prompt_used=final_prompt
        )
        
    except json.JSONDecodeError as e:
        raise HTTPException(
            status_code=500,
            detail=f"AI response was not valid JSON. Raw response: {response_text[:500]}"
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")

@app.post("/evaluate-json")
async def evaluate_resume_json(
    resume: UploadFile = File(...),
    job_description: str = Form(...),
    api_key: str = Form(...),
    model: str = Form(default="x-ai/grok-4.1-fast:free")
):
    """
    Alternative endpoint that returns raw JSON response.
    """
    result = await evaluate_resume(resume, job_description, api_key, model)
    return {
        "success": True,
        "data": {
            "jdMatch": result.jd_match,
            "missingKeywords": result.missing_keywords,
            "profileSummary": result.profile_summary
        },
        "prompt": result.prompt_used
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
