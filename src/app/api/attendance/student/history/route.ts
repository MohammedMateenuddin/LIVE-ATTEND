import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

export async function GET(request: Request) {
    try {
        const user = verifyToken(request);
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const rollNumber = searchParams.get('rollNumber') || user.rollNumber;

        if (!rollNumber) {
            // Mocking for now if rollNumber is missing, or return empty
            return NextResponse.json([]);
        }

        const sessions = await prisma.session.findMany({
            where: {
                attendees: {
                    some: { rollNumber }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        const formattedHistory = sessions.map(s => {
            const record = s.attendees.find(a => a.rollNumber === rollNumber);
            return {
                courseCode: s.courseCode,
                sessionId: s.id,
                date: s.createdAt,
                markedAt: record?.timestamp || s.createdAt,
                status: 'Present'
            };
        });

        return NextResponse.json(formattedHistory);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch history' }, { status: 500 });
    }
}
