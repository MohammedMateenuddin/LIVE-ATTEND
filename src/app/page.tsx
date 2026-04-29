'use client';

import Link from 'next/link';
import { FaChalkboardTeacher, FaUserGraduate } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-start pt-6 md:pt-10 bg-black text-white font-sans overflow-x-hidden">
      {/* VIDEO BACKGROUND */}
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

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="z-10 w-full flex flex-col items-center px-4"
      >
        {/* Hero Title Section - MASSIVE */}
        <motion.div variants={itemVariants} className="text-center mb-4 relative w-full">
          <h1 className="text-[12vw] md:text-[10rem] font-black tracking-[-0.05em] leading-[0.8] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            Live Attend
          </h1>
          <p className="mt-4 text-white/90 text-[10px] md:text-xs font-bold tracking-[1em] uppercase pl-[1em] drop-shadow-lg">
            Precision Tracking
          </p>
        </motion.div>

        {/* Portal Entry Cards - 100% COMPLETE TRANSPARENCY */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl items-stretch">
          {/* Professor Card */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
            className="group h-full"
          >
            <Link
              href="/professor/login"
              className="relative flex flex-col items-center justify-center h-full overflow-hidden rounded-[2rem] border-[3px] border-[#a855f7]/60 bg-transparent px-10 py-8 md:py-10 transition-all duration-300 hover:border-[#a855f7] shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_40px_rgba(168,85,247,0.5)]"
            >
              <div className="relative z-10 flex flex-col items-center text-center">
                <FaChalkboardTeacher className="text-2xl text-[#a855f7] mb-4 icon-pulse" />
                <h2 className="text-[1.75rem] font-bold mb-3 text-[#a855f7] tracking-tight">
                  Professor
                </h2>
                <div className="flex flex-col items-center w-full">
                  <span className="text-[10px] md:text-xs font-black tracking-[0.3em] uppercase text-white/40 mb-2">
                    PORTAL ENTRY
                  </span>
                  <div className="w-full h-[1px] bg-white/10 mb-2"></div>
                  <p className="text-sm italic text-white/60 group-hover:text-[#a855f7] group-hover:not-italic transition-all duration-300">
                    <span className="group-hover:hidden italic">Shape the cosmos</span>
                    <span className="hidden group-hover:inline font-bold">Enter Portal →</span>
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Student Card */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
            className="group h-full"
          >
            <Link
              href="/student/login"
              className="relative flex flex-col items-center justify-center h-full overflow-hidden rounded-[2rem] border-[3px] border-[#06b6d4]/60 bg-transparent px-10 py-8 md:py-10 transition-all duration-300 hover:border-[#06b6d4] shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_40px_rgba(6,182,212,0.5)]"
            >
              <div className="relative z-10 flex flex-col items-center text-center">
                <FaUserGraduate className="text-2xl text-[#06b6d4] mb-4 icon-pulse" />
                <h2 className="text-[1.75rem] font-bold mb-3 text-[#06b6d4] tracking-tight">
                  Student
                </h2>
                <div className="flex flex-col items-center w-full">
                  <span className="text-[10px] md:text-xs font-black tracking-[0.3em] uppercase text-white/40 mb-2">
                    PORTAL ENTRY
                  </span>
                  <div className="w-full h-[1px] bg-white/10 mb-2"></div>
                  <p className="text-sm italic text-white/60 group-hover:text-[#06b6d4] group-hover:not-italic transition-all duration-300">
                    <span className="group-hover:hidden italic">Begin your ascent</span>
                    <span className="hidden group-hover:inline font-bold">Enter Portal →</span>
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Footer info */}
        <motion.p 
          variants={itemVariants}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full text-center text-white/80 text-[10px] md:text-xs tracking-[0.6em] uppercase font-black drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
        >
          Secure • Reliable • Real-time
        </motion.p>
      </motion.div>
    </main>
  );
}
