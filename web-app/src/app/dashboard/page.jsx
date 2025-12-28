import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { sql } from '@/lib/db';
import { Briefcase, Users, Calendar, CheckCircle, Clock, XCircle, UserCheck } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function DashboardPage() {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect('/signin');
  }

  // Fetch recruitment stats
  const jobs = await sql`
    SELECT 
      COUNT(*) as total_jobs,
      COUNT(*) FILTER (WHERE is_active = true) as active_jobs
    FROM jobs 
    WHERE hr_id = ${user.userId}
  `;

  const applicants = await sql`
    SELECT 
      COUNT(*) as total_applicants,
      COUNT(*) FILTER (WHERE a.status = 'pending') as pending,
      COUNT(*) FILTER (WHERE a.status = 'reviewed') as reviewed,
      COUNT(*) FILTER (WHERE a.status = 'scheduled') as scheduled,
      COUNT(*) FILTER (WHERE a.status = 'hired') as hired,
      COUNT(*) FILTER (WHERE a.status = 'rejected') as rejected
    FROM applicants a
    JOIN jobs j ON a.job_id = j.job_id
    WHERE j.hr_id = ${user.userId}
  `;

  // Fetch scheduling stats
  const schedules = await sql`
    SELECT 
      COUNT(*) as total_schedules,
      COUNT(*) FILTER (WHERE s.interview_time > NOW()) as upcoming,
      COUNT(*) FILTER (WHERE s.interview_time <= NOW()) as completed
    FROM scheduling s
    JOIN jobs j ON s.job_id = j.job_id
    WHERE j.hr_id = ${user.userId}
  `;

  const recruitmentStats = jobs[0];
  const applicantStats = applicants[0];
  const schedulingStats = schedules[0];

  return (
    <div className="min-h-screen bg-base-200 p-8">
      <div className="container max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Dashboard Overview</h1>
          <p className="opacity-70">Welcome back, {user.name || user.email}</p>
        </div>

        {/* Recruitment Stats */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <Briefcase size={24} className="text-primary" />
              Recruitment Statistics
            </h2>
            <Link href="/dashboard/recruitment" className="btn btn-sm btn-outline">
              View Details
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="stat bg-base-100 rounded-lg shadow">
              <div className="stat-figure text-primary">
                <Briefcase size={32} />
              </div>
              <div className="stat-title">Total Jobs</div>
              <div className="stat-value text-primary">{recruitmentStats.total_jobs || 0}</div>
              <div className="stat-desc">{recruitmentStats.active_jobs || 0} active postings</div>
            </div>

            <div className="stat bg-base-100 rounded-lg shadow">
              <div className="stat-figure text-info">
                <Users size={32} />
              </div>
              <div className="stat-title">Total Applicants</div>
              <div className="stat-value text-info">{applicantStats.total_applicants || 0}</div>
              <div className="stat-desc">All applications received</div>
            </div>

            <div className="stat bg-base-100 rounded-lg shadow">
              <div className="stat-figure text-warning">
                <Clock size={32} />
              </div>
              <div className="stat-title">Pending Review</div>
              <div className="stat-value text-warning">{applicantStats.pending || 0}</div>
              <div className="stat-desc">Awaiting evaluation</div>
            </div>

            <div className="stat bg-base-100 rounded-lg shadow">
              <div className="stat-figure text-success">
                <CheckCircle size={32} />
              </div>
              <div className="stat-title">Hired</div>
              <div className="stat-value text-success">{applicantStats.hired || 0}</div>
              <div className="stat-desc">Successful placements</div>
            </div>
          </div>
        </div>

        {/* Applicant Status Breakdown */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Applicant Status Breakdown</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="stat bg-base-100 rounded-lg shadow">
              <div className="stat-figure text-info">
                <UserCheck size={28} />
              </div>
              <div className="stat-title">Reviewed</div>
              <div className="stat-value text-info">{applicantStats.reviewed || 0}</div>
            </div>

            <div className="stat bg-base-100 rounded-lg shadow">
              <div className="stat-figure text-secondary">
                <Calendar size={28} />
              </div>
              <div className="stat-title">Scheduled</div>
              <div className="stat-value text-secondary">{applicantStats.scheduled || 0}</div>
            </div>

            <div className="stat bg-base-100 rounded-lg shadow">
              <div className="stat-figure text-error">
                <XCircle size={28} />
              </div>
              <div className="stat-title">Rejected</div>
              <div className="stat-value text-error">{applicantStats.rejected || 0}</div>
            </div>
          </div>
        </div>

        {/* Scheduling Stats */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <Calendar size={24} className="text-secondary" />
              Interview Scheduling
            </h2>
            <Link href="/dashboard/scheduling" className="btn btn-sm btn-outline">
              Manage Schedules
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="stat bg-base-100 rounded-lg shadow">
              <div className="stat-figure text-secondary">
                <Calendar size={32} />
              </div>
              <div className="stat-title">Total Scheduled</div>
              <div className="stat-value text-secondary">{schedulingStats.total_schedules || 0}</div>
              <div className="stat-desc">All interviews</div>
            </div>

            <div className="stat bg-base-100 rounded-lg shadow">
              <div className="stat-figure text-info">
                <Clock size={32} />
              </div>
              <div className="stat-title">Upcoming</div>
              <div className="stat-value text-info">{schedulingStats.upcoming || 0}</div>
              <div className="stat-desc">Future interviews</div>
            </div>

            <div className="stat bg-base-100 rounded-lg shadow">
              <div className="stat-figure text-success">
                <CheckCircle size={32} />
              </div>
              <div className="stat-title">Completed</div>
              <div className="stat-value text-success">{schedulingStats.completed || 0}</div>
              <div className="stat-desc">Past interviews</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/dashboard/recruitment" className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow cursor-pointer">
              <div className="card-body">
                <div className="flex items-center gap-3">
                  <Briefcase size={24} className="text-primary" />
                  <h3 className="card-title">Manage Jobs</h3>
                </div>
                <p className="text-base-content/70">Create, edit, and manage job postings</p>
              </div>
            </Link>

            <Link href="/dashboard/scheduling" className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow cursor-pointer">
              <div className="card-body">
                <div className="flex items-center gap-3">
                  <Calendar size={24} className="text-secondary" />
                  <h3 className="card-title">Schedule Interviews</h3>
                </div>
                <p className="text-base-content/70">Set up interviews with candidates</p>
              </div>
            </Link>

            <Link href="/dashboard/settings" className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow cursor-pointer">
              <div className="card-body">
                <div className="flex items-center gap-3">
                  <UserCheck size={24} className="text-accent" />
                  <h3 className="card-title">Settings</h3>
                </div>
                <p className="text-base-content/70">Configure your account and integrations</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
