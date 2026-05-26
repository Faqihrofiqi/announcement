import React, { useRef, useState, useEffect } from 'react';
import { Download, Share2, LogOut, CheckCircle, XCircle, User, Hash, GraduationCap, Loader2, Award, AlertTriangle, Sparkles } from 'lucide-react';
import html2canvas from 'html2canvas';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

const ResultView = ({ student, onLogout }) => {
  const resultCardRef = useRef(null);
  const [isSharing, setIsSharing] = useState(false);

  // Trigger Confetti if Lulus
  useEffect(() => {
    if (student.status_lulus) {
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

      return () => clearInterval(interval);
    }
  }, [student.status_lulus]);

  const handleDownloadSKL = () => {
    if (student.link_skl) {
      window.open(student.link_skl, '_blank');
    } else {
      alert('Link SKL belum tersedia. Silakan hubungi operator madrasah.');
    }
  };

  const handleShare = async () => {
    if (resultCardRef.current) {
      setIsSharing(true);
      
      // Beri sedikit waktu agar animasi selesai atau state terupdate
      await new Promise(r => setTimeout(r, 300));

      try {
        const canvas = await html2canvas(resultCardRef.current, {
          backgroundColor: '#FFFFFF', // Gunakan putih bersih untuk background kartu saat dishare
          scale: 2, // 2x sudah cukup tajam untuk mobile share
          useCORS: true,
          allowTaint: true,
          logging: false,
          scrollX: 0,
          scrollY: -window.scrollY, // Pastikan capture tepat di posisi elemen
        });
        
        const image = canvas.toDataURL('image/png', 1.0);
        const blob = await (await fetch(image)).blob();
        const file = new File([blob], `Kelulusan_${student.nama_siswa.replace(/\s+/g, '_')}.png`, { type: 'image/png' });

        // Cek dukungan Web Share API v2 (untuk file)
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: 'Hasil Kelulusan MTs Al Ikhsan Beji',
            text: `Alhamdulillah, saya dinyatakan ${student.status_lulus ? 'LULUS' : 'BELUM LULUS'} di MTs Al Ikhsan Beji!`,
          });
        } else {
          // Fallback: Download jika tidak bisa share file secara native
          const link = document.createElement('a');
          link.download = `Hasil_Kelulusan_${student.nama_siswa.replace(/\s+/g, '_')}.png`;
          link.href = image;
          link.click();
        }
      } catch (err) {
        console.error('Sharing failed:', err);
        alert('Gagal memproses gambar. Silakan coba lagi atau screenshot layar Anda.');
      } finally {
        setIsSharing(false);
      }
    }
  };

  // Explicit check for Lulus status
  const isLulus = student.status_lulus === true;

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.15 
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 }
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 min-h-[80vh]">
      <motion.div 
        ref={resultCardRef}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className={`w-full max-w-2xl bg-white rounded-[2.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.08)] overflow-hidden relative border border-slate-100 z-10`}
      >
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
            {isLulus && (
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0],
                      rotate: [0, 180],
                      x: [0, (i - 2) * 50],
                      y: [0, -100]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity, 
                      delay: i * 0.4,
                      ease: "easeOut"
                    }}
                    className="absolute top-1/2 left-1/2 text-yellow-300"
                  >
                    <Sparkles size={24} fill="currentColor" />
                  </motion.div>
                ))}
              </div>
            )}
            {isLulus ? (
              <>
                <Award size={72} className="text-yellow-300 mb-6 drop-shadow-2xl animate-bounce-slow" />
                <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 drop-shadow-md">SELAMAT!</h1>
                <div className="inline-block px-8 py-3 bg-white/20 rounded-full backdrop-blur-md border border-white/30 shadow-xl">
                   <p className="text-sm md:text-xl font-black tracking-widest uppercase">ANDA DINYATAKAN LULUS</p>
                </div>
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
        <div className="relative z-10 p-8 md:p-12">
          <motion.div variants={itemVariants} className="mb-10">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-slate-200"></span>
              DATA IDENTITAS PESERTA DIDIK
              <span className="flex-1 h-[1px] bg-slate-200"></span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: 'Nama Lengkap', value: student.nama_siswa, icon: User, color: 'text-green-500', bg: 'bg-green-50' },
                { label: 'NISN', value: student.nisn, icon: Hash, color: 'text-emerald-500', bg: 'bg-emerald-50' },
                { label: 'Kelas Asal', value: student.kelas, icon: GraduationCap, color: 'text-emerald-500', bg: 'bg-emerald-50' }
              ].map((item, i) => (
                <div key={i} className={`${item.bg} p-6 rounded-3xl border border-white shadow-sm hover:shadow-md transition-all duration-300 group`}>
                  <item.icon size={20} className={`${item.color} mb-3 group-hover:scale-110 transition-transform`} />
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{item.label}</p>
                  <p className="text-slate-900 font-black text-sm break-words">{item.value}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            {isLulus ? (
              <div className="space-y-8">
                <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-200 relative overflow-hidden group">
                   <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                      <Award size={100} />
                   </div>
                   <p className="text-slate-600 text-base italic font-medium leading-relaxed relative z-10 text-center">
                    "Kesuksesan hari ini adalah pondasi untuk masa depan yang gemilang. Teruslah berkarya dan jaga nama baik almamater MTs Al Ikhsan Beji."
                   </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.button
                    data-html2canvas-ignore
                    whileHover={{ y: -5, shadow: '0 25px 50px rgba(0,0,0,0.1)' }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleDownloadSKL}
                    className="action-button flex-[2] bg-slate-900 text-white font-black py-6 px-8 rounded-2xl shadow-2xl flex items-center justify-center gap-3 transition-all"
                  >
                    <Download size={22} />
                    UNDUH SKL DIGITAL (PDF)
                  </motion.button>
                  <motion.button
                    data-html2canvas-ignore
                    whileHover={{ y: -5, bg: '#F8FAFC' }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleShare}
                    disabled={isSharing}
                    className="action-button flex-1 bg-white border-2 border-slate-200 text-slate-700 font-black py-6 px-8 rounded-2xl flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                  >
                    {isSharing ? <Loader2 size={22} className="animate-spin" /> : <Share2 size={22} />}
                    BAGIKAN HASIL
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
        data-html2canvas-ignore
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        onClick={onLogout}
        className="logout-button mt-12 flex items-center gap-4 text-slate-400 hover:text-slate-900 font-black uppercase text-[11px] tracking-[0.4em] transition-all group"
      >
        <span className="w-10 h-[1px] bg-slate-200 group-hover:w-16 transition-all duration-500"></span>
        KELUAR DARI SISTEM
        <LogOut size={16} />
      </motion.button>
    </div>
  );
};

export default ResultView;
