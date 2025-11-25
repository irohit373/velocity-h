import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { hashPassword, generateToken, setAuthCookie } from '@/lib/auth';

export async function POST(request) {
    try{
        const { email, password, name } = await request.json();

        if(!email || !password || password.length < 6) {
            return NextResponse.json(
                { error: 'Invalid input. Password must be at least 6 characters.' },
                { status: 400}
            );
       }

       const existingUser = await sql`
        SELECT id FROM users WHERE email = ${email}
        `;

        if (existingUser.length > 0){
            return NextResponse.json(
                { error: 'User already exists'},
                { status: 409 }
            );
        }
       
        const passwordHash = await hashPassword(password);
        const result = await sql`
            INSERT INTO users (email, password_hash, username)
            VALUES (${email}, ${passwordHash}, ${name})
            RETURNING id, email, username
            `;

        const user = result[0];
        const token = generateToken(user.id, user.email);
        await setAuthCookie(token);

        return NextResponse.json({
            user: {id: user.id, email: user.email, username: user.username},
        });
    } catch (error) {
        console.error('Signup error:', error);
        return NextResponse.json(
            { error: 'Internal server error'},
            {status: 500}
        );
    }   
}

