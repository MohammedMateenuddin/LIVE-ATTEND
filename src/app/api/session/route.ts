import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

export async function POST(request: Request) {
    try {
        const user = verifyToken(request);
        if (!user || user.role !== 'professor') {
            return NextResponse.json({ error: 'Unauthorized: Professors only' }, { status: 401 });
        }

        const body = await request.json();
        const { subjectName, courseCode, latitude, longitude, radius, durationMinutes } = body;

        const expiresAt = new Date(Date.now() + (durationMinutes || 1) * 60 * 1000);
        console.log(`Creating session. Duration: ${durationMinutes}m. Expires at: ${expiresAt.toISOString()}`);

        console.log(`Creating session for professor: ${user.id}`);

        const session = await (prisma.session as any).create({
            data: {
                subjectName: subjectName || "General",
                courseCode,
                professorId: user.id,
                latitude,
                longitude,
                radius: radius || 50,
                expiresAt,
            },
        });

        console.log(`Session created with ID: ${session.id} for professor: ${session.professorId}`);

        return NextResponse.json(session);
    } catch (error: any) {
        console.error('CRITICAL: Session creation failed:', error);
        return NextResponse.json({ 
            message: 'Failed to create session', 
            details: error.message,
            code: error.code
        }, { status: 500 });
    }
}
