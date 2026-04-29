import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createObjectCsvStringifier } from 'csv-writer';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const session = await prisma.session.findUnique({
            where: { id },
            include: {
                attendees: {
                    orderBy: { rollNumber: 'asc' },
                },
            },
        });

        if (!session) {
            return NextResponse.json({ error: 'Session not found' }, { status: 404 });
        }

        const csvStringifier = createObjectCsvStringifier({
            header: [
                { id: 'studentName', title: 'Name' },
                { id: 'rollNumber', title: 'Roll Number' },
                { id: 'timestamp', title: 'Time' },
                { id: 'latitude', title: 'Latitude' },
                { id: 'longitude', title: 'Longitude' },
            ],
        });

        const records = session.attendees.map(record => ({
            ...record,
            timestamp: record.timestamp.toISOString(),
        }));

        const header = csvStringifier.getHeaderString();
        const recordsString = csvStringifier.stringifyRecords(records);
        // Add BOM for Excel compatibility
        const csvContent = '\uFEFF' + header + recordsString;

        const filename = `attendance-${session.courseCode}-${session.createdAt.toISOString().split('T')[0]}.csv`;
        console.log('Exporting file:', filename);

        const response = new NextResponse(csvContent, {
            headers: {
                'Content-Type': 'text/csv; charset=utf-8',
            },
        });

        response.headers.set('Content-Disposition', `attachment; filename="${filename}"`);
        return response;
    } catch (error) {
        console.error('Error exporting data:', error);
        return NextResponse.json({ error: 'Failed to export data' }, { status: 500 });
    }
}
