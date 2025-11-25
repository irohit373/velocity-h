import { NextResponse } from 'next/server';
import { removeAuthCookie } from '@/lib/auth';

export async function POST() {
    await removeAuthCookie();
    return NextReesponse.json({ message: 'Logged out Successfully'});
}