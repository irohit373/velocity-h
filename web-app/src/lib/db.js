import { neon } from '@neondatabase/serverless';

export const sql = neon(process.env.DATABASE_URL);

export async function initDatabase() {
    // Create hrs (HR users) table
    await sql`
        CREATE TABLE IF NOT EXISTS hrs (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255),
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`;  
    
    // Create jobs table
     await sql`
        CREATE TABLE IF NOT EXISTS jobs (
        job_id SERIAL PRIMARY KEY,
        hr_id INTEGER NOT NULL REFERENCES hrs(id) ON DELETE CASCADE,
        job_title VARCHAR(255) NOT NULL,
        job_description TEXT NOT NULL,
        required_experience_years INTEGER DEFAULT 0,
        tags TEXT[],
        location VARCHAR(255),
        salary_range VARCHAR(100),
        ai_generated_summary TEXT,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        expiry_date TIMESTAMP
        )
  `;

  // Create applicants table
  await sql`
    CREATE TABLE IF NOT EXISTS applicants (
      applicant_id SERIAL PRIMARY KEY,
      job_id INTEGER NOT NULL REFERENCES jobs(job_id) ON DELETE CASCADE,
      full_name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(20),
      dob DATE,
      experience_years INTEGER DEFAULT 0,
      detail_box TEXT,
      resume_url TEXT NOT NULL,
      ai_generated_score DECIMAL(5,2),
      ai_generated_summary TEXT,
      status VARCHAR(50) DEFAULT 'pending',
      applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(job_id, email)
    )
  `;

  // Create indexes
  await sql`CREATE INDEX IF NOT EXISTS idx_jobs_hr_id ON jobs(hr_id)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_jobs_active ON jobs(is_active)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_applicants_job_id ON applicants(job_id)`;

}