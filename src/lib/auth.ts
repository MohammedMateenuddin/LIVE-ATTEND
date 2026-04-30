import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey123';

export function verifyToken(req: Request) {
    const authHeader = req.headers.get('authorization');
    console.log(`Auth Check: Received Header: ${authHeader ? authHeader.substring(0, 20) + '...' : 'NONE'}`);
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log('Auth Check: No valid Bearer token in headers');
        return null;
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as any;
        return decoded;
    } catch (err: any) {
        console.log(`Auth Check: JWT Verification Failed: ${err.message}`);
        return null;
    }
}
