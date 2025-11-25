import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { sql } from  '@/lib/db';

export async function GET() {
    try {
        const currentUser = await getCurrentUser();

        if(!currentUser) {
            return NextResponse.json({ user: null });
        }

        const users = await sql`
        SELECT id,email, name FROM users WHERE id = ${currentUser.userID}
        `;

        if(users.length === 0) {
            return NextResponse.json({user: null });
        }

        return NextResponse.json({ user: users[0]});
    } catch (error) {
        console.error('Get current user error:', error);
        return NextResponse.json({user: null });
    }
}

