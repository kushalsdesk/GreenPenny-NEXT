"use client";
import { motion } from 'motion/react';
import CurrencyFloats from '../CurrencyFloats';
import FloatingCard from '../FloatingCard';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-12 px-6 overflow-hidden">
      <CurrencyFloats />
      
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center relative z-10">
        <div className="text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            GreenPenny 2.0 is live
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-6">
              Wealth management, <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-300">beautifully engineered.</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-400 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed"
          >
            Connect your accounts, track expenses, and grow your net worth with AI-driven insights in a single, secure dashboard.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
          >
            <button className="w-full sm:w-auto px-8 py-4 bg-primary text-navy font-bold rounded-xl hover:bg-primary-dark transition-colors shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              Open Free Account
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-white/5 text-white font-bold rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
              View Interactive Demo
            </button>
          </motion.div>
        </div>

        <div className="relative mt-12 lg:mt-0">
          <FloatingCard />
        </div>
      </div>
    </section>
  );
}
