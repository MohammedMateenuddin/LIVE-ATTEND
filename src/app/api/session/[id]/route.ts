import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const session = await (prisma.session as any).findUnique({
            where: { id },
        });

        if (!session) {
            return NextResponse.json({ message: 'Session not found' }, { status: 404 });
        }

        return NextResponse.json(session);
    } catch (error) {
        return NextResponse.json({ message: 'Failed to fetch session' }, { status: 500 });
    }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const user = verifyToken(request);
        if (!user || user.role !== 'professor') {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { isActive } = body;
        const { id } = await params;

        const session = await (prisma.session as any).update({
            where: { id },
            data: { isActive },
        });

        return NextResponse.json(session);
    } catch (error) {
        return NextResponse.json({ message: 'Failed to update session' }, { status: 500 });
    }
}
