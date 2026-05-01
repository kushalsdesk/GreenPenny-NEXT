"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { formatCurrency } from '../../lib/utils';
import { ArrowUpRight, ShieldCheck, TrendingUp, Wallet, LineChart, Users, BellRing, Database } from 'lucide-react';

const STATS = [
  { label: 'Investment Return', period: 'Last 30 days', value: '+$3,450.00', Icon: ArrowUpRight, color: 'text-primary' },
  { label: 'Savings Yield', period: 'This Month', value: '+$142.50', Icon: TrendingUp, color: 'text-blue-400' },
  { label: 'Dividend Income', period: 'Last Quarter', value: '+$890.20', Icon: Wallet, color: 'text-emerald-400' },
  { label: 'Portfolio Growth', period: 'YTD', value: '+12.4%', Icon: LineChart, color: 'text-teal-400' },
];

const ProcessorBeams = () => {
  const lines = [
    // Top Right
    "M 400 400 L 450 350 L 550 250 L 750 250",
    "M 400 400 L 470 370 L 520 320 L 700 320",
    "M 400 400 L 480 400 L 700 400",
    "M 400 400 L 420 320 L 420 150 L 550 50",
    "M 400 400 L 440 280 L 540 180 L 650 180",

    // Top Left
    "M 400 400 L 350 350 L 250 250 L 50 250",
    "M 400 400 L 330 370 L 280 320 L 100 320",
    "M 400 400 L 320 400 L 100 400",
    "M 400 400 L 380 320 L 380 150 L 250 50",
    "M 400 400 L 360 280 L 260 180 L 150 180",

    // Bottom Right
    "M 400 400 L 450 450 L 550 550 L 750 550",
    "M 400 400 L 470 430 L 520 480 L 700 480",
    "M 400 400 L 420 480 L 420 650 L 550 750",
    "M 400 400 L 440 520 L 540 620 L 650 620",
    "M 400 400 L 480 500 L 650 500",

    // Bottom Left
    "M 400 400 L 350 450 L 250 550 L 50 550",
    "M 400 400 L 330 430 L 280 480 L 100 480",
    "M 400 400 L 380 480 L 380 650 L 250 750",
    "M 400 400 L 360 520 L 260 620 L 150 620",
    "M 400 400 L 320 500 L 150 500",

    // Additional vertical/horizontal
    "M 400 400 L 400 250 L 400 50",
    "M 400 400 L 400 550 L 400 750",
  ];

  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[2400px] h-[2400px] z-0 pointer-events-none origin-center">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 800 800"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        className="[mask-image:radial-gradient(ellipse_160px_100px_at_center,transparent_0%,transparent_80%,black_100%)] opacity-80"
      >
        {lines.map((d, i) => (
          <g key={i}>
            {/* Base track */}
            <path d={d} stroke="#1C2D42" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" />

            {/* Animated data pulses */}
            <motion.path
              d={d}
              stroke="#10b981"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
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
                vectorEffect="non-scaling-stroke"
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
        <circle cx="400" cy="400" r="160" stroke="#10b981" strokeWidth="1" vectorEffect="non-scaling-stroke" strokeDasharray="4 12" className="opacity-20" />
        <motion.circle cx="400" cy="400" r="200" stroke="#10b981" strokeWidth="1" vectorEffect="non-scaling-stroke" strokeDasharray="2 20" className="opacity-10" animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }} style={{ transformOrigin: "400px 400px" }} />
      </svg>
    </div>
  );
};

