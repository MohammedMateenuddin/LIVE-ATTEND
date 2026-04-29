'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { FaUserGraduate, FaCalendarCheck, FaMapMarkerAlt, FaSignOutAlt, FaHistory, FaCheckCircle, FaSearch, FaClock } from 'react-icons/fa';
import toast from 'react-hot-toast';
import QRScanner from '@/components/QRScanner';
import { AnimatePresence, motion } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function StudentDashboard() {
  const { user, studentToken, logoutStudent, loading: authLoading } = useAuth();
  const router = useRouter();
  
  const [showScanner, setShowScanner] = useState(false);
  const [stats, setStats] = useState<{ percentage: number; attended: number; total: number } | null>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!authLoading && !studentToken) {
      router.push('/student/login');
    }
  }, [studentToken, authLoading, router]);

  useEffect(() => {
    if (studentToken) {
      fetchDashboardData();
    }
  }, [studentToken]);

  const fetchDashboardData = async () => {
    try {
      setLoadingData(true);
      const [statsRes, historyRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/`}/api/attendance/student/stats`, {
          headers: { 'Authorization': `Bearer ${studentToken}` }
        }),
        fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/`}/api/attendance/student/history?limit=5`, {
          headers: { 'Authorization': `Bearer ${studentToken}` }
        })
      ]);

      if (statsRes.ok) setStats(await statsRes.json());
      if (historyRes.ok) setHistory(await historyRes.json());
    } catch (err) {
      console.error('Error fetching student data:', err);
    } finally {
      setLoadingData(false);
    }
  };

  const handleScanSuccess = async (scannedUrl: string) => {
    try {
      const url = new URL(scannedUrl);
      const sessionId = url.searchParams.get('sessionId');
      const token = url.searchParams.get('t');

      if (!sessionId || !token) {
        toast.error('Invalid QR Code');
        return;
      }

      // Validate token age (< 6s)
      const tokenTimestamp = parseInt(token.split('-')[0]);
      const age = Date.now() - tokenTimestamp;
      if (isNaN(tokenTimestamp) || age > 6000) {
        toast.error('QR code expired — ask professor to refresh');
        return;
      }

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
        setShowScanner(false);
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#06b6d4', '#10b981', '#ffffff']
        });
        toast.success("You're marked Present!", { duration: 5000 });
        fetchDashboardData();
      } else {
        toast.error(data.message || 'Verification failed');
      }
    } catch (err) {
      toast.error('Scan processing error');
    }
  };

  if (!mounted || authLoading || !user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen bg-black text-white p-4 md:p-6 font-sans overflow-y-auto overflow-x-hidden flex flex-col items-center justify-center">
      {/* ENHANCED VIDEO BACKGROUND */}
      <video autoPlay loop muted playsInline className="fixed inset-0 w-full h-full object-cover z-0 opacity-60">
        <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4" type="video/mp4" />
      </video>

      {/* Cinematic Overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70 z-[1] pointer-events-none" />

      <AnimatePresence>
        {showScanner && (
          <QRScanner 
            onScan={handleScanSuccess} 
            onClose={() => setShowScanner(false)} 
          />
        )}
      </AnimatePresence>

      <div className="relative z-10 max-w-5xl mx-auto w-full flex flex-col justify-center py-8 lg:py-0 min-h-full">
        {/* Header - Matches Professor Portal Style */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col items-center md:items-start"
            >
                <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 leading-tight">
                    Student Dashboard
                </h1>
                <div className="flex items-center gap-2 mt-1">
                    <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
                    <p className="text-white/80 text-[10px] font-black tracking-[0.5em] uppercase drop-shadow-md">Student Terminal</p>
                </div>
            </motion.div>
            
            <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3"
            >
                <button 
                    onClick={() => router.push('/student/history')}
                    className="bg-white/5 hover:bg-white/10 border border-white/20 px-4 py-2.5 rounded-full text-[9px] font-black tracking-widest uppercase transition-all flex items-center gap-2 backdrop-blur-md"
                >
                    <FaClock className="text-cyan-400" /> Full History
                </button>
                
                <div className="flex items-center gap-2 bg-white/5 backdrop-blur-2xl border border-white/30 px-2 py-1.5 rounded-full shadow-2xl pr-3">
                    <div className="flex items-center gap-2 pl-2 pr-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                            <FaUserGraduate className="text-[10px]" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[9px] font-black text-white/50 uppercase tracking-widest leading-none mb-0.5">{user?.name?.split(' ')[0]}</span>
                            <span className="text-[10px] font-bold text-white leading-none">{user?.rollNumber}</span>
                        </div>
                    </div>
                    <div className="h-6 w-px bg-white/20 mx-1" />
                    <button 
                        onClick={logoutStudent}
                        className="text-white/70 hover:text-red-400 hover:bg-red-500/10 transition-all p-2 rounded-full flex items-center justify-center"
                        title="Secure Logout"
                    >
                        <FaSignOutAlt className="text-sm drop-shadow-md" />
                    </button>
                </div>
            </motion.div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Action: Mark Attendance - Matches Professor's Create Session Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-7"
          >
            <div className="h-full bg-white/[0.03] backdrop-blur-3xl border-2 border-white/30 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-70" />
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent opacity-70" />

                <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-center gap-4 mb-8 border-b border-white/20 pb-6">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-600 to-emerald-600 flex items-center justify-center shadow-lg shadow-cyan-500/30 border border-white/20">
                            <FaMapMarkerAlt className="text-2xl text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black tracking-tighter text-white leading-none">Attendance Control</h2>
                            <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">Satellite Verification System</p>
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col justify-center py-6">
                        <h3 className="text-4xl font-black mb-4 tracking-tighter text-white/90">Scan Active Session</h3>
                        <p className="text-white/30 text-base mb-10 max-w-md leading-relaxed font-medium">
                            Deploy the direct optical lens to capture the professor's live QR beacon and finalize your spatial presence verification.
                        </p>
                        
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setShowScanner(true)}
                            className="w-full bg-gradient-to-br from-cyan-600 to-emerald-600 py-5 rounded-[1.2rem] font-black text-xs tracking-[0.2em] uppercase shadow-[0_15px_40px_-12px_rgba(6,182,212,0.4)] border-2 border-white/30 transition-all flex items-center justify-center gap-4 text-white overflow-hidden relative group/btn"
                        >
                            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                            <FaSearch className="text-white/60 drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]" /> INITIALIZE SCANNER
                        </motion.button>
                    </div>
                </div>
            </div>
          </motion.div>

          {/* Stats & History Sidebar */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Stats Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/[0.03] backdrop-blur-3xl border-2 border-white/30 p-8 rounded-[2rem] shadow-xl relative overflow-hidden"
            >
                <div className="flex items-center gap-3 mb-4 text-white/40">
                    <FaCalendarCheck className="text-cyan-400" />
                    <span className="font-black uppercase tracking-[0.3em] text-[9px]">Presence Statistics</span>
                </div>
                <div className="flex items-end gap-2">
                    <span className={`text-6xl font-black tracking-tighter ${stats && stats.percentage >= 75 ? 'text-cyan-400' : 'text-amber-400'}`}>
                        {stats ? `${stats.percentage}%` : '0%'}
                    </span>
                    <span className="text-white/20 font-black text-xs uppercase tracking-widest mb-3">Overall</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full mt-4 overflow-hidden border border-white/10">
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${stats ? stats.percentage : 0}%` }}
                        className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                    />
                </div>
            </motion.div>

            {/* History Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex-1 bg-white/[0.03] backdrop-blur-3xl border-2 border-white/30 p-8 rounded-[2rem] shadow-xl relative overflow-hidden"
            >
                <div className="flex items-center gap-3 mb-6 text-white/40">
                    <FaHistory className="text-emerald-400" />
                    <span className="font-black uppercase tracking-[0.3em] text-[9px]">Recent Records</span>
                </div>
                
                <div className="space-y-4">
                    {loadingData ? (
                        Array(3).fill(0).map((_, i) => <div key={i} className="h-10 bg-white/5 animate-pulse rounded-xl" />)
                    ) : history.length === 0 ? (
                        <p className="text-white/20 italic text-[10px] font-black uppercase tracking-widest text-center py-4">No recent records found</p>
                    ) : (
                        history.slice(0, 3).map((record, i) => (
                            <div key={i} className="flex justify-between items-center p-3 rounded-xl bg-black/40 border border-white/5 hover:border-cyan-500/30 transition-all group">
                                <div className="flex flex-col">
                                    <span className="text-xs font-black text-white/80 group-hover:text-cyan-400 transition-colors uppercase tracking-tight">{record.courseCode}</span>
                                    <span className="text-[8px] text-white/20 uppercase tracking-widest font-black mt-1">
                                        {new Date(record.date).toLocaleDateString()}
                                    </span>
                                </div>
                                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                                    <FaCheckCircle className="text-[8px] text-emerald-400" />
                                    <span className="text-[8px] font-black text-emerald-400 uppercase tracking-widest">VERIFIED</span>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <Link href="/student/history" className="block w-full mt-6 py-3 text-center text-[9px] font-black uppercase tracking-[0.3em] text-white/20 hover:text-white border-t border-white/10 transition-colors">
                    Access Detailed Logs →
                </Link>
            </motion.div>
          </div>
        </div>

        {/* Global Terminal Status */}
        <div className="mt-8 text-center">
            <p className="text-white/10 text-[7px] font-black uppercase tracking-[1em] select-none pointer-events-none">
                Live Attend Terminal v1.0.4 • Student Access Authorized
            </p>
        </div>
      </div>
    </main>
  );
}

// Simple Link wrapper for the history link since I can't import Link easily inside the snippet without checking imports
function Link({ href, children, className }: { href: string, children: React.ReactNode, className: string }) {
    return <a href={href} className={className}>{children}</a>;
}
