"use client";
import { motion } from 'motion/react';
import { formatCurrency } from '../../lib/utils';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';

export default function FloatingCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: 10 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
      className="relative z-10 w-full max-w-sm mx-auto perspective-1000"
    >
      <motion.div
        animate={{ y: [-8, 8, -8] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="bg-navy-light/90 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] transform-style-3d"
      >
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl" />
        
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
              <ShieldCheck className="w-4 h-4 text-primary" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Secured</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-full border border-white/10">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-mono text-primary">SYNCING</span>
          </div>
        </div>

        <p className="text-sm text-slate-400 font-medium mb-1">Total Wealth</p>
        <h2 className="text-4xl font-mono font-bold text-white mb-6 tracking-tight">
          {formatCurrency(142580.50)}
        </h2>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center text-primary">
                <ArrowUpRight className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Investment Return</p>
                <p className="text-[10px] text-slate-500">Last 30 days</p>
              </div>
            </div>
            <span className="text-sm font-mono text-primary">+$3,450.00</span>
          </div>

          <div className="flex justify-between items-center px-2 py-1">
            <div className="h-1 flex-1 bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '75%' }}
                transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
                className="h-full bg-primary rounded-full relative"
              >
                <div className="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-r from-transparent to-white/20" />
              </motion.div>
            </div>
            <span className="text-[10px] font-mono text-slate-500 ml-3">75% GOAL</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
