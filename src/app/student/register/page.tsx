'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { FaUser, FaEnvelope, FaLock, FaIdCard, FaUserPlus } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function StudentRegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { loginStudent, studentToken } = useAuth();
  const router = useRouter();

  // Auto-redirect if already logged in
  useEffect(() => {
    if (studentToken) {
      router.push('/student');
    }
  }, [studentToken, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/auth/student/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email: email.trim(), rollNumber: rollNumber.trim(), password: password.trim() }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Account created! Welcome to Live Attend.');
        loginStudent(data.token, data.student);
      } else {
        toast.error(data.message || 'Registration failed');
      }
    } catch (err) {
      toast.error('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-[#050a0a] text-white relative overflow-hidden font-sans">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[10%] w-[500px] h-[500px] bg-cyan-600/10 rounded-full mix-blend-screen filter blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[10%] w-[600px] h-[600px] bg-emerald-600/10 rounded-full mix-blend-screen filter blur-[120px] animate-pulse animation-delay-2000"></div>
      </div>

      <div className="z-10 w-full max-w-md">
        <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 p-10 rounded-[2.5rem] shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)]">
          <div className="flex flex-col items-center mb-8">
            <div className="w-24 h-24 flex items-center justify-center mb-5 drop-shadow-[0_0_15px_rgba(6,182,212,0.2)] rounded-full overflow-hidden aspect-square mx-auto">
                <Image 
                  src="/hkbk-logo.png" 
                  alt="HKBK Logo" 
                  width={96}
                  height={96}
                  className="w-full h-full object-cover rounded-full" 
                />
            </div>
            <h1 className="text-4xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400">
              Join Live Attend
            </h1>
            <p className="text-gray-500 mt-2 font-medium tracking-wide text-center">Create your secure student identity</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Full Name</label>
              <div className="relative group">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-cyan-500 transition-colors" />
                <input
                  type="text"
                  placeholder="John Doe"
                  required
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-black/40 border border-white/5 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all outline-none font-medium"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative group">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-cyan-500 transition-colors" />
                <input
                  type="email"
                  placeholder="john@university.edu"
                  required
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-black/40 border border-white/5 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all outline-none font-medium"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Roll Number</label>
              <div className="relative group">
                <FaIdCard className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-cyan-500 transition-colors" />
                <input
                  type="text"
                  placeholder="CS2024001"
                  required
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-black/40 border border-white/5 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all outline-none font-medium uppercase"
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Password</label>
              <div className="relative group">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-cyan-500 transition-colors" />
                <input
                  type="password"
                  placeholder="••••••••"
                  required
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-black/40 border border-white/5 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all outline-none font-medium"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-500 hover:to-emerald-500 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-cyan-900/20 transform transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 mt-6"
            >
              {loading ? 'Creating Profile...' : (
                <>
                  Register Student <FaUserPlus className="text-sm opacity-50" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-gray-500 text-sm">
              Already have an account?{' '}
              <Link href="/student/login" className="text-cyan-400 hover:text-cyan-300 font-bold">
                Log in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
