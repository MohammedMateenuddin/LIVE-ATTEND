'use client';

import { useState, useEffect } from 'react';
import { FaPlusCircle, FaClock, FaSignOutAlt, FaUserTie, FaBook, FaBullseye, FaHourglassHalf } from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

export default function ProfessorDashboard() {
    const { user, professorToken, loading: authLoading, logoutProfessor } = useAuth();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        subjectName: '',
        courseCode: '',
        radius: 50,
        durationMinutes: 1,
    });

    useEffect(() => {
        setMounted(true);
        if (!authLoading && !professorToken) {
            router.push('/professor/login');
        }
        if (user) {
            setFormData(prev => ({ ...prev, subjectName: '' })); // User enters subject manually
        }
    }, [user, professorToken, authLoading, router]);

    const handleStartSession = async () => {
        if (!formData.subjectName.trim()) {
            setError('Subject is required');
            toast.error('Subject is required');
            return;
        }

        if (!formData.courseCode.trim()) {
            setError('Course Code is required');
            toast.error('Course Code is required');
            return;
        }

        setLoading(true);
        setError('');

        if (!navigator.geolocation) {
            toast.error('Geolocation is not supported by your browser');
            setLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                
                try {
                    const res = await fetch('http://localhost:5000/api/sessions/create', {
                        method: 'POST',
                        headers: { 
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${professorToken}`
                        },
                        body: JSON.stringify({
                            ...formData,
                            latitude,
                            longitude
                        }),
                    });

                    const data = await res.json();

                    if (res.ok) {
                        toast.success('Session started!');
                        router.push(`/professor/session/${data.id || data._id}`);
                    } else {
                        setError(data.message || 'Failed to create session');
                        toast.error(data.message || 'Failed to create session');
                    }
                } catch (err) {
                    setError('Connection error. Please try again.');
                    toast.error('Connection error.');
                } finally {
                    setLoading(false);
                }
            },
            (err) => {
                setLoading(false);
                setError('Location access is required to start a session');
                toast.error('Please allow location access to start the session');
            }
        );
    };

    if (!mounted || authLoading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    return (
        <main className="relative min-h-screen bg-black text-white p-4 md:p-6 font-sans overflow-y-auto overflow-x-hidden flex flex-col items-center justify-center">
            {/* ENHANCED VIDEO BACKGROUND */}
            <video autoPlay loop muted playsInline className="fixed inset-0 w-full h-full object-cover z-0 opacity-60 transition-opacity duration-1000">
                <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4" type="video/mp4" />
            </video>

            {/* Lightened Cinematic Overlay */}
            <div className="fixed inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70 z-[1] pointer-events-none transition-all duration-1000" />

            <div className="relative z-10 max-w-4xl mx-auto w-full flex flex-col justify-center py-8 lg:py-0 min-h-full">
                {/* Compact Header */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex flex-col items-center md:items-start"
                    >
                        <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
                            Dashboard
                        </h1>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                            <p className="text-white/80 text-[10px] font-black tracking-[0.5em] uppercase drop-shadow-md">Faculty Terminal</p>
                        </div>
                    </motion.div>
                    
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-3"
                    >
                        <button 
                            onClick={() => router.push('/professor/history')}
                            className="bg-white/5 hover:bg-white/10 border border-white/20 px-4 py-2 rounded-full text-[9px] font-black tracking-widest uppercase transition-all flex items-center gap-2 backdrop-blur-md"
                        >
                            <FaClock className="text-purple-400" /> History
                        </button>
                        
                        <div className="flex items-center gap-4 bg-white/5 backdrop-blur-2xl border border-white/30 px-4 py-2 rounded-full shadow-2xl">
                            <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
                                    <FaUserTie className="text-[10px]" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[9px] font-black text-white/50 uppercase tracking-widest leading-none mb-0.5">{user?.name?.split(' ')[0]}</span>
                                    <span className="text-[10px] font-bold text-white leading-none">{user?.name}</span>
                                </div>
                            </div>
                            <button 
                                onClick={logoutProfessor}
                                className="text-white/30 hover:text-red-400 transition-colors border-l border-white/20 pl-4"
                            >
                                <FaSignOutAlt className="text-xs" />
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* Create Session Card */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-xl mx-auto w-full"
                >
                    <div className="bg-white/[0.03] backdrop-blur-3xl border-2 border-white/30 p-8 rounded-[2.5rem] shadow-[0_0_100px_-10px_rgba(168,85,247,0.25)] relative overflow-hidden group">
                        {/* Interactive Border Glow Accent */}
                        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent opacity-70" />
                        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-pink-500/50 to-transparent opacity-70" />

                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-6 border-b border-white/20 pb-5">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/30 border border-white/20">
                                    <FaPlusCircle className="text-xl text-white" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-black tracking-tighter text-white leading-none">Create Session</h2>
                                    <p className="text-white/40 text-[9px] font-bold uppercase tracking-[0.2em] mt-1">Live Attendance Beacon</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="space-y-4 md:col-span-2">
                                    {/* Subject Field */}
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-white/70 uppercase tracking-[0.3em] ml-2 border-l-2 border-purple-500 pl-2 leading-none">Subject</label>
                                        <div className="relative group/input">
                                            <FaBook className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.6)] transition-colors text-[13px]" />
                                            <input
                                                type="text"
                                                placeholder="e.G. DATA STRUCTURES"
                                                className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-black/60 border-2 border-white/30 text-white font-black text-[15px] outline-none shadow-inner focus:border-purple-500/60 uppercase"
                                                value={formData.subjectName}
                                                onChange={(e) => setFormData({ ...formData, subjectName: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    {/* Course Code Field */}
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-white/70 uppercase tracking-[0.3em] ml-2 border-l-2 border-emerald-500 pl-2 leading-none">Course Code</label>
                                        <div className="relative group/input">
                                            <FaBook className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.6)] group-focus-within/input:text-purple-400 transition-colors text-[13px]" />
                                            <input
                                                type="text"
                                                placeholder="e.G. CS101-Alpha"
                                                className={`w-full pl-12 pr-4 py-3.5 rounded-xl bg-black/75 border-2 ${error && !formData.courseCode ? 'border-red-500/50' : 'border-white/40'} focus:border-purple-500/60 focus:shadow-[0_0_20px_-5px_rgba(168,85,247,0.3)] transition-all outline-none font-black text-[15px] tracking-widest placeholder:text-white/20 uppercase text-white shadow-lg`}
                                                value={formData.courseCode}
                                                onChange={(e) => setFormData({ ...formData, courseCode: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Radius Field */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-white/70 uppercase tracking-[0.3em] ml-2 border-l-2 border-amber-500 pl-2 leading-none">Radius (M)</label>
                                    <div className="relative group/input">
                                        <FaBullseye className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)] group-focus-within/input:text-purple-400 transition-colors text-[13px]" />
                                        <input
                                            type="number"
                                            className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-black/75 border-2 border-white/40 focus:border-amber-500/60 focus:shadow-[0_0_20px_-5px_rgba(251,191,36,0.3)] transition-all outline-none font-black text-[15px] text-white shadow-lg"
                                            value={formData.radius}
                                            onChange={(e) => setFormData({ ...formData, radius: Number(e.target.value) })}
                                        />
                                    </div>
                                </div>

                                {/* Time Field */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-white/70 uppercase tracking-[0.3em] ml-2 border-l-2 border-cyan-500 pl-2 leading-none">Time (Min)</label>
                                    <div className="relative group/input">
                                        <FaHourglassHalf className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)] group-focus-within/input:text-purple-400 transition-colors text-[13px]" />
                                        <input
                                            type="number"
                                            className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-black/75 border-2 border-white/40 focus:border-cyan-500/60 focus:shadow-[0_0_20px_-5px_rgba(34,211,238,0.3)] transition-all outline-none font-black text-[15px] text-white shadow-lg"
                                            value={formData.durationMinutes}
                                            onChange={(e) => setFormData({ ...formData, durationMinutes: Number(e.target.value) })}
                                        />
                                    </div>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    onClick={handleStartSession}
                                    disabled={loading}
                                    className="md:col-span-2 w-full bg-gradient-to-br from-purple-600 to-pink-600 py-4.5 rounded-[1.2rem] font-black text-sm tracking-[0.1em] shadow-[0_15px_40px_-12px_rgba(168,85,247,0.4)] hover:shadow-[0_15px_50px_-12px_rgba(168,85,247,0.6)] border-2 border-white/30 transition-all flex items-center justify-center gap-3 mt-2 overflow-hidden relative group/btn"
                                >
                                    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                                    {loading ? (
                                        <div className="w-5 h-5 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <FaPlusCircle className="text-lg opacity-50" /> START SESSION
                                        </>
                                    )}
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Status Details */}
            <div className="fixed bottom-6 right-6 flex items-center gap-2 text-[7px] font-black text-white/10 uppercase tracking-[1em] pointer-events-none select-none z-50">
                Live Attend Terminal v1.0.4
            </div>
        </main>
    );
}
