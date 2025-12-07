import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { put } from '@vercel/blob';
import { analyzeResume } from '@/lib/fastapi';

// Increase function timeout to 60 seconds for AI processing
export const maxDuration = 60;

/**
 * POST /api/applicants
 * Submit a job application with resume
 * Public endpoint - no authentication required
 * Handles file upload, duplicate detection, and AI-powered resume analysis
 */
export async function POST(request) {
  try {
    // Parse multipart form data (contains both text fields and file)
    const formData = await request.formData();
    
    // Extract all form fields
    const job_id = parseInt(formData.get('job_id'));
    const full_name = formData.get('full_name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const dob = formData.get('dob');
    const experience_years = parseInt(formData.get('experience_years'));
    const detail_box = formData.get('detail_box');
    const resume = formData.get('resume'); // File object

    // Validate required fields
    if (!job_id || !full_name || !email || !resume) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if user has already applied for this job
    // Prevents duplicate applications using unique constraint (job_id, email)
    const existing = await sql`
      SELECT * FROM applicants WHERE job_id = ${job_id} AND email = ${email}
    `;

    if (existing.length > 0) {
      return NextResponse.json(
        { error: 'You have already applied for this job' },
        { status: 409 }
      );
    }

    // Upload resume file to Vercel Blob Storage (cloud storage)
    // Generates a unique filename using timestamp + original filename
    // Returns a public URL that can be accessed later
    const blob = await put(`resumes/${Date.now()}-${resume.name}`, resume, {
      access: 'public',
    });

    // Insert applicant record into database
    const result = await sql`
      INSERT INTO applicants (
        job_id, full_name, email, phone, dob, experience_years,
        detail_box, resume_url
      )
      VALUES (
        ${job_id}, ${full_name}, ${email}, ${phone}, 
        ${dob}, ${experience_years}, ${detail_box}, 
        ${blob.url}
      )
      RETURNING *
    `;

    const applicant = result[0];

    // Fetch job description for AI resume analysis
    const jobs = await sql`
      SELECT job_description
      FROM jobs WHERE job_id = ${job_id}
    `;

    // Step: AI Resume Analysis (SYNCHRONOUS - wait for completion)
    // This ensures the AI analysis completes before serverless function terminates
    let aiAnalysis = null;
    if (jobs.length > 0) {
      console.log(`[Applicant ${applicant.applicant_id}] Starting AI analysis...`);
      try {
        aiAnalysis = await analyzeResume({
          resume_url: blob.url,
          job_description: jobs[0].job_description,
          cover_letter: detail_box,
        });
        
        console.log(`[Applicant ${applicant.applicant_id}] AI analysis received:`, {
          score: aiAnalysis.score,
          summary_length: aiAnalysis.summary?.length || 0
        });
        
        // Update applicant record with AI-generated insights
        await sql`
          UPDATE applicants 
          SET ai_generated_score = ${aiAnalysis.score},
              ai_generated_summary = ${aiAnalysis.summary}
          WHERE applicant_id = ${applicant.applicant_id}
        `;
        
        console.log(`[Applicant ${applicant.applicant_id}] Database updated successfully`);
      } catch (error) {
        // Log error but don't fail the application
        console.error(`[Applicant ${applicant.applicant_id}] AI resume analysis failed:`, {
          error: error.message,
          stack: error.stack
        });
      }
    } else {
      console.log(`[Applicant ${applicant.applicant_id}] No job found for AI analysis`);
    }

    // Return success response AFTER AI analysis completes
    return NextResponse.json(
      { 
        message: 'Application submitted successfully', 
        applicant
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Application error:', error);
    return NextResponse.json(
      { error: 'Failed to submit application' },
      { status: 500 }
    );
  }
}