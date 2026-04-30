import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const sessions = await prisma.session.findMany({
            orderBy: {
                createdAt: 'desc',
            }
        });

        // Map to match the expected format in the frontend
        const formattedSessions = sessions.map(s => ({
            ...s,
            _id: s.id, // For compatibility with existing frontend
        }));

        return NextResponse.json(formattedSessions);
    } catch (error) {
        console.error('Failed to fetch history:', error);
        return NextResponse.json({ error: 'Failed to fetch history' }, { status: 500 });
    }
}
