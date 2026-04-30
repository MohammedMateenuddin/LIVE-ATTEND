'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { QRCodeCanvas } from 'qrcode.react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCopy, FaTimesCircle, FaUsers, FaFileDownload, FaSyncAlt, FaSatelliteDish, FaUserTie, FaEye, FaClock } from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';

export default function SessionQRPage() {
  const params = useParams();
  const sessionId = params?.id as string;
  const router = useRouter();
  const { user, professorToken, authLoading } = useAuth();

  const [mounted, setMounted] = useState(false);
  const [token, setToken] = useState('');
  const [countdown, setCountdown] = useState(5);
  const [presentCount, setPresentCount] = useState(0);
  const [sessionData, setSessionData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const generateToken = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  useEffect(() => {
    setMounted(true);
    if (!authLoading && !professorToken) {
      router.push('/professor/login');
    }
  }, [professorToken, authLoading, router]);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch(`/api/session/${sessionId}`);
        if (res.ok) {
          const data = await res.json();
          setSessionData(data);
        }
      } catch (err) {
        console.error('Failed to fetch session:', err);
      } finally {
        setLoading(false);
      }
    };
    if (sessionId) fetchSession();
  }, [sessionId]);

  useEffect(() => {
    const pollAttendance = setInterval(async () => {
      try {
        const res = await fetch(`/api/session/${sessionId}`);
        if (res.ok) {
          const data = await res.json();
          setPresentCount(data.attendees?.length || 0);
        }
      } catch (err) {
        console.error('Polling error:', err);
      }
    }, 3000);
    return () => clearInterval(pollAttendance);
  }, [sessionId]);

  useEffect(() => {
    if (!sessionId) return;
    
    // Initial token
    setToken(generateToken());
    setCountdown(5);

    const qrInterval = setInterval(() => {
      setToken(generateToken());
      setCountdown(5);
    }, 5000);

    const countdownInterval = setInterval(() => {
      setCountdown(prev => (prev <= 1 ? 5 : prev - 1));
    }, 1000);

    return () => {
      clearInterval(qrInterval);
      clearInterval(countdownInterval);
    };
  }, [sessionId]);

  const attendanceUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/student/scan?sessionId=${sessionId}&t=${token}`
    : '';

  const copyLink = () => {
    const url = `${window.location.origin}/student/scan?sessionId=${sessionId}`;
    navigator.clipboard.writeText(url);
    toast.success('Link copied!', { duration: 2000 });
  };

  const generatePDF = async (mode: 'download' | 'preview') => {
    const toastId = toast.loading(mode === 'preview' ? 'Opening Preview...' : 'Generating PDF...');
    try {
      const [jsPDFMod, autoTableMod] = await Promise.all([
        import('jspdf'),
        import('jspdf-autotable')
      ]);
      const jsPDF = jsPDFMod.default;
      const autoTable = autoTableMod.default;
      
      const res = await fetch(`/api/session/${sessionId}`);
      if (!res.ok) throw new Error('Failed to fetch attendance data');
      const data = await res.json();
      const attendees = data.attendees || [];

      const doc = new jsPDF();
      const dateStr = new Date().toLocaleDateString();
      const timeStr = new Date().toLocaleTimeString();

      doc.setFontSize(22);
      doc.setTextColor(20, 20, 20);
      doc.text('LiveAttend — Attendance Report', 14, 20);
      
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text(`COURSE: ${sessionData?.courseCode || 'N/A'}`, 14, 28);
      doc.text(`SUBJECT: ${sessionData?.subjectName || 'N/A'}`, 14, 33);
      doc.text(`SESSION ID: ${sessionId}`, 14, 38);
      doc.text(`DATE: ${dateStr} | TIME: ${timeStr}`, 14, 43);
      
      doc.setDrawColor(168, 85, 247);
      doc.line(14, 47, 196, 47);

      const tableData = attendees.map((s: any, i: number) => [
        i + 1,
        s.studentName || 'N/A',
        s.rollNumber || 'N/A',
        'VERIFIED',
        new Date(s.timestamp).toLocaleTimeString()
      ]);

      autoTable(doc, {
        head: [['#', 'STUDENT NAME', 'ROLL NO.', 'STATUS', 'VERIFIED AT']],
        body: tableData,
        startY: 52,
        theme: 'grid',
        headStyles: { fillColor: [168, 85, 247], textColor: [255, 255, 255], fontSize: 10, fontStyle: 'bold' },
        styles: { fontSize: 9 },
        alternateRowStyles: { fillColor: [245, 245, 245] }
      });

      const finalY = (doc as any).lastAutoTable.finalY || 60;
      doc.setFontSize(10);
      doc.text(`Total Present: ${attendees.length}`, 14, finalY + 12);
      doc.setFontSize(8);
      doc.text(`Generated by LiveAttend Terminal v1.0.4`, 14, finalY + 18);

      if (mode === 'preview') {
        const blob = doc.output('blob');
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
        toast.success('Preview Opened!', { id: toastId });
      } else {
        doc.save(`attendance-${sessionData?.courseCode || 'session'}-${dateStr.replace(/\//g, '-')}.pdf`);
        toast.success('PDF Downloaded!', { id: toastId });
      }
    } catch (err) {
      toast.error('Failed to generate PDF', { id: toastId });
    }
  };

  const downloadCSV = async () => {
    const toastId = toast.loading('Generating Excel Data...');
    try {
      const res = await fetch(`/api/session/${sessionId}`);
      if (!res.ok) throw new Error('Failed to fetch data');
      const data = await res.json();
      const attendees = data.attendees || [];

      const headers = ['#', 'Student Name', 'Roll Number', 'Status', 'Verified At', 'Subject'];
      const rows = attendees.map((s: any, i: number) => [
        i + 1,
        s.studentName || 'N/A',
        s.rollNumber || 'N/A',
        'VERIFIED',
        new Date(s.timestamp).toLocaleString(),
        sessionData?.subjectName || 'N/A'
      ]);

      const csvContent = [
        headers.join(','),
        ...rows.map(r => r.map(c => `"${c}"`).join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `attendance-${sessionData?.courseCode || 'session'}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success('Excel CSV Downloaded!', { id: toastId });
    } catch (err) {
      toast.error('Failed to generate Excel data', { id: toastId });
    }
  };

  const endSession = async () => {
    try {
      const res = await fetch(`/api/session/${sessionId}`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${professorToken}` 
        },
        body: JSON.stringify({ isActive: false })
      });
      if (res.ok) {
        toast.success('Session Ended');
        router.push('/professor/history');
      } else {
        toast.error('Failed to terminate session');
      }
    } catch (err) {
      toast.error('Connection error');
    }
  };

  if (!mounted || loading) return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white space-y-4 font-sans">
      <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-white/40 uppercase tracking-[0.4em] text-[10px] font-black">Initializing Terminal...</p>
    </div>
  );

  return (
    <main className="relative h-screen bg-black text-white p-2 md:p-4 font-sans overflow-hidden flex flex-col items-center justify-center">
      <video autoPlay loop muted playsInline className="fixed inset-0 w-full h-full object-cover z-0 opacity-60">
        <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4" type="video/mp4" />
      </video>
      <div className="fixed inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70 z-[1] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto w-full flex flex-col h-full max-h-[99vh] justify-between py-1">
        <div className="flex justify-between items-center px-2">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col">
                <div className="flex items-center gap-3">
                    <img src="/hkbk-logo.png" alt="HKBK Logo" className="w-8 h-8 rounded-full aspect-square object-cover border border-white/20" />
                    <h1 className="text-2xl md:text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 leading-none">Terminal</h1>
                </div>
                <div className="flex items-center gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <p className="text-white/60 text-[7px] font-black tracking-[0.3em] uppercase">Active</p>
                </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2">
                <div className="bg-white/5 backdrop-blur-2xl border border-white/20 px-3 py-1.5 rounded-full flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg"><FaUserTie className="text-[7px]" /></div>
                    <span className="text-[9px] font-black text-white leading-none uppercase tracking-widest">{user?.name?.split(' ')[0]}</span>
                </div>
            </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-lg mx-auto w-full px-2">
            <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/20 p-4 md:p-6 rounded-[2rem] shadow-2xl relative overflow-hidden">
                <div className="relative z-10">
                    <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-3">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center border border-white/10">
                                <FaSatelliteDish className="text-lg text-white" />
                            </div>
                            <div>
                                <h2 className="text-xl md:text-2xl font-black tracking-tighter text-white leading-none uppercase">{sessionData?.courseCode || 'BEACON'}</h2>
                                <p className="text-purple-400 text-[10px] font-black uppercase tracking-[0.1em] mt-1">{sessionData?.subjectName || 'LOADING SUBJECT...'}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2.5 bg-black/50 px-3 py-1.5 rounded-lg border border-white/10">
                            <FaUsers className="text-cyan-400 text-xs" />
                            <span className="text-xs font-black tabular-nums text-white leading-none">{presentCount}</span>
                        </div>
                    </div>

                    <div className="flex flex-col items-center">
                        {/* THE STANDARD QR SCANNER CORE */}
                        <div className="relative p-3.5 bg-white rounded-2xl shadow-lg flex items-center justify-center">
                            <AnimatePresence mode="wait">
                                <motion.div 
                                    key={token} 
                                    initial={{ opacity: 0, scale: 0.95 }} 
                                    animate={{ opacity: 1, scale: 1 }} 
                                    exit={{ opacity: 0, scale: 1.05 }} 
                                    transition={{ duration: 0.2 }}
                                >
                                    <QRCodeCanvas 
                                        value={attendanceUrl} 
                                        size={260} 
                                        level="H" 
                                        bgColor="#FFFFFF" 
                                        fgColor="#000000" 
                                        imageSettings={{
                                            src: "/hkbk-logo.png",
                                            x: undefined,
                                            y: undefined,
                                            height: 60,
                                            width: 60,
                                            excavate: true,
                                        }}
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* REFRESH INDICATOR */}
                        <div className="mt-4 w-full max-w-[260px] flex flex-col items-center">
                            <div className="flex justify-between w-full mb-1">
                                <span className="text-[9px] font-black text-white/40 uppercase tracking-widest flex items-center gap-2">
                                    <FaSyncAlt className="animate-spin-slow text-emerald-400" /> Auto-Refreshing
                                </span>
                                <span className="text-[9px] font-black text-white/60 uppercase tracking-widest">
                                    {countdown}s
                                </span>
                            </div>
                            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden border border-white/5">
                                <motion.div 
                                    key={token}
                                    initial={{ width: "100%" }}
                                    animate={{ width: "0%" }}
                                    transition={{ duration: 5, ease: "linear" }}
                                    className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-2.5">
                        <button onClick={downloadCSV} className="flex items-center justify-center gap-2 bg-black/40 hover:bg-black/60 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all border border-white/10 group/btn">
                            <FaFileDownload className="text-purple-400 text-[10px]" /> EXCEL CSV
                        </button>
                        <button onClick={() => generatePDF('preview')} className="flex items-center justify-center gap-2 bg-black/40 hover:bg-black/60 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all border border-white/10 group/btn">
                            <FaEye className="text-blue-400 text-[10px]" /> PREVIEW PDF
                        </button>
                        <button onClick={() => generatePDF('download')} className="flex items-center justify-center gap-2 bg-black/40 hover:bg-black/60 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all border border-white/10 group/btn">
                            <FaFileDownload className="text-emerald-400 text-[10px]" /> PDF REPORT
                        </button>
                        <button onClick={copyLink} className="flex items-center justify-center gap-2 bg-black/40 hover:bg-black/60 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all border border-white/10 group/btn">
                            <FaCopy className="text-white/40 text-[10px]" /> COPY LINK
                        </button>
                        <button onClick={endSession} className="col-span-2 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 py-3 rounded-xl font-black text-xs uppercase tracking-[0.2em] transition-all border border-red-400/50 shadow-[0_0_20px_rgba(220,38,38,0.3)] text-white">
                            <FaTimesCircle className="text-lg" /> TERMINATE SESSION
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>

        <div className="flex items-center justify-center gap-2 text-[6px] font-black text-white/10 uppercase tracking-[0.8em] py-1">
            Live Attend Terminal v1.0.4
        </div>
      </div>
    </main>
  );
}
