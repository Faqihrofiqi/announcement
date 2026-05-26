import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Bell, Info, GraduationCap, Sparkles } from 'lucide-react';

const CountdownView = ({ targetDate, onTimerEnd }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      let newTimeLeft = {};

      if (difference > 0) {
        newTimeLeft = {
          hours: Math.floor(difference / (1000 * 60 * 60)),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        };
      } else {
        onTimerEnd();
      }
      return newTimeLeft;
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, onTimerEnd]);

  const timeData = [
    { label: 'Jam', value: timeLeft.hours },
    { label: 'Menit', value: timeLeft.minutes },
    { label: 'Detik', value: timeLeft.seconds }
  ];

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 relative overflow-hidden">
      {/* Decorative Ornaments */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none"
      >
        <GraduationCap size={200} />
      </motion.div>
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute bottom-10 left-10 text-green-600 pointer-events-none"
      >
        <Sparkles size={120} />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center z-10"
      >
        <div className="inline-flex items-center gap-3 px-6 py-2.5 bg-white shadow-xl shadow-green-500/10 rounded-full border border-green-50 text-[10px] font-black uppercase tracking-[0.3em] text-green-600 mb-8">
          <Clock size={16} className="animate-spin-slow" />
          Menghitung Waktu Pengumuman
        </div>
        <h2 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tighter leading-none text-balance">
          Momen Masa Depan<br />
          <motion.span 
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600"
          >
            Segera Dimulai.
          </motion.span>
        </h2>
        <p className="text-slate-500 font-bold text-lg max-w-2xl mx-auto leading-relaxed mb-16 px-4">
          Siswa-siswi kelas 9 MTs Al Ikhsan Beji, siapkan diri Anda untuk langkah baru yang lebih tinggi.
        </p>
      </motion.div>
      
      <div className="flex gap-4 md:gap-10 flex-wrap justify-center mb-20 z-10">
        {timeData.map((item, index) => (
          <motion.div 
            key={item.label}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: index * 0.1, type: 'spring' }}
            className="flex flex-col items-center"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-green-500 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
              <div className="relative bg-white border border-slate-100 rounded-2xl md:rounded-[2.5rem] w-20 h-24 md:w-40 md:h-44 flex flex-col items-center justify-center shadow-[0_25px_60px_rgba(0,0,0,0.05)] border-b-4 md:border-b-8 border-b-green-600">
                <span className="text-3xl md:text-7xl font-black text-slate-900 tracking-tighter tabular-nums mb-1">
                  {String(item.value || 0).padStart(2, '0')}
                </span>
                <div className="w-6 md:w-10 h-0.5 md:h-1 bg-slate-100 rounded-full"></div>
              </div>
            </div>
            <span className="mt-6 text-[11px] font-black text-slate-400 uppercase tracking-[0.4em] ml-1">{item.label}</span>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="relative z-10 p-8 bg-white/40 backdrop-blur-xl border border-white rounded-[2.5rem] max-w-2xl shadow-[0_20px_40px_rgba(0,0,0,0.02)] flex flex-col md:flex-row items-center gap-6 text-center md:text-left"
      >
        <div className="bg-slate-900 p-4 rounded-3xl text-white shadow-2xl shadow-slate-200">
          <Info size={28} />
        </div>
        <div>
          <h4 className="font-black text-slate-900 text-sm mb-2 uppercase tracking-tight flex items-center gap-2">
            <Sparkles size={14} className="text-yellow-500" />
            Persiapan Akses Portal
          </h4>
          <p className="text-slate-500 text-xs leading-relaxed font-bold uppercase tracking-wide opacity-80">
            Pastikan Anda memasukkan data NISN yang valid. Portal akan terbuka otomatis saat timer mencapai nol.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default CountdownView;
