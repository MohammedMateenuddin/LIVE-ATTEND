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
            return NextResponse.json({ percentage: 0, attended: 0, total: 0 });
        }

        const attended = await prisma.session.count({
            where: {
                attendees: {
                    some: { rollNumber }
                }
            }
        });

        const totalSessions = await prisma.session.count();
        const percentage = totalSessions > 0 ? Math.round((attended / totalSessions) * 100) : 0;

        return NextResponse.json({
            percentage,
            attended,
            total: totalSessions
        });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
    }
}
