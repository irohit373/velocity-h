import streamlit as st
import openai
import json
import os
from dotenv import load_dotenv
from pypdf import PdfReader

load_dotenv()

llm_api_key = os.getenv("OPENROUTER_API_KEY", '')

#HELPER FUNCTIONS

def get_response(client, input_prompt, model_name="openai/gpt-4o-mini"):
    """
    Sends the prompt to OpenRouter and returns the text response.
    """
    try:
        response = client.chat.completions.create(
            model = model_name,
            messages = [{"role": "system", "content": "You are a helpful ATS assistant."},
                       {"role": "user", "content": input_prompt}
                       ],
                    temperature=0.0,
        )
        return response.choices[0].message.content
    except Exception as e:
        return str(e)

def input_pdf_text(uploaded_file):
    """
    Extracts text from an uploaded PDF file.
    """
    reader = PdfReader(uploaded_file)
    text = ""
    for page in range(len(reader.pages)):
        page = reader.pages[page]
        text += page.extract_text()
    return text

# --- PROMPT ENGINEERING ---
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

# --- STREAMLIT UI ---

st.set_page_config(page_title="Smart Resume Evaluator", layout="wide")

st.title("🚀 AI-Powered Resume Screener (OpenRouter)")
st.markdown("Improve your resume ATS score instantly using OpenRouter models.")

# Sidebar for API Configuration
with st.sidebar:
    st.header("Configuration")
    api_key = st.text_input("Enter OpenRouter API Key:", type="password")
    
    # Dropdown to select model
    model_choice = st.selectbox(
        "Choose AI Model:",
        ("openai/gpt-4o-mini", "meta-llama/llama-3.1-70b-instruct", "anthropic/claude-3-haiku", "google/gemini-flash-1.5")
    )
    
    st.info("Get your key from [OpenRouter.ai](https://openrouter.ai/)")

# Main Content Layout
col1, col2 = st.columns(2)

with col1:
    st.subheader("Job Description")
    jd = st.text_area("Paste the Job Description here", height=300)

with col2:
    st.subheader("Upload Resume")
    uploaded_file = st.file_uploader("Upload your resume (PDF)...", type=["pdf"])
    if uploaded_file is not None:
        st.success("PDF Uploaded Successfully")

# Action Button
submit = st.button("Evaluate Resume")

if submit:
    if uploaded_file is not None and jd and api_key:
        
        # Initialize Client with user provided key
        client = openai.OpenAI(
            base_url="https://openrouter.ai/api/v1",
            api_key=api_key,
        )

        with st.spinner(f"Analyzing profile using {model_choice}..."):
            try:
                # 1. Extract Text
                text = input_pdf_text(uploaded_file)
                
                # 2. Format Prompt
                final_prompt = input_prompt_template.format(text=text, jd=jd)
                
                # Store the prompt in session state
                st.session_state['last_prompt'] = final_prompt
                
                # 3. Get Response
                response_text = get_response(client, final_prompt, model_choice)
                
                # 4. Parse and Display
                # Cleaning potential markdown blocks
                clean_json = response_text.replace("```json", "").replace("```", "").strip()
                data = json.loads(clean_json)

                # Display Results
                st.divider()
                st.header("Evaluation Results")
                
                # Metric Card
                st.metric(label="Match Score", value=data.get("JD Match"))
                
                # Detailed Breakdown
                c1, c2 = st.columns(2)
                with c1:
                    st.error("⚠️ Missing Keywords")
                    for keyword in data.get("MissingKeywords", []):
                        st.write(f"- {keyword}")
                
                with c2:
                    st.success("✅ Profile Summary")
                    st.write(data.get("Profile Summary"))

            except json.JSONDecodeError:
                st.error("The AI response was not valid JSON. Please try again.")
                st.expander("Raw Response").write(response_text)
            except Exception as e:
                st.error(f"An error occurred: {e}")
    else:
        st.warning("Please upload a resume, paste the JD, and ensure API Key is entered.")

# Show last prompt button (if prompt exists in session)
if 'last_prompt' in st.session_state:
    st.divider()
    with st.expander("📝 View Last Prompt Sent to API"):
        st.code(st.session_state['last_prompt'], language='text')