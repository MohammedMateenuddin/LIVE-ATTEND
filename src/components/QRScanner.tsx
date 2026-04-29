'use client';

import { useEffect, useRef, useState } from 'react';
import { BrowserQRCodeReader, IScannerControls } from '@zxing/browser';
import { FaTimes, FaCamera, FaCheckCircle, FaExclamationTriangle, FaSyncAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import toast from 'react-hot-toast';

interface QRScannerProps {
  onScan: (url: string) => void;
  onClose: () => void;
}

export default function QRScanner({ onScan, onClose }: QRScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsRef = useRef<IScannerControls | null>(null);
  const [status, setStatus] = useState<'scanning' | 'success' | 'error'>('scanning');
  const [errorMessage, setErrorMessage] = useState('');
  const [scanResult, setScanResult] = useState<any>(null);

  useEffect(() => {
    const codeReader = new BrowserQRCodeReader();
    
    const startScanner = async () => {
      try {
        const controls = await codeReader.decodeFromVideoDevice(
          undefined,
          videoRef.current!,
          (result, err) => {
            if (result) {
              handleScan(result.getText());
            }
          }
        );
        controlsRef.current = controls;
      } catch (err) {
        console.error('Scanner init error:', err);
        setErrorMessage('Could not access camera');
        setStatus('error');
      }
    };

    startScanner();

    return () => {
      if (controlsRef.current) {
        controlsRef.current.stop();
      }
    };
  }, []);

  const handleScan = async (scannedUrl: string) => {
    if (status !== 'scanning') return;

    try {
      const url = new URL(scannedUrl);
      const sessionId = url.searchParams.get('sessionId');
      const token = url.searchParams.get('t');

      if (!sessionId || !token) {
        throw new Error('Invalid QR Code format');
      }

      // Validate token age (< 6s)
      const tokenTimestamp = parseInt(token.split('-')[0]);
      const age = Date.now() - tokenTimestamp;
      if (isNaN(tokenTimestamp) || age > 6000) {
        setErrorMessage('QR code expired — ask professor to refresh');
        setStatus('error');
        return;
      }

      // Stop scanner immediately
      if (controlsRef.current) controlsRef.current.stop();

      // Mark attendance
      const res = await fetch('${process.env.NEXT_PUBLIC_API_URL || `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}`}/api/attendance/mark', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('student_token')}`
        },
        body: JSON.stringify({ sessionId, token })
      });

      const data = await res.json();

      if (res.ok) {
        setScanResult({
          courseCode: data.courseCode || 'Verified',
          timestamp: new Date().toLocaleTimeString()
        });
        setStatus('success');
        triggerConfetti();
        // Call parent onScan to refresh dashboard data
        onScan(scannedUrl);
      } else {
        setErrorMessage(data.message || 'Could not mark attendance');
        setStatus('error');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Invalid QR Code');
      setStatus('error');
    }
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 120,
      spread: 80,
      colors: ['#06b6d4', '#a855f7', '#ffffff'],
      origin: { y: 0.6 }
    });
  };

  const resetScanner = () => {
    setStatus('scanning');
    setErrorMessage('');
    // Scanner will need to be restarted if we want to try again without closing
    window.location.reload(); // Simplest way to restart @zxing logic
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4"
    >
      <div className={`relative w-full max-w-lg bg-[#050a0a] border ${status === 'error' ? 'border-red-500/50' : 'border-white/10'} rounded-[2.5rem] overflow-hidden shadow-2xl transition-colors duration-500`}>
        
        {/* Header */}
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 ${status === 'success' ? 'bg-emerald-500/20' : 'bg-cyan-500/20'} rounded-lg flex items-center justify-center transition-colors`}>
              <FaCamera className={`${status === 'success' ? 'text-emerald-400' : 'text-cyan-400'} text-sm`} />
            </div>
            <div>
              <h3 className="font-black text-sm uppercase tracking-widest text-white/90">Direct Lens</h3>
              <p className="text-[9px] text-white/30 uppercase tracking-[0.3em] font-black">Active Stream</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center transition-all text-white/50"
          >
            <FaTimes />
          </button>
        </div>

        {/* Viewport / Result Area */}
        <div className="p-8">
          <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-black border border-white/5 shadow-inner">
            <AnimatePresence mode="wait">
              {status === 'scanning' && (
                <motion.div key="scanner" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full relative">
                  <video ref={videoRef} className="w-full h-full object-cover" />
                  {/* HUD */}
                  <div className="absolute inset-0 pointer-events-none border-[40px] border-black/40">
                    <div className="w-full h-full border-2 border-cyan-500/30 rounded-lg relative">
                      <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-cyan-500 rounded-tl-sm" />
                      <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-cyan-500 rounded-tr-sm" />
                      <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-cyan-500 rounded-bl-sm" />
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-cyan-500 rounded-br-sm" />
                      <motion.div 
                        animate={{ top: ['0%', '100%', '0%'] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_rgba(6,182,212,0.8)]"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {status === 'success' && (
                <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full h-full flex flex-col items-center justify-center bg-emerald-500/5 p-8 text-center">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', damping: 12 }} className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(16,185,129,0.4)]">
                    <FaCheckCircle className="text-5xl text-white" />
                  </motion.div>
                  <h2 className="text-2xl font-black text-white mb-2">You're marked Present!</h2>
                  <p className="text-emerald-400 font-black text-[10px] uppercase tracking-[0.3em] mb-8">{scanResult?.courseCode}</p>
                  <div className="text-white/20 text-[10px] font-black uppercase tracking-widest bg-white/5 px-4 py-2 rounded-full">
                    Verified: {scanResult?.timestamp}
                  </div>
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div key="error" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full h-full flex flex-col items-center justify-center bg-red-500/5 p-8 text-center">
                  <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mb-6 border border-red-500/30">
                    <FaExclamationTriangle className="text-3xl text-red-500" />
                  </div>
                  <h2 className="text-xl font-bold text-white mb-4">{errorMessage}</h2>
                  <button 
                    onClick={resetScanner}
                    className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all"
                  >
                    <FaSyncAlt /> Try Again
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-8 text-center">
            <p className="text-white/30 text-xs font-bold leading-relaxed px-4">
              {status === 'scanning' ? 'Aim at the Professor\'s QR code to verify your presence.' : 'Verification cycle complete.'}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-white/[0.02] p-6 text-center border-t border-white/5">
          {status === 'success' ? (
            <button onClick={onClose} className="w-full bg-emerald-500 hover:bg-emerald-400 py-4 rounded-2xl font-black text-xs uppercase tracking-widest text-black transition-all transform active:scale-95 shadow-xl shadow-emerald-900/20">
              Close Lens
            </button>
          ) : (
            <div className="flex items-center justify-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                <span className="text-[9px] text-white/20 uppercase tracking-[0.2em] font-black">Secure Link</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full" />
                <span className="text-[9px] text-white/20 uppercase tracking-[0.2em] font-black">Geo-Verified</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
