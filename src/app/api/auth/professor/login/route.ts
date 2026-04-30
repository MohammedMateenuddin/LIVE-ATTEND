import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey123';

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        const professor = await prisma.professor.findUnique({
            where: { email },
        });

        if (!professor) {
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
        }

        const isMatch = await bcrypt.compare(password, professor.password);
        if (!isMatch) {
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
        }

        const token = jwt.sign(
            { id: professor.id, role: 'professor', name: professor.name },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        return NextResponse.json({
            token,
            professor: {
                id: professor.id,
                name: professor.name,
                email: professor.email,
            },
        });
    } catch (error: any) {
        console.error('Login error:', error);
        return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
    }
}
