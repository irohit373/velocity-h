const FASTAPI_URL = process.env.FASTAPI_URL || 'http://localhost:8000';

/**
 * Generate a job summary using AI
 * @param {Object} jobData - Job data object
 * @param {string} jobData.job_title - Title of the job
 * @param {string} jobData.job_description - Description of the job
 * @param {number} jobData.required_experience_years - Required years of experience
 * @param {string[]} jobData.tags - Array of job tags
 * @returns {Promise<string>} Generated job summary
 */
export async function generateJobSummary(jobData) {
  try {
    const response = await fetch(`${FASTAPI_URL}/api/generate-job-summary`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jobData),
    });

    if (!response.ok) {
      throw new Error('Failed to generate job summary');
    }

    const data = await response.json();
    return data.summary;
  } catch (error) {
    console.error('FastAPI error:', error);
    return ''; // Return empty if AI fails (graceful degradation)
  }
}

/**
 * Analyze a resume against job requirements
 * @param {Object} data - Analysis data object
 * @param {string} data.resume_url - URL to the resume
 * @param {string} data.job_description - Job description to match against
 * @param {number} data.required_experience_years - Required years of experience
 * @returns {Promise<{score: number, summary: string}>} Analysis result with score and summary
 */
export async function analyzeResume(data) {
  try {
    const response = await fetch(`${FASTAPI_URL}/api/analyze-resume`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to analyze resume');
    }

    const result = await response.json();
    return {
      score: result.score,
      summary: result.summary,
    };
  } catch (error) {
    console.error('Resume analysis error:', error);
    return { score: 0, summary: '' };
  }
}