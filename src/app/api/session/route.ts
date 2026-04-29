import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { professorName, courseCode, latitude, longitude, radius, durationMinutes } = body;

        const expiresAt = new Date(Date.now() + (durationMinutes || 1) * 60 * 1000);
        console.log(`Creating session. Duration: ${durationMinutes}m. Expires at: ${expiresAt.toISOString()}`);

        const session = await prisma.session.create({
            data: {
                professorName,
                courseCode,
                latitude,
                longitude,
                radius: radius || 50,
                expiresAt,
            },
        });

        return NextResponse.json(session);
    } catch (error: any) {
        console.error('CRITICAL: Session creation failed:', error);
        return NextResponse.json({ 
            error: 'Failed to create session', 
            details: error.message,
            code: error.code
        }, { status: 500 });
    }
}
