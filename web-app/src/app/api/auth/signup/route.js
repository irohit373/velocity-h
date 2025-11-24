import { NextRequset, NextResponse } from 'next/server';
import { sql } from '@/lib/db/index';
import { hashedPassword, generateToken, setAuthCookie } from '@/lib/auth';

export async function POST(request: NextRequest) {
    try{
        const { email, password, name } = await request.json();

        if(email || password || password.length < 6) {
            return NextResponse.json(
                { error: 'Invalid input. Password must be at least 6 characters.' },
                { status: 400}
            );
       }
       
    }
}