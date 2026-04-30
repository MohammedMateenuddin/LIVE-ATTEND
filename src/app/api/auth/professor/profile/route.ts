import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

export async function GET(request: Request) {
    try {
        const decoded = verifyToken(request);
        if (!decoded || decoded.role !== 'professor') {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const professor = await prisma.professor.findUnique({
            where: { id: decoded.id },
            select: { id: true, name: true, email: true },
        });

        if (!professor) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        return NextResponse.json(professor);
    } catch (error) {
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
