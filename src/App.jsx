import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from './assets/logo.webp';
import CountdownView from './components/CountdownView';
import LoginView from './components/LoginView';
import ResultView from './components/ResultView';
import TransitionView from './components/TransitionView';

function App() {
  // CONFIGURATION: Set the announcement date here
  const ANNOUNCEMENT_DATE = '2026-06-02T17:00:00';
  // TESTING MODE: Ubah ke 'true' untuk melewati hitung mundur, atau 'false' untuk mode produksi
  const [isTimeReached, setIsTimeReached] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [showTransition, setShowTransition] = useState(false);
  const [pendingUser, setPendingUser] = useState(null);

  useEffect(() => {
    // Jalankan pengecekan waktu hanya jika tidak dalam mode testing manual
    if (isTimeReached === false) {
      const now = new Date();
      const target = new Date(ANNOUNCEMENT_DATE);
      if (now >= target) {
        setIsTimeReached(true);
      }
    }
  }, [isTimeReached]);

  const handleTimerEnd = () => {
    setIsTimeReached(true);
  };

  const handleLoginSuccess = (userData) => {
    setPendingUser(userData);
    setShowTransition(true);
  };

  const handleTransitionComplete = () => {
    setLoggedInUser(pendingUser);
    setShowTransition(false);
    setPendingUser(null);
  };

  const handleLogout = () => {
    setLoggedInUser(null);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 relative overflow-hidden selection:bg-green-100 selection:text-green-900">
      {/* GLOBAL BACKGROUND ORNAMENTS - PREMIUM AURORA EFFECT */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Subtle SVG Grid Pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        
        {/* Aurora Gaps */}
        <motion.div 
          animate={{ 
            x: [-100, 100, -100],
            y: [-50, 50, -50],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-green-200/30 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ 
            x: [100, -100, 100],
            y: [50, -50, 50],
            scale: [1.2, 1, 1.2],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[10%] -right-[10%] w-[60%] h-[60%] bg-emerald-100/40 rounded-full blur-[120px]"
        />

        {/* Ambient Particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 0.4, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 20,
              ease: "easeInOut"
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            className="absolute w-2 h-2 bg-green-400 rounded-full blur-sm"
          />
        ))}
      </div>

      {/* Navbar / Header */}
      <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-slate-200/50 py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* SCHOOL LOGO */}
            <div className="relative group">
              <div className="absolute inset-0 bg-green-500 rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <div className="relative bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
                <img src={logo} alt="Logo MTs AL IKHSAN BEJI KEDUNGBANTENG" className="w-10 h-10 object-contain" />
              </div>
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-black text-slate-900 tracking-tighter leading-none">
                MTs AL IKHSAN BEJI KEDUNGBANTENG
              </h1>
              <p className="text-[10px] font-black text-green-600 uppercase tracking-[0.2em] mt-1">
                Portal Resmi Pengumuman
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full border border-slate-200">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Server Active</span>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto min-h-[calc(100vh-140px)] flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {!isTimeReached ? (
            <motion.div
              key="countdown"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <CountdownView 
                targetDate={ANNOUNCEMENT_DATE} 
                onTimerEnd={handleTimerEnd} 
              />
            </motion.div>
          ) : showTransition ? (
            <motion.div
              key="transition"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full"
            >
              <TransitionView onComplete={handleTransitionComplete} />
            </motion.div>
          ) : !loggedInUser ? (
            <motion.div
              key="login"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <LoginView onLoginSuccess={handleLoginSuccess} />
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <ResultView student={loggedInUser} onLogout={handleLogout} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="py-10 px-6 text-center border-t border-slate-200/50 bg-white/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            &copy; 2026 MTs Al Ikhsan Beji Kedungbanteng • Dikembangkan dengan ❤️ untuk para Calon Pemimpin Masa Depan
          </p>
          <div className="flex gap-8">
            {['Pusat Bantuan', 'Kebijakan Privasi', 'Kontak Madrasah'].map((item) => (
              <a key={item} href="#" className="text-[10px] font-black text-slate-400 hover:text-green-600 transition-colors uppercase tracking-widest">
                {item}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
