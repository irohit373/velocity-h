import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

/**
 * GET /api/applicants/[id]
 * Fetch a specific applicant's details
 * Requires authentication (HR only)
 */
export async function GET(request, { params }) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    // Get applicant with job details, verify HR ownership
    const result = await sql`
      SELECT 
        a.*,
        j.job_title,
        j.job_description,
        j.location,
        j.salary_range
      FROM applicants a
      JOIN jobs j ON a.job_id = j.job_id
      WHERE a.applicant_id = ${id} AND j.hr_id = ${user.userId}
    `;

    if (result.length === 0) {
      return NextResponse.json(
        { error: 'Applicant not found or unauthorized' },
        { status: 404 }
      );
    }

    return NextResponse.json({ applicant: result[0] });
  } catch (error) {
    console.error('Fetch applicant error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch applicant' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/applicants/[id]
 * Update applicant status
 * Requires authentication (HR only)
 */
export async function PATCH(request, { params }) {
  try {
    // Verify user is authenticated
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    // Validate status value
    const validStatuses = ['pending', 'scheduled', 'reviewed', 'rejected', 'hired'];
    if (!status || !validStatuses.includes(status.toLowerCase())) {
      return NextResponse.json(
        { error: 'Invalid status. Must be one of: pending, scheduled, reviewed, rejected, hired' },
        { status: 400 }
      );
    }

    // Verify the applicant belongs to a job owned by this HR
    const ownership = await sql`
      SELECT a.applicant_id 
      FROM applicants a
      JOIN jobs j ON a.job_id = j.job_id
      WHERE a.applicant_id = ${id} AND j.hr_id = ${user.userId}
    `;

    if (ownership.length === 0) {
      return NextResponse.json(
        { error: 'Applicant not found or unauthorized' },
        { status: 404 }
      );
    }

    // Update applicant status
    const result = await sql`
      UPDATE applicants
      SET status = ${status.toLowerCase()}
      WHERE applicant_id = ${id}
      RETURNING *
    `;

    return NextResponse.json({ applicant: result[0] });
  } catch (error) {
    console.error('Update applicant status error:', error);
    return NextResponse.json(
      { error: 'Failed to update applicant status' },
      { status: 500 }
    );
  }
}
