import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey123';

export async function POST(request: Request) {
    try {
        const { name, email, rollNumber, password } = await request.json();

        const existingEmail = await prisma.student.findUnique({
            where: { email },
        });

        if (existingEmail) {
            return NextResponse.json({ message: 'Email already exists' }, { status: 400 });
        }

        const existingRoll = await prisma.student.findUnique({
            where: { rollNumber },
        });

        if (existingRoll) {
            return NextResponse.json({ message: 'Roll number already exists' }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const student = await prisma.student.create({
            data: {
                name,
                email,
                rollNumber,
                password: hashedPassword,
            },
        });

        const token = jwt.sign(
            { id: student.id, role: 'student', rollNumber: student.rollNumber, name: student.name },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        return NextResponse.json({
            token,
            student: {
                id: student.id,
                name: student.name,
                email: student.email,
                rollNumber: student.rollNumber,
            },
        });
    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
