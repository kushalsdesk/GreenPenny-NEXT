"use client";
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowLeftRight, CreditCard, PieChart } from 'lucide-react';

const featureItems = [
  {
    title: 'Track Multi-Currency',
    desc: 'Seamlessly hold and track balances in USD, EUR, GBP, and JPY. Real-time conversion rates baked in.',
    icon: ArrowLeftRight,
  },
  {
    title: 'Cards Hub',
    desc: 'Manage all your credit and debit cards from a single view. Spot fraudulent charges the second they happen.',
    icon: CreditCard,
  },
  {
    title: 'Budgeting Goals',
    desc: 'Set custom spending limits per category. Watch your progress rings fill up as the month progresses.',
    icon: PieChart,
  },
];

export default function FeatureCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Crossfade opacities for the sticky right-side graphics based on scroll progress
  const op1 = useTransform(scrollYProgress, [0, 0.3, 0.4], [1, 1, 0]);
  const op2 = useTransform(scrollYProgress, [0.3, 0.4, 0.6, 0.7], [0, 1, 1, 0]);
  const op3 = useTransform(scrollYProgress, [0.6, 0.7, 1], [0, 1, 1]);

  return (
    <section id="features" ref={containerRef} className="relative w-full bg-navy pb-[20vh]">
      <div className="pt-32 pb-16 px-6 max-w-7xl mx-auto text-center">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">Everything you need, <br className="hidden md:block" /><span className="text-primary">nothing you don't.</span></h2>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative flex items-start gap-12 mt-12">

        {/* Left side: scrolling text segments */}
        <div className="flex-1 py-[10vh] md:py-[20vh]">
          {featureItems.map((f, i) => (
            <div key={i} className="min-h-[50vh] md:min-h-[70vh] flex flex-col justify-center">
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 border border-white/10 md:hidden">
                <f.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-[1.1]">{f.title}</h3>
              <p className="text-xl md:text-2xl text-slate-400 leading-relaxed max-w-md md:max-w-xl">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Right side: sticky visuals (Hidden on mobile) */}
        <div className="hidden md:flex flex-1 sticky top-32 h-[75vh] items-center justify-center relative">
          <motion.div style={{ opacity: op1 }} className="absolute inset-0 flex items-center justify-center">
            <MultiCurrencyViz />
          </motion.div>
          <motion.div style={{ opacity: op2 }} className="absolute inset-0 flex items-center justify-center">
            <CardsHubViz />
          </motion.div>
          <motion.div style={{ opacity: op3 }} className="absolute inset-0 flex items-center justify-center">
            <BudgetViz />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const MultiCurrencyViz = () => {
  return (
    <svg viewBox="0 0 400 400" className="w-full h-full max-w-lg drop-shadow-2xl">
      <motion.circle cx="200" cy="200" r="140" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="5 15" className="text-white/20"
        animate={{ rotate: 360 }} transition={{ duration: 40, ease: "linear", repeat: Infinity }} style={{ transformOrigin: "200px 200px" }} />
      <motion.circle cx="200" cy="200" r="100" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary/30"
        animate={{ rotate: -360 }} transition={{ duration: 30, ease: "linear", repeat: Infinity }} style={{ transformOrigin: "200px 200px" }} />

      {/* Currencies jumping around */}
      <motion.g animate={{ y: [-15, 15, -15] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
        <circle cx="120" cy="90" r="30" fill="#2C405A" stroke="#3D5A80" strokeWidth="2" />
        <text x="120" y="100" fill="#80B8FF" fontSize="28" textAnchor="middle" fontWeight="bold">€</text>
      </motion.g>

      <motion.g animate={{ y: [10, -20, 10] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}>
        <circle cx="80" cy="220" r="40" fill="#1C2D42" stroke="#A8F8A8" strokeWidth="2" />
        <text x="80" y="232" fill="#A8F8A8" fontSize="36" textAnchor="middle" fontWeight="bold">$</text>
      </motion.g>

      <motion.g animate={{ y: [-10, 20, -10] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
        <circle cx="280" cy="120" r="36" fill="#2C405A" stroke="#FFD880" strokeWidth="2" />
        <text x="280" y="132" fill="#FFD880" fontSize="32" textAnchor="middle" fontWeight="bold">£</text>
      </motion.g>

      <motion.g animate={{ y: [15, -15, 15] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}>
        <circle cx="300" cy="260" r="30" fill="#1C2D42" stroke="#FF8080" strokeWidth="2" />
        <text x="300" y="270" fill="#FF8080" fontSize="28" textAnchor="middle" fontWeight="bold">¥</text>
      </motion.g>

      {/* Center hub */}
      <motion.circle cx="200" cy="200" r="50" fill="#1C2D42" stroke="#4B6A68" strokeWidth="4"
        animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
      <motion.g animate={{ rotate: [0, 180, 360] }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: "200px 200px" }}>
        <path d="M 185 185 L 215 215 M 215 185 L 185 215" stroke="#A8F8A8" strokeWidth="6" strokeLinecap="round" />
      </motion.g>
    </svg>
  );
};

const CardsHubViz = () => {
  return (
    <svg viewBox="0 0 400 400" className="w-full h-full max-w-lg drop-shadow-2xl">
      <motion.g
        animate={{ y: [0, -15, 0], rotate: [-15, -12, -15] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "200px 200px" }}
      >
        <rect x="80" y="160" width="240" height="150" rx="16" fill="#1C2D42" stroke="#2C405A" strokeWidth="4" />
        <rect x="110" y="190" width="40" height="30" rx="4" fill="#3D5A80" />
        <circle cx="280" cy="205" r="15" fill="#3D5A80" opacity="0.5" />
        <circle cx="260" cy="205" r="15" fill="#3D5A80" opacity="0.7" />
        <line x1="110" y1="250" x2="220" y2="250" stroke="#3D5A80" strokeWidth="8" strokeLinecap="round" />
        <line x1="110" y1="270" x2="180" y2="270" stroke="#3D5A80" strokeWidth="8" strokeLinecap="round" />
      </motion.g>

      <motion.g
        animate={{ y: [0, 15, 0], rotate: [0, 3, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        style={{ transformOrigin: "200px 200px" }}
      >
        <rect x="100" y="110" width="240" height="150" rx="16" fill="#2C405A" stroke="#3D5A80" strokeWidth="4" />
        <rect x="130" y="140" width="40" height="30" rx="4" fill="#80B8FF" opacity="0.3" />
        <circle cx="300" cy="155" r="15" fill="#80B8FF" opacity="0.2" />
        <circle cx="280" cy="155" r="15" fill="#80B8FF" opacity="0.4" />
        <line x1="130" y1="200" x2="240" y2="200" stroke="#80B8FF" opacity="0.3" strokeWidth="8" strokeLinecap="round" />
        <line x1="130" y1="220" x2="200" y2="220" stroke="#80B8FF" opacity="0.3" strokeWidth="8" strokeLinecap="round" />
      </motion.g>

      <motion.g
        animate={{ y: [-10, 10, -10], rotate: [12, 16, 12] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        style={{ transformOrigin: "200px 200px" }}
      >
        <rect x="120" y="170" width="240" height="150" rx="16" fill="#A8F8A8" stroke="#7FE07F" strokeWidth="4" />
        <rect x="150" y="200" width="40" height="30" rx="4" fill="#1C2D42" opacity="0.4" />
        <circle cx="320" cy="215" r="15" fill="#1C2D42" opacity="0.3" />
        <circle cx="300" cy="215" r="15" fill="#1C2D42" opacity="0.5" />
        <line x1="150" y1="260" x2="260" y2="260" stroke="#1C2D42" opacity="0.4" strokeWidth="8" strokeLinecap="round" />
        <line x1="150" y1="280" x2="220" y2="280" stroke="#1C2D42" opacity="0.4" strokeWidth="8" strokeLinecap="round" />
      </motion.g>
    </svg>
  )
}

const BudgetViz = () => {
  return (
    <svg viewBox="0 0 400 400" className="w-full h-full max-w-lg drop-shadow-2xl">
      {/* Center Text */}
      <motion.text x="200" y="210" fill="white" fontSize="48" fontWeight="bold" textAnchor="middle" animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 3, repeat: Infinity }}>
        75%
      </motion.text>
      <text x="200" y="240" fill="#80B8FF" fontSize="16" fontWeight="bold" textAnchor="middle" letterSpacing="2">
        BUDGET SPENT
      </text>

      {/* Background Ring */}
      <circle cx="200" cy="200" r="140" fill="none" stroke="#1C2D42" strokeWidth="32" strokeLinecap="round" />

      {/* Animated Fill Rings */}
      <motion.circle
        cx="200" cy="200" r="140" fill="none" stroke="#3D5A80" strokeWidth="32" strokeLinecap="round"
        strokeDasharray="880"
        initial={{ strokeDashoffset: 880 }}
        whileInView={{ strokeDashoffset: 300 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 2, ease: "easeOut" }}
        style={{ transformOrigin: "200px 200px", rotate: -90 }}
      />
      <motion.circle
        cx="200" cy="200" r="140" fill="none" stroke="#A8F8A8" strokeWidth="32" strokeLinecap="round"
        strokeDasharray="880"
        initial={{ strokeDashoffset: 880 }}
        whileInView={{ strokeDashoffset: 600 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 2.5, ease: "easeOut", delay: 0.2 }}
        style={{ transformOrigin: "200px 200px", rotate: -90 }}
      />

      {/* Floating elements indicating limits or categories */}
      <motion.g animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
        <circle cx="70" cy="120" r="28" fill="#1C2D42" stroke="#3D5A80" strokeWidth="4" />
        <line x1="60" y1="120" x2="80" y2="120" stroke="#80B8FF" strokeWidth="4" strokeLinecap="round" />
        <line x1="70" y1="110" x2="70" y2="130" stroke="#80B8FF" strokeWidth="4" strokeLinecap="round" />
      </motion.g>

      <motion.g animate={{ y: [0, 15, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}>
        <circle cx="330" cy="160" r="36" fill="#A8F8A8" />
        <path d="M 315 160 L 325 170 L 345 150" fill="none" stroke="#1C2D42" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      </motion.g>

      <motion.g animate={{ y: [-5, 10, -5], rotate: [0, 10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}>
        <circle cx="280" cy="340" r="22" fill="#2C405A" stroke="#FF8080" strokeWidth="3" />
        <line x1="272" y1="340" x2="288" y2="340" stroke="#FF8080" strokeWidth="4" strokeLinecap="round" />
      </motion.g>
    </svg>
  )
}
