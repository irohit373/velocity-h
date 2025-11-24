import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
}

export async function verifyPassword(
    password: string,
    hashedPassword: string
): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword);
    }

export function generateToken(userId: number, email: string): string {
    return jwt.sign({ userId, email }, JWT_SECRET, { expiresIn: '7d'});
}

export function verifyToken(token: string) {
    try {
        return jwt.verify(token, JWT_SECRET) as { userId: number, email: string };   
    } catch {
        return null;
    }
}

export async function setAuthCookie(token: string) {
    (await cookies()).set('auth-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
    });
}

export async function removeAuthCookie() {
    (await cookies()).delete('auth-token');
}

export async function getAuthToken() {
    return (await cookies()).get('auth-token')?.value;   
}

export async function getCurrentUser() {
    const token = await getAuthToken();
    if(!token) return null;

    const payload = verifyToken(token);
    return payload;
}

