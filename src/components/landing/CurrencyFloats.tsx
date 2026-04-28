"use client";
import { motion } from 'motion/react';
import { DollarSign, Euro, Bitcoin, Activity, PieChart } from 'lucide-react';

export default function CurrencyFloats() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Decorative backdrop elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[150px]" />

      {/* Floating Icons */}
      <motion.div
        animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[20%] left-[15%] w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md"
      >
        <DollarSign className="w-6 h-6 text-primary" />
      </motion.div>

      <motion.div
        animate={{ y: [15, -15, 15], rotate: [0, -10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute top-[60%] left-[10%] w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md shadow-lg"
      >
        <PieChart className="w-8 h-8 text-blue-400" />
      </motion.div>

      <motion.div
        animate={{ y: [-20, 20, -20], rotate: [0, 15, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute top-[30%] right-[15%] w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md"
      >
        <Bitcoin className="w-7 h-7 text-gold" />
      </motion.div>

      <motion.div
        animate={{ y: [10, -10, 10], rotate: [0, -5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute bottom-[20%] right-[20%] w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md shadow-[0_0_30px_rgba(16,185,129,0.2)]"
      >
        <Activity className="w-6 h-6 text-primary" />
      </motion.div>

      <motion.div
        animate={{ y: [-15, 15, -15] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        className="absolute top-[10%] right-[40%] w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md"
      >
        <Euro className="w-5 h-5 text-slate-400" />
      </motion.div>
    </div>
  );
}
