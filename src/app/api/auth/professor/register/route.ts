import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey123';

export async function POST(request: Request) {
    try {
        const { name, email, password } = await request.json();

        const existing = await prisma.professor.findUnique({
            where: { email },
        });

        if (existing) {
            return NextResponse.json({ message: 'User already exists' }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const professor = await prisma.professor.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

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
    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
