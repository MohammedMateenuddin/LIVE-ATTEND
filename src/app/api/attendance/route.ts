import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getDistance } from 'geolib';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { sessionId, studentName, rollNumber, latitude, longitude, deviceFingerprint } = body;

        // 1. Check if session exists and is active
        const session = await prisma.session.findUnique({
            where: { id: sessionId },
        });

        if (!session) {
            return NextResponse.json({ error: 'Session not found' }, { status: 404 });
        }

        if (!session.isActive) {
            return NextResponse.json({ error: 'Session is closed' }, { status: 400 });
        }

        if (session.expiresAt) {
            const now = new Date();
            const expires = new Date(session.expiresAt);
            console.log(`Checking expiration. Now: ${now.toISOString()}, Expires: ${expires.toISOString()}`);

            if (now > expires) {
                console.log('Session expired.');
                return NextResponse.json({ error: 'Session has expired' }, { status: 400 });
            }
        }

        // 2. Check Geolocation
        if (session.latitude && session.longitude && latitude && longitude) {
            const distance = getDistance(
                { latitude, longitude },
                { latitude: session.latitude, longitude: session.longitude }
            );

            if (distance > session.radius) {
                return NextResponse.json({
                    error: `You are too far from the class. Distance: ${distance}m. Max allowed: ${session.radius}m.`
                }, { status: 400 });
            }
        } else {
            // If location is required but missing
            return NextResponse.json({ error: 'Location data is required' }, { status: 400 });
        }

        // 3. Check for duplicate attendance (inside the embedded array)
        const alreadyMarked = session.attendees.some((a: any) => a.rollNumber === rollNumber);
        if (alreadyMarked) {
            return NextResponse.json({ error: 'Attendance already marked for this roll number' }, { status: 400 });
        }

        // 4. Update Session document by pushing to attendees array
        const updatedSession = await prisma.session.update({
            where: { id: sessionId },
            data: {
                attendees: {
                    push: {
                        studentName,
                        rollNumber,
                        latitude,
                        longitude,
                        deviceFingerprint,
                        timestamp: new Date()
                    }
                }
            }
        });

        return NextResponse.json({ success: true, message: 'Attendance marked' });
    } catch (error) {
        console.error('Error marking attendance:', error);
        return NextResponse.json({ error: 'Failed to mark attendance' }, { status: 500 });
    }
}
