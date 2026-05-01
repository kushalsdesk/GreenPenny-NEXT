"use client";
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Users, Bell, Zap } from 'lucide-react';

const featureItems = [
  {
    title: 'Split Without the Drama',
    desc: 'Add a group expense, GreenPenny calculates who owes what using the minimum number of transfers. No more chain payments. Mark settled, move on.',
    icon: Users,
  },
  {
    title: 'Know What\'s Coming',
    desc: 'Log every recurring cost once. Get email reminders 3 days before renewal. See your total monthly committed spend in a single number before the month begins.',
    icon: Bell,
  },
  {
    title: 'Log It in Seconds',
    desc: 'Quick manual spend entry with auto-suggested categories. No bank connection, no OAuth, no anxiety. Just your data, yours alone.',
    icon: Zap,
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-2xl md:text-4xl font-bold text-white tracking-tight leading-[1.2] mb-4 max-w-3xl mx-auto">
            Your money, your crew, your subscriptions. <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-300">Finally, all in one place.</span>
          </h3>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-8">
            Split bills without the awkward reminders. Track every renewal before it hits. Log your spends in seconds — no bank connection ever required.
          </p>

        </motion.div>
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
            <SplitsViz />
          </motion.div>
          <motion.div style={{ opacity: op2 }} className="absolute inset-0 flex items-center justify-center">
            <SubscriptionsViz />
          </motion.div>
          <motion.div style={{ opacity: op3 }} className="absolute inset-0 flex items-center justify-center">
            <TransactionsViz />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const SplitsViz = () => {
  return (
    <svg viewBox="0 0 400 400" className="w-full h-full max-w-lg drop-shadow-2xl">
      {/* Avatars */}
      <motion.g animate={{ y: [-5, 5, -5] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
        <circle cx="200" cy="100" r="30" fill="#1C2D42" stroke="#3D5A80" strokeWidth="2" />
        <text x="200" y="110" fill="#80B8FF" fontSize="24" textAnchor="middle" fontWeight="bold">R</text>
      </motion.g>

      <motion.g animate={{ y: [5, -5, 5] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
        <circle cx="100" cy="270" r="30" fill="#1C2D42" stroke="#A8F8A8" strokeWidth="2" />
        <text x="100" y="280" fill="#A8F8A8" fontSize="24" textAnchor="middle" fontWeight="bold">P</text>
      </motion.g>

      <motion.g animate={{ y: [-3, 3, -3] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}>
        <circle cx="300" cy="270" r="30" fill="#1C2D42" stroke="#FFD880" strokeWidth="2" />
        <text x="300" y="280" fill="#FFD880" fontSize="24" textAnchor="middle" fontWeight="bold">A</text>
      </motion.g>

      {/* Initial complex arrows */}
      <motion.g
        initial={{ opacity: 1 }}
        animate={{ opacity: [1, 1, 0, 0, 1] }}
        transition={{ duration: 8, repeat: Infinity, times: [0, 0.4, 0.5, 0.9, 1] }}
      >
        {/* Arrow from P to R */}
        <path d="M 115 245 L 180 135" stroke="#4B6A68" strokeWidth="3" strokeDasharray="5 5" />
        {/* Arrow from A to R */}
        <path d="M 285 245 L 220 135" stroke="#4B6A68" strokeWidth="3" strokeDasharray="5 5" />
        {/* Arrow from P to A */}
        <path d="M 140 270 L 260 270" stroke="#4B6A68" strokeWidth="3" strokeDasharray="5 5" />
      </motion.g>

      {/* Simplified arrows */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 1, 1, 0] }}
        transition={{ duration: 8, repeat: Infinity, times: [0, 0.4, 0.5, 0.9, 1] }}
      >
        {/* Arrow from P to R directly */}
        <path d="M 115 245 L 180 135" stroke="#10b981" strokeWidth="6" strokeLinecap="round" />
        <polygon points="180,135 170,145 185,150" fill="#10b981" transform="rotate(-30 180 135)" />

        {/* Arrow from A to R directly */}
        <path d="M 285 245 L 220 135" stroke="#10b981" strokeWidth="6" strokeLinecap="round" />
        <polygon points="220,135 215,150 230,145" fill="#10b981" transform="rotate(30 220 135)" />

        <rect x="110" y="170" width="60" height="24" rx="12" fill="#1C2D42" stroke="#10b981" strokeWidth="2" />
        <text x="140" y="186" fill="#10b981" fontSize="12" textAnchor="middle" fontWeight="bold">₹2400</text>

        <rect x="230" y="170" width="60" height="24" rx="12" fill="#1C2D42" stroke="#10b981" strokeWidth="2" />
        <text x="260" y="186" fill="#10b981" fontSize="12" textAnchor="middle" fontWeight="bold">₹1200</text>
      </motion.g>

      {/* Simplified Badge */}
      <motion.g
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: [0, 0, 1, 1, 0], scale: [0.8, 0.8, 1, 1, 0.8] }}
        transition={{ duration: 8, repeat: Infinity, times: [0, 0.4, 0.5, 0.9, 1] }}
      >
        <rect x="140" y="320" width="120" height="30" rx="15" fill="#10b981" opacity="0.2" />
        <rect x="140" y="320" width="120" height="30" rx="15" fill="none" stroke="#10b981" strokeWidth="2" />
        <text x="200" y="340" fill="#10b981" fontSize="12" textAnchor="middle" fontWeight="bold">SIMPLIFIED</text>
      </motion.g>
    </svg>
  );
};

const SubscriptionsViz = () => {
  return (
    <svg viewBox="0 0 400 400" className="w-full h-full max-w-lg drop-shadow-2xl">
      <motion.g
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <rect x="80" y="220" width="240" height="70" rx="16" fill="#1C2D42" stroke="#2C405A" strokeWidth="2" />
        <circle cx="120" cy="255" r="15" fill="#FF8080" opacity="0.8" />
        <rect x="150" y="245" width="80" height="8" rx="4" fill="#3D5A80" />
        <rect x="150" y="260" width="40" height="6" rx="3" fill="#2C405A" />
        <text x="300" y="260" fill="#FF8080" fontSize="14" textAnchor="end" fontWeight="bold">Gym</text>
      </motion.g>

      <motion.g
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <rect x="80" y="140" width="240" height="70" rx="16" fill="#1C2D42" stroke="#2C405A" strokeWidth="2" />
        <circle cx="120" cy="175" r="15" fill="#A8F8A8" opacity="0.8" />
        <rect x="150" y="165" width="70" height="8" rx="4" fill="#3D5A80" />
        <rect x="150" y="180" width="50" height="6" rx="3" fill="#2C405A" />
        <text x="300" y="180" fill="#A8F8A8" fontSize="14" textAnchor="end" fontWeight="bold">Spotify</text>
      </motion.g>

      <motion.g
        animate={{ y: [-5, 5, -5] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <rect x="80" y="60" width="240" height="70" rx="16" fill="#1C2D42" stroke="#80B8FF" strokeWidth="2" />
        <circle cx="120" cy="95" r="15" fill="#80B8FF" opacity="0.8" />
        <rect x="150" y="85" width="90" height="8" rx="4" fill="#3D5A80" />
        <rect x="150" y="100" width="60" height="6" rx="3" fill="#2C405A" />
        <text x="300" y="100" fill="#80B8FF" fontSize="14" textAnchor="end" fontWeight="bold">Hotstar</text>
      </motion.g>

      {/* Reminder Badge floating near top */}
      <motion.g
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="transform origin-center"
      >
        <rect x="180" y="40" width="160" height="36" rx="18" fill="#2C405A" stroke="#10b981" strokeWidth="2" />
        <circle cx="200" cy="58" r="4" fill="#10b981" />
        <motion.circle cx="200" cy="58" r="4" fill="none" stroke="#10b981" strokeWidth="2" animate={{ scale: [1, 2.5], opacity: [1, 0] }} transition={{ duration: 1.5, repeat: Infinity }} />
        <text x="215" y="62" fill="#10b981" fontSize="12" fontWeight="bold">Renews in 3 days</text>
      </motion.g>
    </svg>
  )
}

const TransactionsViz = () => {
  return (
    <svg viewBox="0 0 400 400" className="w-full h-full max-w-lg drop-shadow-2xl">
      <rect x="60" y="60" width="280" height="300" rx="24" fill="#1C2D42" stroke="#2C405A" strokeWidth="4" />

      <text x="90" y="110" fill="#80B8FF" fontSize="14" fontWeight="bold">TODAY</text>
      <line x1="90" y1="125" x2="310" y2="125" stroke="#3D5A80" strokeWidth="2" strokeDasharray="4 4" />

      {/* Chips */}
      <motion.g initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.5, repeat: Infinity, repeatType: 'reverse', repeatDelay: 6 }}>
        <rect x="90" y="150" width="220" height="40" rx="12" fill="#2C405A" />
        <circle cx="115" cy="170" r="10" fill="#FFD880" />
        <text x="140" y="175" fill="white" fontSize="14" fontWeight="500">Food</text>
        <text x="290" y="175" fill="#FF8080" fontSize="14" fontWeight="bold" textAnchor="end">-₹450</text>
      </motion.g>

      <motion.g initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 1, repeat: Infinity, repeatType: 'reverse', repeatDelay: 6 }}>
        <rect x="90" y="200" width="220" height="40" rx="12" fill="#2C405A" />
        <circle cx="115" cy="220" r="10" fill="#A8F8A8" />
        <text x="140" y="225" fill="white" fontSize="14" fontWeight="500">Transport</text>
        <text x="290" y="225" fill="#FF8080" fontSize="14" fontWeight="bold" textAnchor="end">-₹120</text>
      </motion.g>

      <motion.g initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 1.5, repeat: Infinity, repeatType: 'reverse', repeatDelay: 6 }}>
        <rect x="90" y="250" width="220" height="40" rx="12" fill="#2C405A" />
        <circle cx="115" cy="270" r="10" fill="#80B8FF" />
        <text x="140" y="275" fill="white" fontSize="14" fontWeight="500">Entertainment</text>
        <text x="290" y="275" fill="#FF8080" fontSize="14" fontWeight="bold" textAnchor="end">-₹800</text>
      </motion.g>

      {/* Running Total */}
      <motion.g initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 2, repeat: Infinity, repeatType: 'reverse', repeatDelay: 6 }}>
        <rect x="60" y="310" width="280" height="50" fill="#1C2D42" />
        <line x1="60" y1="310" x2="340" y2="310" stroke="#3D5A80" strokeWidth="2" />
        <text x="90" y="340" fill="#80B8FF" fontSize="12" fontWeight="bold">MONTHLY TOTAL</text>
        <text x="310" y="342" fill="white" fontSize="20" fontWeight="bold" textAnchor="end">₹1,370</text>
      </motion.g>

    </svg>
  )
}
