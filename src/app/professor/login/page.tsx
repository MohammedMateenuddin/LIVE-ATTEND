'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

export default function ProfessorLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { loginProfessor, professorToken, loading: authLoading } = useAuth();
  const router = useRouter();

  // Auto-redirect if already logged in
  useEffect(() => {
    if (professorToken && !authLoading) {
      router.push('/professor');
    }
  }, [professorToken, authLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('${process.env.NEXT_PUBLIC_API_URL || `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}`}/api/auth/professor/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password: password.trim() }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Login successful!');
        loginProfessor(data.token, data.professor);
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
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-black text-white font-sans overflow-hidden">
      {/* FLOATING RETURN BUTTON - ALWAYS VISIBLE, NO SCROLL NEEDED */}
      <Link 
        href="/" 
        className="absolute top-6 left-6 z-50 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition-all text-[10px] font-black uppercase tracking-[0.2em] shadow-lg backdrop-blur-md"
      >
        <span className="text-sm leading-none mt-[1px]">←</span> Gateway
      </Link>

      {/* SAME VIDEO BACKGROUND AS HOME PAGE */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover z-0 opacity-80"
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
          type="video/mp4"
        />
      </video>

      {/* Dark overlay for readability */}
      <div className="fixed inset-0 bg-black/40 z-[1]" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 w-full max-w-md px-6"
      >
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-[1.5rem] shadow-2xl">
          <div className="flex flex-col items-center mb-8 relative z-10">
              <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mb-5 shadow-lg shadow-purple-500/20 border-2 border-purple-500/30 overflow-hidden aspect-square">
                  <Image 
                    src="/hkbk-logo.png" 
                    alt="HKBK Logo" 
                    width={80} 
                    height={80} 
                    className="w-full h-full object-cover rounded-full" 
                  />
              </div>
              <h1 className="text-3xl font-black mb-1 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Welcome Back</h1>
          </div>
          <p className="text-white/40 text-center mb-8 text-[10px] font-black uppercase tracking-[0.2em]">
            Professor Authentication
          </p>

          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-200 p-3 rounded-xl mb-6 text-xs text-center font-bold">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative group">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.6)] transition-all group-focus-within:scale-110" />
              <input
                type="email"
                placeholder="Email Address"
                required
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-black/40 border border-white/5 focus:border-purple-500/50 transition-all outline-none text-white font-medium"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="relative group">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-400 drop-shadow-[0_0_8px_rgba(236,72,153,0.6)] transition-all group-focus-within:scale-110" />
              <input
                type="password"
                placeholder="Secure Password"
                required
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-black/40 border border-white/5 focus:border-pink-500/50 transition-all outline-none text-white font-medium"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 py-4 rounded-2xl font-black text-xs tracking-[0.2em] uppercase shadow-xl transform transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 text-white"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <FaSignInAlt className="text-white/60 drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]" /> Access Portal
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-white/40 text-[10px] font-black uppercase tracking-widest">
            New here?{' '}
            <Link href="/professor/register" className="text-purple-400 hover:text-white transition-colors duration-300">
              Create Profile
            </Link>
          </p>
        </div>
      </motion.div>
    </main>
  );
}
