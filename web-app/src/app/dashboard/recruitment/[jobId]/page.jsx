import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { sql } from '@/lib/db';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ApplicantTable from '@/components/applicants/ApplicantTable';

// Page component to display applicants for a specific job
// This is a server component that fetches job and applicant data
export default async function JobApplicantsPage({ params }) {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect('/login');
  }

  // In Next.js 15, params is a Promise
  const resolvedParams = await params;
  const jobId = parseInt(resolvedParams.jobId);

  // Verify job ownership
  const jobs = await sql`
    SELECT * FROM jobs 
    WHERE job_id = ${jobId} AND hr_id = ${user.userId}
  `;

  if (jobs.length === 0) {
    redirect('/dashboard/recruitment');
  }

  const job = jobs[0];

  // Get applicants
  const applicants = await sql`
    SELECT * FROM applicants
    WHERE job_id = ${jobId}
    ORDER BY ai_generated_score DESC NULLS LAST, applied_at DESC
  `;

  return (
    <div className="min-h-screen bg-base-200 p-8">
      <div className="max-w-7xl mx-auto">
        <Link
          href="/dashboard/recruitment"
          className="btn btn-ghost gap-2 mb-4"
        >
          <ArrowLeft size={20} />
          Back to Jobs
        </Link>

        <div className="card bg-base-100 shadow mb-6">
          <div className="card-body">
            <h1 className="text-3xl font-bold">{job.job_title}</h1>
            <p className="opacity-70">
              {applicants.length} {applicants.length === 1 ? 'application' : 'applications'}
            </p>
          </div>
        </div>

        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <ApplicantTable applicants={applicants} />
          </div>
        </div>
      </div>
    </div>
  );
}