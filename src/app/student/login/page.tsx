'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import Script from 'next/script';

export default function StudentLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { loginStudent, studentToken, loading: authLoading } = useAuth();
  const router = useRouter();

  // Auto-redirect if already logged in
  useEffect(() => {
    if (studentToken && !authLoading) {
      router.push('/student');
    }
  }, [studentToken, authLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`/api/auth/student/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password: password.trim() }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Login successful!');
        loginStudent(data.token, data.student);
      } else {
        setError(data.message || 'Invalid credentials');
        toast.error(data.message || 'Invalid credentials');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
      toast.error('Connection error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen flex bg-black text-white font-sans overflow-hidden">
      {/* FLOATING RETURN BUTTON - ALWAYS VISIBLE, NO SCROLL NEEDED */}
      <Link 
        href="/" 
        className="absolute top-6 left-6 z-50 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition-all text-[10px] font-black uppercase tracking-[0.2em] shadow-lg backdrop-blur-md"
      >
        <span className="text-sm leading-none mt-[1px]">←</span> Gateway
      </Link>

      {/* COSMIC BACKGROUND */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover z-0 opacity-40"
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
          type="video/mp4"
        />
      </video>

      {/* LEFT SIDE - 3D ROBOT (DESKTOP & TABLET) */}
      <div className="hidden md:flex w-[55%] relative z-10 flex-col items-center justify-center border-r border-white/5">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent opacity-60 pointer-events-none" />
        
        {/* SOFT RADIAL GLOW BEHIND ROBOT */}
        <div className="absolute w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px]" />

        {/* SPEECH BUBBLE */}
        <motion.div 
            initial={{ y: 0 }}
            animate={{ 
                y: [-10, 10, -10],
                x: [-5, 5, -5]
            }}
            transition={{ 
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                x: { duration: 6, repeat: Infinity, ease: "easeInOut" }
            }}
            style={{ opacity: 1 }}
            className="absolute top-[10%] z-20 bg-white/5 backdrop-blur-xl border border-white/20 px-6 py-3 rounded-full shadow-2xl"
        >
            <p className="text-xs font-black tracking-widest uppercase text-cyan-400">Ready to learn today? 🎓</p>
        </motion.div>

        {/* ISOLATED IFRAME TO PREVENT NEXT.JS DEVTOOLS CRASH */}
        <div className="w-full h-full absolute inset-0">
          <iframe 
            src="/spline-robot.html" 
            frameBorder="0" 
            width="100%" 
            height="100%" 
            className="w-full h-full pointer-events-none"
            title="Spline 3D Robot"
            allow="accelerometer; gyroscope; vision; xr-spatial-tracking"
          ></iframe>
        </div>
      </div>

      {/* RIGHT SIDE - LOGIN FORM */}
      <div className="w-full md:w-[45%] relative z-10 flex flex-col items-center justify-center px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-emerald-500/5 pointer-events-none" />
            
            <div className="flex flex-col items-center mb-8 relative z-10">
                <div className="w-24 h-24 flex items-center justify-center mb-5 drop-shadow-[0_0_15px_rgba(6,182,212,0.2)] rounded-full overflow-hidden aspect-square">
                    <Image 
                      src="/hkbk-logo.png" 
                      alt="HKBK Logo" 
                      width={96}
                      height={96}
                      className="w-full h-full object-cover rounded-full" 
                    />
                </div>
                <h1 className="text-3xl font-black mb-1 tracking-tighter">Welcome Back</h1>
                <p className="text-white/40 text-[11px] font-bold uppercase tracking-widest">Log in to continue your learning journey</p>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-xl mb-6 text-[10px] text-center font-black uppercase tracking-widest">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
              <div className="relative group">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)] transition-all group-focus-within:scale-110" />
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-black/40 border border-white/10 focus:border-cyan-500/50 transition-all outline-none text-white font-medium"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-label="Email Address"
                />
              </div>

              <div className="relative group">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.6)] transition-all group-focus-within:scale-110" />
                <input
                  type="password"
                  placeholder="Secure Password"
                  required
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-black/40 border border-white/10 focus:border-emerald-500/50 transition-all outline-none text-white font-medium"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  aria-label="Secure Password"
                />
              </div>

              <div className="flex items-center justify-between px-1">
                  <label className="flex items-center gap-2 cursor-pointer group">
                      <input type="checkbox" className="w-4 h-4 rounded border-white/10 bg-black/40 checked:bg-cyan-500 transition-all" />
                      <span className="text-[10px] font-black text-white/40 uppercase tracking-widest group-hover:text-white/60">Remember me</span>
                  </label>
                  <Link href="/forgot-password" title="Forgot Password" className="text-[10px] font-black text-cyan-400 uppercase tracking-widest hover:text-cyan-300">Forgot Password?</Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-500 hover:to-emerald-500 py-4.5 rounded-2xl font-black text-xs tracking-[0.2em] uppercase shadow-xl transform transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 text-white border border-white/20"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <FaSignInAlt className="text-white/60" /> Log In
                  </>
                )}
              </button>
            </form>



            <p className="mt-8 text-center text-white/40 text-[10px] font-black uppercase tracking-widest relative z-10">
              New student?{' '}
              <Link href="/student/register" className="text-cyan-400 hover:text-white transition-colors duration-300">
                Create Account
              </Link>
            </p>
          </div>
        </motion.div>
      </div>

      {/* MOBILE VIEW ROBOT OVERLAY OMITTED - It was causing Spline 0x0 dimension crashes */}
    </main>
  );
}
