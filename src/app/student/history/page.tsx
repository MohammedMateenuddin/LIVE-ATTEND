'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHistory, FaCheckCircle, FaCalendarAlt, FaChartLine, FaArrowLeft, FaFilter } from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function StudentHistory() {
  const { studentToken, loading: authLoading } = useAuth();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [history, setHistory] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    setMounted(true);
    if (!authLoading && !studentToken) {
      router.push('/student/login');
    }
  }, [studentToken, authLoading, router]);

  useEffect(() => {
    if (studentToken) {
      fetchHistory();
    }
  }, [studentToken]);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const [historyRes, statsRes] = await Promise.all([
        fetch(`/api/attendance/student/history?rollNumber=${user?.rollNumber}`, {
          headers: { 'Authorization': `Bearer ${studentToken}` }
        }),
        fetch(`/api/attendance/student/stats?rollNumber=${user?.rollNumber}`, {
          headers: { 'Authorization': `Bearer ${studentToken}` }
        })
      ]);

      if (historyRes.ok) setHistory(await historyRes.json());
      if (statsRes.ok) setStats(await statsRes.json());
    } catch (err) {
      toast.error('Failed to load history');
    } finally {
      setLoading(false);
    }
  };

  const filteredHistory = history.filter(item => 
    filter === 'All' || item.status === filter
  );

  if (!mounted || authLoading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
    </div>
  );

  return (
    <main className="relative min-h-screen bg-black text-white p-4 md:p-8 font-sans overflow-x-hidden">
      <video autoPlay loop muted playsInline className="fixed inset-0 w-full h-full object-cover z-0 opacity-20 grayscale">
        <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4" type="video/mp4" />
      </video>

      <div className="relative z-10 max-w-5xl mx-auto mt-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <Link href="/student" className="text-white/40 hover:text-cyan-400 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest mb-4 transition-colors">
              <FaArrowLeft /> Back to Dashboard
            </Link>
            <div className="flex items-center gap-4">
              <img src="/hkbk-logo.png" alt="HKBK Logo" className="w-12 h-12 object-contain" />
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-500">
                Attendance Archive
              </h1>
            </div>
          </div>
          
          <div className="flex p-1 bg-white/5 rounded-2xl border border-white/10">
            {['All', 'Present'].map(t => (
              <button 
                key={t}
                onClick={() => setFilter(t)}
                className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filter === t ? 'bg-cyan-500 text-black' : 'text-white/40 hover:text-white'}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* STATS OVERVIEW */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { label: 'Total Sessions', val: stats?.total || 0, icon: FaCalendarAlt, color: 'text-white' },
            { label: 'Verified Present', val: stats?.attended || 0, icon: FaCheckCircle, color: 'text-emerald-400' },
            { label: 'Attendance Rate', val: `${stats?.percentage || 0}%`, icon: FaChartLine, color: 'text-cyan-400' },
          ].map((stat, i) => (
            <div key={i} className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 p-8 rounded-[2rem] shadow-2xl">
              <div className="flex items-center gap-4 mb-4">
                <div className={`p-3 rounded-xl bg-white/5 ${stat.color}`}>
                  <stat.icon />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-white/40">{stat.label}</span>
              </div>
              <div className={`text-4xl font-black tracking-tight ${stat.color}`}>{stat.val}</div>
            </div>
          ))}
        </div>

        {/* HISTORY LIST */}
        <div className="bg-white/[0.02] backdrop-blur-3xl border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl">
          <div className="p-8 border-b border-white/5 flex items-center gap-3">
            <FaHistory className="text-cyan-500" />
            <h2 className="text-xl font-black uppercase tracking-tight">Recent Verifications</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] text-white/20 uppercase tracking-[0.3em] font-black border-b border-white/5">
                  <th className="p-8">Course Identification</th>
                  <th className="p-8">Verification Date</th>
                  <th className="p-8">System Time</th>
                  <th className="p-8 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loading ? (
                  Array(5).fill(0).map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td colSpan={4} className="p-8"><div className="h-6 bg-white/5 rounded-xl w-full"></div></td>
                    </tr>
                  ))
                ) : filteredHistory.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-20 text-center text-white/10 italic font-medium">No records found in the archive.</td>
                  </tr>
                ) : (
                  filteredHistory.map((item, idx) => (
                    <tr key={idx} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="p-8">
                        <span className="text-lg font-black text-white/90 group-hover:text-cyan-400 transition-colors">{item.courseCode}</span>
                        <div className="text-[9px] text-white/20 mt-1 uppercase tracking-widest font-black">Ref: {item.sessionId.slice(-8)}</div>
                      </td>
                      <td className="p-8 text-white/60 font-bold">{new Date(item.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</td>
                      <td className="p-8 text-white/40 font-mono tracking-widest">{new Date(item.markedAt).toLocaleTimeString()}</td>
                      <td className="p-8 text-right">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl text-[10px] font-black uppercase tracking-[0.2em]">
                          <FaCheckCircle className="text-[8px]" /> Present
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.05); border-radius: 10px; }
      `}</style>
    </main>
  );
}
