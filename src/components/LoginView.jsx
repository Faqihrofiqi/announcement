import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { LogIn, Loader2, KeyRound, CalendarDays, AlertCircle, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LoginView = ({ onLoginSuccess }) => {
  const [nisn, setNisn] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error } = await supabase
        .from('siswa')
        .select('*')
        .eq('nisn', nisn)
        .eq('tanggal_lahir', birthDate)
        .single();

      if (error) {
        setError('NISN atau Tanggal Lahir tidak ditemukan.');
      } else if (data) {
        onLoginSuccess(data);
      }
    } catch (err) {
      setError('Koneksi bermasalah. Periksa jaringan Anda.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="bg-white p-8 md:p-16 rounded-[3rem] shadow-[0_40px_100px_rgba(0,0,0,0.06)] border border-slate-100 w-full max-w-xl relative overflow-hidden group"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-50 rounded-full -mr-32 -mt-32 opacity-40 group-hover:scale-110 transition-transform duration-1000"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-slate-50 rounded-full -ml-16 -mb-16 opacity-60"></div>
        
        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none">
          <svg width="100%" height="100%">
            <pattern id="pattern-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="currentColor" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#pattern-dots)" />
          </svg>
        </div>

        <div className="relative z-10">
          <header className="flex flex-col items-center mb-12 text-center">
            <motion.div 
              initial={{ rotate: -10, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="relative mb-8"
            >
              <div className="absolute inset-0 bg-green-600 rounded-[2rem] blur-xl opacity-20 animate-pulse"></div>
              <div className="relative bg-slate-900 p-6 rounded-[2rem] text-white shadow-2xl overflow-hidden group">
                <ShieldCheck size={40} strokeWidth={2.5} />
                {/* Scanning Line */}
                <motion.div 
                  animate={{ top: ['-100%', '200%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 w-full h-1 bg-green-400/50 blur-sm"
                />
              </div>
            </motion.div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Login Murid</h2>
            <p className="text-slate-500 font-bold mt-3 text-sm uppercase tracking-widest opacity-70">Portal Verifikasi Kelulusan</p>
          </header>

          <form onSubmit={handleLogin} className="space-y-8">
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">
                <KeyRound size={14} className="text-green-500" />
                Nomor Induk Siswa Nasional
              </label>
              <input
                type="text"
                required
                className="w-full px-8 py-5 rounded-3xl bg-slate-50 border-2 border-transparent focus:bg-white focus:border-green-500 focus:ring-8 focus:ring-green-500/5 outline-none transition-all duration-500 font-black text-slate-900 placeholder:text-slate-300 text-lg shadow-inner"
                placeholder="Contoh: 0081234567"
                value={nisn}
                onChange={(e) => setNisn(e.target.value)}
              />
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">
                <CalendarDays size={14} className="text-emerald-500" />
                Tanggal Lahir Anda
              </label>
              <input
                type="date"
                required
                className="w-full px-8 py-5 rounded-3xl bg-slate-50 border-2 border-transparent focus:bg-white focus:border-green-500 focus:ring-8 focus:ring-green-500/5 outline-none transition-all duration-500 font-black text-slate-900 text-lg shadow-inner"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
              />
            </div>

            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-red-50 text-red-600 text-[11px] font-black p-5 rounded-3xl border border-red-100 flex items-center gap-4 shadow-sm"
                >
                  <AlertCircle size={20} className="shrink-0" />
                  <span className="uppercase tracking-wider leading-relaxed">{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              whileHover={{ y: -4, shadow: '0 20px 40px rgba(15,23,42,0.2)' }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 text-white font-black py-6 px-8 rounded-3xl shadow-2xl flex items-center justify-center gap-4 transition-all duration-300 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={24} />
                  <span className="uppercase tracking-[0.2em]">MEMVERIFIKASI...</span>
                </>
              ) : (
                <span className="uppercase tracking-[0.2em] text-lg">MASUK KE PORTAL</span>
              )}
            </motion.button>
          </form>

          <footer className="mt-12 pt-8 border-t border-slate-50 text-center">
             <div className="flex items-center justify-center gap-2 mb-3">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">Enkripsi Data 256-bit</p>
             </div>
             <p className="text-[8px] font-bold text-slate-300 uppercase tracking-widest leading-loose">
               Pastikan data yang dimasukkan sesuai dengan ijazah / raport Anda.
             </p>
          </footer>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginView;