const AdvancedModules = () => {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none z-30 scale-[0.55] sm:scale-[0.7] md:scale-90 lg:scale-100 origin-center">
      {/* Top Left: Debt Settlement Engine */}
      <div className="absolute top-[200px] left-[60px] lg:left-[40px] xl:left-[-20px] lg:top-[180px] xl:top-[160px] bg-navy-light/95 border border-primary/20 w-[280px] rounded-2xl p-4 shadow-2xl flex flex-col gap-3 backdrop-blur-xl transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto transition-all duration-700">
        <div className="flex items-center justify-between border-b border-primary/20 pb-2">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-xs font-bold text-white tracking-widest">SETTLEMENT ENGINE</span>
          </div>
          <span className="text-[9px] text-primary font-mono border border-primary/40 bg-primary/10 px-1.5 py-0.5 rounded shadow-[0_0_10px_rgba(16,185,129,0.2)]">OPTZ_ACTIVE</span>
        </div>
        <p className="text-[10px] text-slate-400 font-mono leading-relaxed opacity-90">Auto-resolving group debt chains to minimize distinct transfer operations.</p>
        <div className="relative h-20 w-full bg-navy rounded-lg border border-white/5 overflow-hidden flex items-center justify-center shadow-inner mt-1">
          <svg className="w-full h-full" viewBox="0 0 100 40">
            <circle cx="20" cy="20" r="4" fill="#1C2D42" stroke="#10b981" strokeWidth="1.5" />
            <circle cx="50" cy="10" r="4" fill="#1C2D42" stroke="#10b981" strokeWidth="1.5" />
            <circle cx="80" cy="30" r="4" fill="#1C2D42" stroke="#10b981" strokeWidth="1.5" />
            {/* Chaos state */}
            <motion.path d="M24,18 L46,12" stroke="#4B6A68" strokeDasharray="1 2" animate={{ opacity: [1, 0, 1] }} transition={{ duration: 6, repeat: Infinity, times: [0, 0.2, 1] }} />
            <motion.path d="M54,14 L76,26" stroke="#4B6A68" strokeDasharray="1 2" animate={{ opacity: [1, 0, 1] }} transition={{ duration: 6, repeat: Infinity, times: [0, 0.2, 1] }} />
            <motion.path d="M23,22 L77,29" stroke="#4B6A68" strokeDasharray="1 2" animate={{ opacity: [1, 0, 1] }} transition={{ duration: 6, repeat: Infinity, times: [0, 0.2, 1] }} />
            {/* Minimized state */}
            <motion.path d="M24,18 L46,12" stroke="#10b981" strokeWidth="1.5" animate={{ opacity: [0, 1, 0] }} transition={{ duration: 6, repeat: Infinity, times: [0, 0.2, 1] }} />
            <motion.path d="M23,22 L77,29" stroke="#10b981" strokeWidth="1.5" animate={{ opacity: [0, 1, 0] }} transition={{ duration: 6, repeat: Infinity, times: [0, 0.2, 1] }} />
          </svg>
        </div>
      </div>

      {/* Top Right: Subscription Radar */}
      <div className="absolute top-[220px] right-[80px] lg:right-[40px] xl:right-[-20px] lg:top-[200px] xl:top-[180px] bg-navy-light/95 border border-primary/20 w-[260px] rounded-2xl p-4 shadow-2xl flex flex-col gap-3 backdrop-blur-xl transform translate-x-1/2 -translate-y-1/2 pointer-events-auto transition-all duration-700">
        <div className="flex items-center justify-between border-b border-primary/20 pb-2">
          <div className="flex items-center gap-2">
            <BellRing className="w-4 h-4 text-primary" />
            <span className="text-xs font-bold text-white tracking-widest">RENEWAL RADAR</span>
          </div>
          <div className="relative">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <div className="w-2 h-2 rounded-full bg-primary absolute inset-0 animate-ping" />
          </div>
        </div>
        <p className="text-[10px] text-slate-400 font-mono leading-relaxed opacity-90">Predictive scanning of upcoming recurring commitments to prevent blind charges.</p>
        <div className="flex flex-col gap-2 w-full mt-1">
          <div className="bg-navy rounded-lg border border-primary/20 p-2.5 flex justify-between items-center relative overflow-hidden">
            <motion.div className="absolute top-0 bottom-0 left-0 bg-primary/10" animate={{ width: ['0%', '98%', '98%', '0%'] }} transition={{ duration: 8, repeat: Infinity, times: [0, 0.4, 0.9, 1] }} />
            <span className="text-[11px] text-white z-10 font-bold tracking-wide">Adobe CC</span>
            <span className="text-[10px] text-primary font-mono z-10 font-bold bg-primary/10 px-2 rounded">3 days</span>
          </div>
          <div className="bg-navy rounded-lg border border-white/5 p-2.5 flex justify-between items-center relative overflow-hidden">
            <motion.div className="absolute top-0 bottom-0 left-0 bg-slate-500/10" animate={{ width: ['0%', '40%', '40%', '0%'] }} transition={{ duration: 8, repeat: Infinity, times: [0, 0.4, 0.9, 1] }} />
            <span className="text-[11px] text-white z-10 font-bold tracking-wide">Spotify</span>
            <span className="text-[10px] text-slate-400 font-mono z-10">14 days</span>
          </div>
        </div>
      </div>

      {/* Bottom Left: Isolated Ledger */}
      <div className="absolute bottom-[200px] left-[100px] lg:left-[60px] xl:left-[20px] lg:bottom-[180px] xl:bottom-[160px] bg-navy-light/95 border border-primary/20 w-[240px] rounded-2xl p-4 shadow-2xl flex flex-col gap-3 backdrop-blur-xl transform -translate-x-1/2 translate-y-1/2 pointer-events-auto transition-all duration-700">
        <div className="flex items-center justify-between border-b border-primary/20 pb-2">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-primary" />
            <span className="text-xs font-bold text-white tracking-widest">ISOLATED LEDGER</span>
          </div>
          <span className="text-[9px] text-primary font-mono border border-primary/40 bg-primary/10 px-1.5 py-0.5 rounded shadow-[0_0_10px_rgba(16,185,129,0.2)]">OFFLINE</span>
        </div>
        <p className="text-[10px] text-slate-400 font-mono leading-relaxed opacity-90">Local cryptographic transaction hashing. Zero external API handshakes.</p>
        <div className="flex flex-col gap-2 mt-1">
          <div className="w-full bg-navy h-8 border border-primary/20 rounded-lg flex items-center px-3 overflow-hidden font-mono shadow-inner">
            <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1, repeat: Infinity }} className="text-primary text-xs font-bold mr-2">{">_"}</motion.span>
            <div className="flex-1 relative">
              <motion.div animate={{ y: [20, 0, 0, -20] }} transition={{ duration: 4, repeat: Infinity, times: [0, 0.1, 0.9, 1] }} className="absolute inset-x-0 inset-y-0 flex items-center">
                <span className="text-primary text-[10px] tracking-wider">LOG ₹450 / Food</span>
              </motion.div>
            </div>
          </div>
          <div className="flex gap-2 h-1.5 opacity-60">
            <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0 }} className="flex-1 bg-primary/20 rounded-full border border-primary/30" />
            <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }} className="flex-1 bg-primary/20 rounded-full border border-primary/30" />
            <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, delay: 1 }} className="flex-1 bg-primary/20 rounded-full border border-primary/30" />
          </div>
        </div>
      </div>
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

      <div className="relative z-10 bg-navy-light/95 backdrop-blur-xl border border-primary/20 p-6 rounded-3xl shadow-2xl transform-style-3d overflow-hidden">
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

      {/* Advanced Component Modules (positioned around the core to form a unified circuit) */}
      <AdvancedModules />
    </motion.div>
  );
}
