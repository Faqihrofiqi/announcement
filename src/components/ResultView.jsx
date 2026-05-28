import React, { useRef, useState, useEffect } from 'react';
import { Download, LogOut, CheckCircle, XCircle, User, Hash, GraduationCap, Award, AlertTriangle, Sparkles, FileText, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const ResultView = ({ student, onLogout }) => {
  const resultCardRef = useRef(null);
  const [showFlash, setShowFlash] = useState(true);

  // Trigger Confetti and Flash Effect
  useEffect(() => {
    if (student.status_lulus) {
      // Flash effect timeout
      const flashTimer = setTimeout(() => setShowFlash(false), 800);

      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min, max) => Math.random() * (max - min) + min;

      const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
      }, 250);

      return () => {
        clearInterval(interval);
        clearTimeout(flashTimer);
      };
    }
  }, [student.status_lulus]);

  const handleDownloadSKL = () => {
    if (student.link_skl) {
      window.open(student.link_skl, '_blank');
    } else {
      alert('Link SKL belum tersedia. Silakan hubungi operator madrasah.');
    }
  };

  // Explicit check for Lulus status
  const isLulus = student.status_lulus === true;

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8, rotateX: 20 },
    visible: { 
      opacity: 1, 
      scale: 1,
      rotateX: 0,
      transition: { 
        duration: 1, 
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.15 
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Format Date to Indonesia format
  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }).format(date);
    } catch (e) {
      return dateString;
    }
  };

  const placeDateOfBirth = `${student.tempat_lahir || ''}, ${formatDate(student.tanggal_lahir)}`.replace(/^, /, '');

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 min-h-[90vh] relative perspective-1000">
      {/* GACHA BACKGROUND EFFECTS (Only for Lulus) */}
      {isLulus && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
          {/* God Rays / Light Burst */}
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1.5 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute"
          >
            <div className="relative w-[800px] h-[800px] flex items-center justify-center">
              {[...Array(12)].map((_, i) => (
                <div 
                  key={i} 
                  className="absolute w-full h-[60px] bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent"
                  style={{ transform: `rotate(${i * 30}deg)` }}
                />
              ))}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-[radial-gradient(circle,rgba(250,204,21,0.15)_0%,transparent_70%)]"
              />
            </div>
          </motion.div>

          {/* Floating Sparkles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 100 }}
              animate={{ 
                opacity: [0, 1, 0],
                y: -500,
                x: (Math.random() - 0.5) * 800
              }}
              transition={{ 
                duration: Math.random() * 3 + 2, 
                repeat: Infinity,
                delay: Math.random() * 5
              }}
              className="absolute text-yellow-400"
            >
              <Sparkles size={Math.random() * 15 + 10} />
            </motion.div>
          ))}
        </div>
      )}

      {/* Impact Flash Overlay */}
      <AnimatePresence>
        {isLulus && showFlash && (
          <motion.div 
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 bg-white z-[100] pointer-events-none"
          />
        )}
      </AnimatePresence>

      <motion.div 
        ref={resultCardRef}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className={`w-full max-w-2xl bg-white rounded-[2.5rem] shadow-[0_50px_100px_rgba(0,0,0,0.1)] overflow-hidden relative border border-white z-10 transition-all duration-700`}
      >
        {/* Card Shine Effect Overlay (Persistent for Lulus) */}
        {isLulus && (
          <motion.div 
            animate={{ x: ['-200%', '200%'] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 z-20 pointer-events-none"
          />
        )}

        {/* Decorative Overlay Pattern */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none z-0">
          <svg width="100%" height="100%">
            <pattern id="pattern-circles" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="10" fill="currentColor" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#pattern-circles)" />
          </svg>
        </div>

        {/* Header Section */}
        <div className={`relative p-10 text-white text-center overflow-hidden z-10 ${
          isLulus ? 'bg-gradient-to-br from-[#10B981] via-[#059669] to-[#047857]' : 'bg-gradient-to-br from-[#EF4444] via-[#DC2626] to-[#B91C1C]'
        }`}>
          {/* Ornaments */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-black/5 rounded-full blur-3xl"></div>
          </div>

          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            className="relative z-20 flex flex-col items-center"
          >
            {isLulus ? (
              <>
                <motion.div
                  animate={{ 
                    rotate: [0, -5, 5, -5, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Award size={80} className="text-yellow-300 mb-6 drop-shadow-[0_0_20px_rgba(250,204,21,0.6)]" />
                </motion.div>
                <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 drop-shadow-md">SELAMAT!</h1>
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="inline-block px-8 py-3 bg-white/20 rounded-full backdrop-blur-md border border-white/30 shadow-xl"
                >
                   <p className="text-sm md:text-xl font-black tracking-widest uppercase">ANDA DINYATAKAN LULUS</p>
                </motion.div>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.8 }}
                  transition={{ delay: 0.8 }}
                  className="mt-4 text-xs md:text-sm font-bold tracking-[0.3em] uppercase"
                >
                  DARI MTS AL IKHSAN BEJI KEDUNGBANTENG
                </motion.p>
              </>
            ) : (
              <>
                <div className="bg-white/20 p-5 rounded-3xl backdrop-blur-md border border-white/30 shadow-xl mb-6">
                  <XCircle size={64} className="text-white" />
                </div>
                <h1 className="text-2xl md:text-4xl font-black uppercase tracking-tight leading-tight px-4 drop-shadow-md mb-4">
                  MOHON MAAF,
                </h1>
                <div className="inline-block px-6 py-2 bg-black/20 rounded-xl backdrop-blur-sm border border-white/10">
                  <p className="text-sm md:text-lg font-bold tracking-wide uppercase text-red-50">
                    ANDA DINYATAKAN BELUM LULUS / DITANGGUHKAN
                  </p>
                </div>
              </>
            )}
          </motion.div>
        </div>

        {/* Info Content */}
        <div className="relative z-10 p-8 md:p-12 bg-white">
          <motion.div variants={itemVariants} className="mb-10">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-slate-200"></span>
              DATA IDENTITAS PESERTA DIDIK
              <span className="flex-1 h-[1px] bg-slate-200"></span>
            </h3>
            
            <div className="space-y-4">
              {/* Primary Identity: Name */}
              <div className="bg-green-50/50 p-6 md:p-8 rounded-[2rem] border border-white shadow-sm hover:shadow-md transition-all duration-300 group flex items-center gap-6 relative overflow-hidden">
                {isLulus && (
                  <motion.div 
                    animate={{ x: ['-200%', '200%'] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent skew-x-12 z-0 pointer-events-none"
                  />
                )}
                <div className="relative z-10 bg-white p-4 rounded-2xl shadow-sm group-hover:scale-110 transition-transform duration-500 text-green-500">
                  <User size={24} />
                </div>
                <div className="relative z-10">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Nama Lengkap</p>
                  <p className="text-slate-900 font-black text-lg md:text-xl break-words leading-tight uppercase">{student.nama_siswa}</p>
                </div>
              </div>

              {/* Secondary Identity Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: 'NISN', value: student.nisn, icon: Hash, color: 'text-emerald-500', bg: 'bg-slate-50/50' },
                  { label: 'Nomor Peserta', value: student.nomor_peserta, icon: FileText, color: 'text-emerald-500', bg: 'bg-slate-50/50' },
                  { label: 'Kelas Asal', value: student.kelas, icon: GraduationCap, color: 'text-emerald-500', bg: 'bg-slate-50/50' },
                  { label: 'Tempat, Tanggal Lahir', value: placeDateOfBirth, icon: MapPin, color: 'text-emerald-500', bg: 'bg-slate-50/50' }
                ].map((item, i) => (
                  <div key={i} className={`${item.bg} p-5 rounded-[1.5rem] border border-white shadow-sm hover:shadow-md transition-all duration-300 group flex items-center gap-4`}>
                    <div className="bg-white p-3 rounded-xl shadow-sm group-hover:scale-110 transition-transform duration-500 text-emerald-500 shrink-0">
                      <item.icon size={18} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5">{item.label}</p>
                      <p className="text-slate-900 font-black text-xs md:text-sm truncate md:whitespace-normal">{item.value || '-'}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            {isLulus ? (
              <div className="space-y-8">
                <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-200 relative overflow-hidden group">
                   <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity text-green-600">
                      <Award size={100} />
                   </div>
                   <p className="text-slate-600 text-base italic font-medium leading-relaxed relative z-10 text-center">
                    "Kesuksesan hari ini adalah pondasi untuk masa depan yang gemilang. Teruslah berkarya dan jaga nama baik almamater MTs Al Ikhsan Beji Kedungbanteng."
                   </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.button
                    whileHover={{ y: -5, scale: 1.02, shadow: '0 25px 50px rgba(0,0,0,0.1)' }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleDownloadSKL}
                    className="action-button w-full bg-slate-900 text-white font-black py-6 px-8 rounded-2xl shadow-2xl flex items-center justify-center gap-3 transition-all relative overflow-hidden group"
                  >
                    <motion.div 
                      animate={{ x: ['-200%', '200%'] }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                    />
                    <Download size={22} className="relative z-10" />
                    <span className="relative z-10">UNDUH SKL DIGITAL (PDF)</span>
                  </motion.button>
                </div>
              </div>
            ) : (
              <div className="p-10 bg-red-50 rounded-[2.5rem] border-2 border-red-100 shadow-inner relative overflow-hidden text-center">
                <div className="absolute top-0 left-0 w-full h-2 bg-red-500"></div>
                <div className="flex flex-col items-center gap-4 mb-6">
                  <div className="bg-red-100 p-4 rounded-full text-red-600 shadow-sm">
                    <AlertTriangle size={32} />
                  </div>
                  <h4 className="font-black text-2xl text-red-900 uppercase tracking-tight">INSTRUKSI LANJUTAN</h4>
                </div>
                <p className="text-red-800 text-base leading-relaxed font-bold mb-6">
                  Status kelulusan Anda memerlukan konfirmasi administratif lebih lanjut.
                </p>
                <div className="bg-white/50 p-6 rounded-2xl border border-red-200/50">
                  <p className="text-red-700 text-sm font-medium">
                    Segera lapor ke bagian Tata Usaha atau menemui Wali Kelas Anda di Madrasah pada jam kerja untuk mendapatkan informasi lengkap terkait status Anda.
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
        
        {/* Footer in Card */}
        <div className="px-12 py-6 bg-slate-50 border-t border-slate-100 flex justify-center">
           <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.5em]">
              OFFICIAL DIGITAL ANNOUNCEMENT • 2026
           </p>
        </div>
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        onClick={onLogout}
        className="logout-button mt-12 flex items-center gap-4 text-slate-400 hover:text-slate-900 font-black uppercase text-[11px] tracking-[0.4em] transition-all group relative z-10"
      >
        <span className="w-10 h-[1px] bg-slate-200 group-hover:w-16 transition-all duration-500"></span>
        KELUAR DARI SISTEM
        <LogOut size={16} />
      </motion.button>
    </div>
  );
};

export default ResultView;
