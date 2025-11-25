import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { verifyPassword, generateToken, setAuthCookie } from '@/lib/auth';

export async function POST(request) {
    try {
        const { email, password } = await request.json();

        if(!email || !password) {
            return NextResponse.json(
                {error: 'Email and Password are required'},
                { status: 400}
            );
        }
        
        const users = await sql`
        SELECT id, email, password , name FROM users WHERE email = ${email}
        `;

        if (users.length === 0) {
            return NextResponse.json(
                { error: 'Invalid Credentails'},
                { status: 401 }
            );
        }

        const user = users[0];

        const isValid = await verifyPassword(password, users.password);
        if (!isValid) {
            return NextResponse.json(
                { error: 'Invalid credentails'},
                { status: '401'},
            );
        }

        const token = generateToken(user.id, user.email);
        await setAuthCookie(token);

        return NextResponse.json({
            user: {id: user.id, email: user.email, name: user.name },
        }); 
    } catch (error) {
        console.error('Login error: ', error);
            return NextResponse.json(
                { error: 'Internal Server error'},
                { status: 500}
            );
    }
}