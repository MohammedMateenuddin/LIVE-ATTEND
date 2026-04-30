import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

export async function GET(request: Request) {
    try {
        console.log('History API: Starting request...');
        const user = verifyToken(request);
        if (!user) {
            console.log('History API: Unauthorized - No user');
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        console.log(`History API: Fetching for user ${user.id}`);
        const allSessions = await (prisma.session as any).findMany();
        
        console.log(`History API: Found ${allSessions.length} total sessions`);
        const filtered = allSessions.filter((s: any) => String(s.professorId) === String(user.id));
        
        console.log(`History API: Found ${filtered.length} filtered sessions`);
        const formatted = filtered.map((s: any) => ({
            id: s.id || s._id,
            subjectName: s.subjectName || 'General',
            courseCode: s.courseCode || 'N/A',
            createdAt: s.createdAt,
            isActive: s.isActive,
            attendees: s.attendees || []
        }));

        return NextResponse.json(formatted);
    } catch (error: any) {
        console.error('History API CRITICAL ERROR:', error);
        return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
    }
}
