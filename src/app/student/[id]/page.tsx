'use client';

import { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaHistory, FaUserGraduate, FaClock, FaCalendarAlt, FaChartLine } from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';

export default function StudentDashboard() {
  const params = useParams();
  const sessionId = params?.id as string;
  const searchParams = useSearchParams();
  const initialToken = searchParams.get('t');
  
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [scanning, setScanning] = useState(true);
  const [success, setSuccess] = useState(false);
  const [history, setHistory] = useState<any[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [activeTab, setActiveTab] = useState('All');

  useEffect(() => {
    setMounted(true);
  }, []);

  // AUTO-MARK IF TOKEN IS IN URL
  useEffect(() => {
    if (initialToken && user && !authLoading) {
      markAttendance(sessionId, initialToken);
    }
  }, [initialToken, user, authLoading]);

  // FETCH HISTORY
  useEffect(() => {
    if (user?.id) {
      fetchHistory();
    }
  }, [user]);

  const fetchHistory = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/attendance/student/${user.id}/history`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      if (res.ok) {
        const data = await res.json();
        setHistory(data);
      }
    } catch (err) {
      console.error('History fetch error:', err);
    } finally {
      setLoadingHistory(false);
    }
  };

  const markAttendance = async (sId: string, token: string) => {
    setScanning(false);
    const toastId = toast.loading('Verifying security token...');
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/attendance/mark`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ sessionId: sId, token })
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message, { id: toastId });
        setSuccess(true);
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#06b6d4', '#ffffff', '#a855f7']
        });
        fetchHistory();
      } else {
        toast.error(data.message || 'Verification failed', { id: toastId });
        setScanning(true);
      }
    } catch (err) {
      toast.error('Connection error', { id: toastId });
      setScanning(true);
    }
  };

  // QR SCANNER SETUP
  useEffect(() => {
    if (scanning && !success && !initialToken) {
      const scanner = new Html5QrcodeScanner(
        "reader",
        { fps: 10, qrbox: { width: 250, height: 250 } },
        /* verbose= */ false
      );

      scanner.render((decodedText) => {
        try {
          const url = new URL(decodedText);
          const sId = url.pathname.split('/').pop();
          const token = url.searchParams.get('t');
          if (sId && token) {
            scanner.clear();
            markAttendance(sId, token);
          }
        } catch (e) {
          toast.error("Invalid QR Code");
        }
      }, (error) => {
        // console.warn(error);
      });

      return () => {
        scanner.clear().catch(err => console.warn("Scanner clear failed", err));
      };
    }
  }, [scanning, success, initialToken]);

  // STATS
  const totalClasses = history.length;
  const presentCount = history.filter(h => h.status === 'Present').length;
  const attendancePercentage = totalClasses > 0 ? Math.round((presentCount / totalClasses) * 100) : 0;

  if (!mounted || authLoading) return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white space-y-4">
      <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-white/40 uppercase tracking-widest text-[10px] font-black">Connecting to Spatial Node...</p>
    </div>
  );
  if (!user) {
    router.push('/student/login');
    return null;
  }

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-start bg-black text-white p-4 md:p-8 overflow-x-hidden font-sans">
      {/* VIDEO BACKGROUND */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover z-0 opacity-40 grayscale"
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
          type="video/mp4"
        />
      </video>

      <div className="z-10 w-full max-w-4xl space-y-8 mt-10 md:mt-20">
        {/* SCANNER SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="liquid-glass rounded-[2rem] border border-white/10 p-8 md:p-12 shadow-2xl relative overflow-hidden"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black tracking-tight text-[#06b6d4] font-serif mb-2">
              Mark Your Attendance
            </h1>
            <p className="text-white/40 text-sm uppercase tracking-widest font-bold">
              Precision Spatial Verification
            </p>
          </div>

          <div className="relative flex flex-col items-center">
            {success ? (
              <motion.div 
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center py-10"
              >
                <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-6 border-2 border-green-500 shadow-[0_0_30px_rgba(34,197,94,0.4)]">
                  <FaCheckCircle className="text-5xl text-green-500" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Attendance Confirmed!</h2>
                <p className="text-white/60 italic">"Your ascent continues..."</p>
                <button 
                  onClick={() => { setSuccess(false); setScanning(true); }}
                  className="mt-8 text-[#06b6d4] hover:text-white transition-colors text-sm font-bold uppercase tracking-widest"
                >
                  Scan Again
                </button>
              </motion.div>
            ) : (
              <div className="w-full max-w-sm relative group">
                {/* Viewfinder Brackets */}
                <div className="absolute inset-0 z-20 pointer-events-none">
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#06b6d4] rounded-tl-xl scan-corner"></div>
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#06b6d4] rounded-tr-xl scan-corner"></div>
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-[#06b6d4] rounded-bl-xl scan-corner"></div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[#06b6d4] rounded-br-xl scan-corner"></div>
                </div>
                
                <div id="reader" className="overflow-hidden rounded-2xl border border-white/5 bg-black/40 backdrop-blur-sm"></div>
                
                {!initialToken && (
                  <p className="mt-6 text-center text-xs text-white/30 uppercase tracking-[0.3em] font-black">
                    Align QR within the frame
                  </p>
                )}
              </div>
            )}
          </div>
        </motion.div>

        {/* HISTORY & STATS SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="liquid-glass rounded-[2rem] border border-white/10 p-8 shadow-2xl"
        >
          {/* STATS PILLS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { label: 'Total Classes', val: totalClasses, icon: FaCalendarAlt, color: 'text-white/60' },
              { label: 'Present', val: presentCount, icon: FaCheckCircle, color: 'text-green-400' },
              { label: 'Absent', val: totalClasses - presentCount, icon: FaHistory, color: 'text-red-400' },
              { label: 'Percentage', val: `${attendancePercentage}%`, icon: FaChartLine, color: 'text-cyan-400' },
            ].map((stat, i) => (
              <div key={i} className="bg-white/5 border border-white/5 rounded-2xl p-4 flex flex-col items-center text-center">
                <stat.icon className={`${stat.color} mb-2 text-lg`} />
                <span className="text-xs text-white/40 uppercase tracking-tighter font-bold mb-1">{stat.label}</span>
                <span className="text-xl font-black tabular-nums">{stat.val}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 border-b border-white/5 pb-6">
            <h3 className="text-xl font-bold flex items-center gap-3">
              <FaHistory className="text-[#06b6d4]" />
              Attendance History
            </h3>
            
            <div className="flex p-1 bg-white/5 rounded-xl border border-white/5">
              {['All', 'Present', 'Absent'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeTab === tab ? 'bg-[#06b6d4] text-black shadow-lg shadow-cyan-900/40' : 'text-white/60 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-black border-b border-white/5">
                  <th className="p-4">Subject</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Time</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Session ID</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loadingHistory ? (
                  Array(3).fill(0).map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td colSpan={5} className="p-6"><div className="h-4 bg-white/5 rounded w-full"></div></td>
                    </tr>
                  ))
                ) : history.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-20 text-center text-white/20 italic">
                      No attendance records found. Scan a QR to begin.
                    </td>
                  </tr>
                ) : (
                  history
                    .filter(h => activeTab === 'All' || h.status === activeTab)
                    .map((item, idx) => (
                    <tr key={idx} className="hover:bg-white/5 transition-colors group">
                      <td className="p-4 font-bold text-cyan-400/80 group-hover:text-cyan-400">{item.courseCode}</td>
                      <td className="p-4 text-white/60 text-sm">{new Date(item.date).toLocaleDateString()}</td>
                      <td className="p-4 text-white/40 text-xs font-mono">{new Date(item.markedAt).toLocaleTimeString()}</td>
                      <td className="p-4">
                        <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-green-500/10 text-green-400 border border-green-500/20 shadow-[0_0_10px_rgba(34,197,94,0.1)]">
                          {item.status}
                        </span>
                      </td>
                      <td className="p-4 text-[10px] text-white/20 font-mono">{item.sessionId}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      <style jsx global>{`
        @keyframes scan-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.98); }
        }
        .scan-corner { animation: scan-pulse 1.5s ease-in-out infinite; }
        
        #reader { width: 100% !important; border: none !important; }
        #reader__scan_region { background: transparent !important; }
        #reader__dashboard_section_csr button {
          background: rgba(6, 182, 212, 0.1) !important;
          color: #06b6d4 !important;
          border: 1px solid rgba(6, 182, 212, 0.2) !important;
          border-radius: 12px !important;
          padding: 8px 16px !important;
          font-weight: bold !important;
          font-size: 12px !important;
          text-transform: uppercase !important;
          letter-spacing: 1px !important;
        }
      `}</style>
    </main>
  );
}
