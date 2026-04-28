"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { formatCurrency } from '../../lib/utils';
import { ArrowUpRight, ShieldCheck, TrendingUp, Wallet, LineChart } from 'lucide-react';

const STATS = [
  { label: 'Investment Return', period: 'Last 30 days', value: '+$3,450.00', Icon: ArrowUpRight, color: 'text-primary' },
  { label: 'Savings Yield', period: 'This Month', value: '+$142.50', Icon: TrendingUp, color: 'text-blue-400' },
  { label: 'Dividend Income', period: 'Last Quarter', value: '+$890.20', Icon: Wallet, color: 'text-emerald-400' },
  { label: 'Portfolio Growth', period: 'YTD', value: '+12.4%', Icon: LineChart, color: 'text-teal-400' },
];

const ProcessorBeams = () => {
  const lines = [
    // Top Right
    "M 450 350 L 550 250 L 750 250",
    "M 470 370 L 520 320 L 700 320",
    "M 480 400 L 700 400",
    "M 420 320 L 420 150 L 550 50",
    "M 440 280 L 540 180 L 650 180",

    // Top Left
    "M 350 350 L 250 250 L 50 250",
    "M 330 370 L 280 320 L 100 320",
    "M 320 400 L 100 400",
    "M 380 320 L 380 150 L 250 50",
    "M 360 280 L 260 180 L 150 180",

    // Bottom Right
    "M 450 450 L 550 550 L 750 550",
    "M 470 430 L 520 480 L 700 480",
    "M 420 480 L 420 650 L 550 750",
    "M 440 520 L 540 620 L 650 620",
    "M 480 500 L 650 500",

    // Bottom Left
    "M 350 450 L 250 550 L 50 550",
    "M 330 430 L 280 480 L 100 480",
    "M 380 480 L 380 650 L 250 750",
    "M 360 520 L 260 620 L 150 620",
    "M 320 500 L 150 500",

    // Additional vertical/horizontal
    "M 400 250 L 400 50",
    "M 400 550 L 400 750",
  ];

  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] z-0 pointer-events-none opacity-80 scale-[0.55] sm:scale-[0.7] md:scale-100 origin-center">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 800 800"
        fill="none"
        className="[mask-image:radial-gradient(circle_at_center,transparent_20%,black_35%,transparent_75%)]"
      >
        {lines.map((d, i) => (
          <g key={i}>
            {/* Base track */}
            <path d={d} stroke="#1C2D42" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

            {/* Animated data pulses */}
            <motion.path
              d={d}
              stroke="#10b981"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="15 200"
              initial={{ strokeDashoffset: 400 }}
              animate={{ strokeDashoffset: -100 }}
              transition={{
                duration: 3 + (i % 3),
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.1,
              }}
            />
            {/* Extra glow for some lines */}
            {i % 3 === 0 && (
              <motion.path
                d={d}
                stroke="#34d399"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="5 150"
                initial={{ strokeDashoffset: 400 }}
                animate={{ strokeDashoffset: -100 }}
                transition={{
                  duration: 2 + (i % 2),
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.3,
                }}
                className="blur-[2px]"
              />
            )}
            {/* Points at ends */}
            {i % 4 === 0 && (
              <motion.circle
                r="3"
                fill="#10b981"
                className="blur-[1px]"
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
              >
                <animateMotion dur={`${4 + (i % 2)}s`} repeatCount="indefinite" path={d} />
              </motion.circle>
            )}
          </g>
        ))}
        {/* Central glowing connections */}
        <circle cx="400" cy="400" r="160" stroke="#10b981" strokeWidth="1" strokeDasharray="4 12" className="opacity-20" />
        <motion.circle cx="400" cy="400" r="200" stroke="#10b981" strokeWidth="1" strokeDasharray="2 20" className="opacity-10" animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }} style={{ transformOrigin: "400px 400px" }} />
      </svg>
    </div>
  );
};

export default function FloatingCard() {
  const [currentStat, setCurrentStat] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % STATS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: 10 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
      className="relative w-[85%] sm:w-full max-w-sm mx-auto perspective-1000"
    >
      {/* Super Tech Green Beams Background */}
      <ProcessorBeams />

      <div className="relative z-10 bg-navy-light/90 backdrop-blur-xl border border-primary/30 p-6 rounded-3xl shadow-[0_0_50px_-15px_rgba(16,185,129,0.4)] transform-style-3d overflow-hidden">
        {/* Animated laser beam effect across the card */}
        <motion.div
          animate={{ left: ['-200%', '200%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-[100%] -bottom-[100%] w-32 bg-gradient-to-r from-transparent via-white/20 to-transparent -rotate-45 pointer-events-none"
        />

        <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-3xl opacity-60 pointer-events-none" />

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
          <div className="relative h-14 w-full bg-white/5 rounded-xl border border-white/5 overflow-hidden p-3">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={currentStat}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-md bg-white/5 flex items-center justify-center border border-white/5">
                    {(() => {
                      const Icon = STATS[currentStat].Icon;
                      return <Icon className={`w-4 h-4 ${STATS[currentStat].color}`} />;
                    })()}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">{STATS[currentStat].label}</p>
                    <p className="text-[10px] text-slate-500">{STATS[currentStat].period}</p>
                  </div>
                </div>
                <span className={`text-sm font-mono font-medium ${STATS[currentStat].color}`}>
                  {STATS[currentStat].value}
                </span>
              </motion.div>
            </AnimatePresence>
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
      </div>
    </motion.div>
  );
}
