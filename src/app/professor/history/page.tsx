'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHistory, FaUsers, FaDownload, FaChevronRight, FaSearch, FaTimes, FaArrowLeft, FaEye, FaFileDownload } from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function ProfessorHistory() {
  const { professorToken, loading: authLoading } = useAuth();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSession, setSelectedSession] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setMounted(true);
    if (!authLoading && !professorToken) {
      router.push('/professor/login');
    }
  }, [professorToken, authLoading, router]);

  useEffect(() => {
    if (professorToken) {
      fetchHistory();
    }
  }, [professorToken]);

  const fetchHistory = async () => {
    try {
      const res = await fetch(`/api/session/history`, {
        headers: { 'Authorization': `Bearer ${professorToken}` }
      });
      if (res.ok) {
        const data = await res.json();
        setSessions(data);
        if (data.length > 0) {
          toast.success(`${data.length} sessions loaded`);
        }
      } else {
        const errorData = await res.json().catch(() => ({}));
        toast.error(errorData.error || errorData.message || 'Server Error');
      }
    } catch (err) {
      toast.error('Failed to load history');
    } finally {
      setLoading(false);
    }
  };

  const generatePDF = async (session: any, mode: 'download' | 'preview') => {
    const toastId = toast.loading(mode === 'preview' ? 'Opening Preview...' : 'Generating PDF...');
    try {
      const [jsPDFMod, autoTableMod] = await Promise.all([
        import('jspdf'),
        import('jspdf-autotable')
      ]);
      const jsPDF = jsPDFMod.default;
      const autoTable = autoTableMod.default;
      
      const doc = new jsPDF();
      const date = new Date(session.createdAt).toLocaleDateString();

      doc.setFontSize(22);
      doc.setTextColor(20, 20, 20);
      doc.text('LiveAttend — Attendance Report', 14, 20);
      
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text(`COURSE: ${session.courseCode}`, 14, 28);
      doc.text(`SUBJECT: ${session.subjectName || 'N/A'}`, 14, 33);
      doc.text(`SESSION ID: ${session.id}`, 14, 38);
      doc.text(`SESSION DATE: ${date}`, 14, 43);
      
      doc.setDrawColor(168, 85, 247);
      doc.line(14, 47, 196, 47);

      const tableData = (session.attendees || []).map((s: any, i: number) => [
        i + 1,
        s.studentName || 'N/A',
        s.rollNumber || 'N/A',
        'VERIFIED',
        new Date(s.timestamp).toLocaleTimeString()
      ]);

      autoTable(doc, {
        head: [['#', 'STUDENT NAME', 'ROLL NO.', 'STATUS', 'VERIFIED AT']],
        body: tableData,
        startY: 48,
        theme: 'grid',
        headStyles: { fillColor: [168, 85, 247], textColor: [255, 255, 255], fontSize: 10, fontStyle: 'bold' },
        styles: { fontSize: 9 },
        alternateRowStyles: { fillColor: [245, 245, 245] }
      });

      const finalY = (doc as any).lastAutoTable.finalY || 60;
      doc.setFontSize(10);
      doc.text(`Total Present: ${tableData.length}`, 14, finalY + 12);
      doc.setFontSize(8);
      doc.text(`Generated: ${new Date().toLocaleString()}`, 14, finalY + 18);

      if (mode === 'preview') {
        const blob = doc.output('blob');
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
        toast.success('Preview Opened!', { id: toastId });
      } else {
        doc.save(`attendance-${session.courseCode}-${session.subjectName || 'report'}-${date.replace(/\//g, '-')}.pdf`);
        toast.success('Historical Report Downloaded!', { id: toastId });
      }
    } catch (err) {
      toast.error('Failed to generate PDF', { id: toastId });
    }
  };

  const downloadCSV = async (session: any) => {
    const toastId = toast.loading('Exporting Excel Data...');
    try {
      const headers = ['#', 'Student Name', 'Roll Number', 'Status', 'Verified At', 'Subject'];
      const rows = (session.attendees || []).map((s: any, i: number) => [
        i + 1,
        s.studentName || 'N/A',
        s.rollNumber || 'N/A',
        'VERIFIED',
        new Date(s.timestamp).toLocaleString(),
        session.subjectName || 'N/A'
      ]);

      const csvContent = [
        headers.join(','),
        ...rows.map(r => r.map(c => `"${c}"`).join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `attendance-${session.courseCode}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success('Excel CSV Downloaded!', { id: toastId });
    } catch (err) {
      toast.error('Failed to export Excel data', { id: toastId });
    }
  };

  const filteredSessions = sessions.filter(s => {
    const code = s.courseCode?.toLowerCase() || '';
    const subject = s.subjectName?.toLowerCase() || '';
    const search = searchTerm.toLowerCase();
    const id = s.id || '';
    
    return code.includes(search) || subject.includes(search) || id.includes(search);
  });

  const getStatusBadge = (session: any) => {
    const now = new Date();
    const expires = new Date(session.expiresAt);
    if (session.isActive && now < expires) {
      return <span className="bg-green-500/10 border border-green-500/30 text-green-400 px-2 py-1 rounded text-[9px] font-black uppercase tracking-widest">Active</span>;
    } else if (!session.isActive) {
      return <span className="bg-gray-500/10 border border-gray-500/30 text-gray-400 px-2 py-1 rounded text-[9px] font-black uppercase tracking-widest">Completed</span>;
    } else {
      return <span className="bg-red-500/10 border border-red-500/30 text-red-400 px-2 py-1 rounded text-[9px] font-black uppercase tracking-widest">Expired</span>;
    }
  };

  if (!mounted || authLoading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
    </div>
  );

  return (
    <main className="relative min-h-screen bg-black text-white p-4 md:p-8 font-sans overflow-x-hidden">
      <video autoPlay loop muted playsInline className="fixed inset-0 w-full h-full object-cover z-0 opacity-40 grayscale">
        <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4" type="video/mp4" />
      </video>

      <div className="relative z-10 max-w-5xl mx-auto mt-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <Link href="/professor" className="text-white/40 hover:text-white flex items-center gap-2 text-[10px] font-black uppercase tracking-widest mb-4 transition-colors">
              <FaArrowLeft /> Back to Dashboard
            </Link>
            <div className="flex items-center gap-4">
              <img src="/hkbk-logo.png" alt="Logo" className="w-10 h-10 rounded-full aspect-square object-cover border border-white/20" />
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                Session History
              </h1>
            </div>
          </div>
          
          <div className="relative w-full md:w-64">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
            <input 
              type="text" 
              placeholder="SEARCH SESSIONS..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-xs font-bold tracking-widest uppercase outline-none focus:border-purple-500 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            Array(6).fill(0).map((_, i) => (
              <div key={i} className="bg-white/5 h-48 rounded-[2rem] animate-pulse border border-white/5"></div>
            ))
          ) : filteredSessions.length === 0 ? (
            <div className="col-span-full py-20 text-center bg-white/[0.02] rounded-[3rem] border border-dashed border-white/10">
              <p className="text-white/20 italic font-medium">No sessions yet — create your first session to begin tracking.</p>
            </div>
          ) : (
            filteredSessions.map((session) => {
              const present = session.attendees?.length || 0;
              const attendanceRate = Math.min(Math.round((present / 50) * 100), 100); // 50 as default max for visual

              return (
                <motion.div key={session.id} whileHover={{ y: -5 }} className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 p-7 rounded-[2rem] flex flex-col justify-between group shadow-2xl">
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h2 className="text-xl font-black tracking-tight text-white group-hover:text-purple-400 transition-colors">{session.courseCode}</h2>
                        <p className="text-[10px] text-purple-400 font-black uppercase tracking-widest mt-0.5">
                          {session.subjectName || 'GENERAL SESSION'}
                        </p>
                        <p className="text-[9px] text-white/30 font-bold uppercase tracking-widest mt-1">
                          {new Date(session.createdAt).toLocaleDateString()} • {new Date(session.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </p>
                      </div>
                      {getStatusBadge(session)}
                    </div>

                    <div className="space-y-3 mb-8">
                      <div className="flex justify-between text-[10px] uppercase tracking-[0.2em] font-black">
                        <span className="text-white/40">Student Count</span>
                        <span className="text-cyan-400">{present} PRESENT</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${attendanceRate}%` }} className="h-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]"></motion.div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button 
                      onClick={() => setSelectedSession(session)}
                      className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all"
                    >
                      View Details <FaChevronRight className="text-[8px]" />
                    </button>
                    <button 
                      onClick={() => downloadCSV(session)}
                      className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all group/btn"
                      title="Download Excel CSV"
                    >
                      <FaFileDownload className="text-purple-400 group-hover/btn:text-white transition-colors" />
                    </button>
                    <button 
                      onClick={() => generatePDF(session, 'preview')}
                      className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all group/btn"
                      title="Preview PDF"
                    >
                      <FaEye className="text-blue-400 group-hover/btn:text-white transition-colors" />
                    </button>
                    <button 
                      onClick={() => generatePDF(session, 'download')}
                      className="p-3 bg-cyan-500/10 hover:bg-cyan-500 border border-cyan-500/20 rounded-xl transition-all group/btn"
                      title="Download PDF"
                    >
                      <FaDownload className="text-cyan-400 group-hover/btn:text-white transition-colors" />
                    </button>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </div>

      <AnimatePresence>
        {selectedSession && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedSession(null)} className="absolute inset-0 bg-black/80 backdrop-blur-md"></motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-[3rem] p-10 shadow-2xl max-h-[85vh] overflow-hidden flex flex-col">
              <div className="flex justify-between items-start mb-10">
                <div>
                  <h2 className="text-3xl font-black tracking-tighter text-cyan-400">{selectedSession.courseCode}</h2>
                  <p className="text-white/30 text-[10px] uppercase tracking-[0.4em] font-black mt-1">Attendance Verification Log</p>
                </div>
                <button onClick={() => setSelectedSession(null)} className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors border border-white/5">
                  <FaTimes className="text-white/40" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                <table className="w-full text-left">
                  <thead className="sticky top-0 bg-[#0a0a0a] z-10">
                    <tr className="text-[10px] text-white/20 uppercase tracking-[0.3em] font-black border-b border-white/5">
                      <th className="p-4">Student Identity</th>
                      <th className="p-4">Roll Number</th>
                      <th className="p-4">Verification Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {selectedSession.attendees?.map((att: any, i: number) => (
                      <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                        <td className="p-4 font-bold text-white/90">{att.studentName}</td>
                        <td className="p-4 text-white/40 text-sm font-mono tracking-widest">{att.rollNumber}</td>
                        <td className="p-4 text-white/60 text-xs font-mono">{new Date(att.timestamp).toLocaleTimeString()}</td>
                      </tr>
                    ))}
                    {(!selectedSession.attendees || selectedSession.attendees.length === 0) && (
                      <tr>
                        <td colSpan={3} className="p-16 text-center text-white/10 italic font-medium">No verification records found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="mt-10 pt-8 border-t border-white/5 flex flex-col md:flex-row gap-3 justify-between items-center">
                <div className="text-[10px] text-white/20 font-black uppercase tracking-[0.4em]">
                  Total Present: <span className="text-cyan-400">{selectedSession.attendees?.length || 0}</span>
                </div>
                <div className="flex flex-wrap gap-2 w-full md:w-auto">
                  <button onClick={() => downloadCSV(selectedSession)} className="flex-1 md:flex-none bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-3 rounded-xl font-black text-[9px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all transform active:scale-95 text-purple-400">
                    <FaFileDownload /> EXCEL CSV
                  </button>
                  <button onClick={() => generatePDF(selectedSession, 'preview')} className="flex-1 md:flex-none bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-3 rounded-xl font-black text-[9px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all transform active:scale-95 text-blue-400">
                    <FaEye /> PREVIEW
                  </button>
                  <button onClick={() => generatePDF(selectedSession, 'download')} className="flex-1 md:flex-none bg-cyan-500 hover:bg-cyan-400 px-6 py-3 rounded-xl font-black text-[9px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all transform active:scale-95 text-black shadow-lg shadow-cyan-900/20">
                    <FaDownload /> DOWNLOAD
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.05); border-radius: 10px; }
      `}</style>
    </main>
  );
}
