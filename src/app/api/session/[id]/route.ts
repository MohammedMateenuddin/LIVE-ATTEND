import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const session = await prisma.session.findUnique({
            where: { id },
        });

        if (!session) {
            return NextResponse.json({ error: 'Session not found' }, { status: 404 });
        }

        return NextResponse.json(session);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch session' }, { status: 500 });
    }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const body = await request.json();
        const { isActive } = body;
        const { id } = await params;

        const session = await prisma.session.update({
            where: { id },
            data: { isActive },
        });

        return NextResponse.json(session);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update session' }, { status: 500 });
    }
}
