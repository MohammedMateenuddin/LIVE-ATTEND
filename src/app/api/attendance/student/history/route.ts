import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const rollNumber = searchParams.get('rollNumber'); // In a real app, this comes from the auth token

        if (!rollNumber) {
            // Mocking for now if rollNumber is missing, or return empty
            return NextResponse.json([]);
        }

        const history = await prisma.attendanceRecord.findMany({
            where: { rollNumber },
            include: {
                session: true
            },
            orderBy: {
                timestamp: 'desc'
            }
        });

        const formattedHistory = history.map(h => ({
            courseCode: h.session.courseCode,
            sessionId: h.sessionId,
            date: h.session.createdAt,
            markedAt: h.timestamp,
            status: 'Present'
        }));

        return NextResponse.json(formattedHistory);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch history' }, { status: 500 });
    }
}
