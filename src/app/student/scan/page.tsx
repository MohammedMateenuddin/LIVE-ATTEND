'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { FaSyncAlt, FaCamera } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function StudentScanRedirect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { studentToken, authLoading } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || authLoading) return;

    const sessionId = searchParams.get('sessionId');
    const token = searchParams.get('t');

    if (!sessionId) {
      toast.error('Invalid Scan Link');
      router.push('/student');
      return;
    }

    if (!studentToken) {
      toast.error('Please login to mark attendance');
      // Redirect to login but keep the params so we can mark it after login
      router.push(`/student/login?redirect=/student/scan&sessionId=${sessionId}&t=${token || ''}`);
      return;
    }

    // If logged in, go to dashboard and trigger scanner with these params
    // Actually, it's better to just go to dashboard and let the user click scan
    // OR we can mark it directly here since we have everything
    if (sessionId && token) {
      markDirectly(sessionId, token);
    } else {
      router.push('/student');
    }
  }, [mounted, authLoading, studentToken, searchParams, router]);

  const markDirectly = async (sessionId: string, token: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/`}/api/attendance/mark`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${studentToken}`
        },
        body: JSON.stringify({ sessionId, token })
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Attendance Marked Successfully!");
        router.push('/student');
      } else {
        toast.error(data.message || 'Verification failed');
        router.push('/student');
      }
    } catch (err) {
      toast.error('Connection error');
      router.push('/student');
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white p-6">
      <div className="relative w-20 h-20 mb-8">
        <div className="absolute inset-0 border-4 border-cyan-500/20 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <FaCamera className="text-cyan-400 text-2xl" />
        </div>
      </div>
      <h1 className="text-xl font-black tracking-tighter uppercase mb-2">Processing Scan</h1>
      <p className="text-white/40 text-xs font-bold tracking-widest uppercase">Verifying spatial security token...</p>
    </div>
  );
}
