// Test script to debug resume analysis API
const fetch = require('node-fetch');

const testData = {
  resume_url: "https://example.com/test-resume.pdf",
  job_description: "Looking for a Software Engineer with 5 years of experience in React and Node.js",
  cover_letter: "I am passionate about web development"
};

async function testResumeAnalysis() {
  try {
    console.log('Testing FastAPI resume analysis endpoint...');
    console.log('Request data:', JSON.stringify(testData, null, 2));
    
    const response = await fetch('http://localhost:8000/api/analyze-resume', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testData),
    });
    
    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers.raw());
    
    const text = await response.text();
    console.log('Response body:', text);
    
    if (response.ok) {
      const result = JSON.parse(text);
      console.log('\n✓ Success!');
      console.log('Result:', JSON.stringify(result, null, 2));
    } else {
      console.log('\n✗ Error!');
      try {
        const error = JSON.parse(text);
        console.log('Error details:', error);
      } catch (e) {
        console.log('Could not parse error response');
      }
    }
  } catch (error) {
    console.error('Test failed:', error.message);
    console.error('Stack:', error.stack);
  }
}

testResumeAnalysis();
