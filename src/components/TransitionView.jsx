import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TransitionView = ({ onComplete }) => {
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 1500);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(onComplete, 500);
      return () => clearTimeout(timer);
    }
  }, [count, onComplete]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] relative">
      <AnimatePresence mode="wait">
        {count > 0 ? (
          <motion.div
            key={count}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ 
              scale: [0.5, 1.2, 1], 
              opacity: 1,
            }}
            exit={{ scale: 2, opacity: 0 }}
            transition={{ 
              duration: 1.2,
              ease: "easeInOut",
              times: [0, 0.4, 1]
            }}
            className="relative"
          >
            {/* Heartbeat Glow */}
            <motion.div
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{ 
                duration: 0.6, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 bg-green-500 rounded-full blur-[60px] -z-10"
            />
            
            <h1 className="text-[12rem] md:text-[18rem] font-black text-slate-900 leading-none tracking-tighter">
              {count}
            </h1>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-6xl font-black text-green-600 uppercase tracking-tighter">
              MEMBUKA HASIL...
            </h2>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute bottom-0 left-0 right-0 text-center text-slate-400 font-bold uppercase tracking-[0.4em] text-[10px] md:text-xs px-4"
      >
        Harap Tenang, Masa Depan Menanti
      </motion.p>
    </div>
  );
};

export default TransitionView;
