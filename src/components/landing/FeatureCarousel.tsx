"use client";
import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from 'motion/react';
import { Users, Bell, Zap, X } from 'lucide-react';

const featureItems = [
  {
    title: 'Smart Group Splits',
    desc: 'Instantly split bills with auto-optimized debt resolution. We minimize the number of transfers so nobody has to pay in confusing chains.',
    icon: Users,
  },
  {
    title: 'Subscription Radar',
    desc: 'Never get hit with a surprise charge again. Track every recurring cost, visualize upcoming renewals, and stay in control of your cash flow.',
    icon: Bell,
  },
  {
    title: 'Lightning Fast Logging',
    desc: 'Manually input daily spends in seconds. No Plaid, no bank syncing, zero anxiety. Your data stays completely offline and isolated.',
    icon: Zap,
  },
];

export default function FeatureCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const carouselRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: carouselRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.35) setActiveIndex(0);
    else if (latest < 0.65) setActiveIndex(1);
    else setActiveIndex(2);
  });

  // Crossfade opacities for the sticky text and visuals based on scroll progress
  const op1 = useTransform(scrollYProgress, [0, 0.3, 0.4], [1, 1, 0]);
  const op2 = useTransform(scrollYProgress, [0.2, 0.3, 0.4, 0.6, 0.7], [0, 0, 1, 1, 0]);
  const op3 = useTransform(scrollYProgress, [0.5, 0.6, 0.7, 1], [0, 0, 1, 1]);

  return (
    <section id="features" className="relative w-full bg-navy pb-[10vh]">
      <div className="pt-32 pb-16 px-6 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          The Ultimate Financial OS
        </motion.div>

        <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
          Manage your money, <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-300">without the anxiety.</span>
        </h2>

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

      <div ref={carouselRef} className="w-full relative h-[300vh] mt-4 md:mt-12">
        <div className="sticky top-0 w-full h-[100dvh] md:h-screen flex items-center justify-center overflow-hidden">
          <div className="max-w-7xl w-full mx-auto px-6 flex flex-col md:flex-row items-center justify-center md:gap-12 relative">

            {/* Left/Top side: Text segments (Hidden on Mobile, now handled by drawer) */}
            <div className="hidden md:flex flex-1 w-full relative h-[50vh] items-center pt-0">
              {featureItems.map((f, i) => (
                <motion.div
                  key={i}
                  style={{ opacity: i === 0 ? op1 : i === 1 ? op2 : op3 }}
                  className="absolute inset-0 flex flex-col justify-center items-start text-left text-white pointer-events-none"
                >
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 border border-white/10 shadow-lg backdrop-blur-sm">
                    <f.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-4xl lg:text-5xl font-bold mb-6 tracking-tight leading-[1.1]">{f.title}</h3>
                  <p className="text-lg lg:text-2xl text-slate-400 leading-relaxed max-w-xl">{f.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Right/Bottom side: Mockup */}
            <div className="flex-none md:flex-1 w-full flex items-center justify-center relative h-[70vh] md:h-[75vh]">
              <div className="scale-[0.95] md:scale-100 origin-center transition-transform">
                <AndroidMockup
                  activeFeature={featureItems[activeIndex]}
                  isDrawerOpen={isDrawerOpen}
                  setIsDrawerOpen={setIsDrawerOpen}
                >
                  <motion.div style={{ opacity: op1 }} className="absolute inset-0 pointer-events-none">
                    <SplitsUi />
                  </motion.div>
                  <motion.div style={{ opacity: op2 }} className="absolute inset-0 pointer-events-none">
                    <SubscriptionsUi />
                  </motion.div>
                  <motion.div style={{ opacity: op3 }} className="absolute inset-0 pointer-events-none">
                    <TransactionsUi />
                  </motion.div>
                </AndroidMockup>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

const AndroidMockup = ({
  children,
  activeFeature,
  isDrawerOpen,
  setIsDrawerOpen
}: {
  children: React.ReactNode;
  activeFeature?: typeof featureItems[0];
  isDrawerOpen?: boolean;
  setIsDrawerOpen?: (v: boolean) => void;
}) => {
  return (
    <div className="relative w-[320px] h-[650px] shrink-0 transform-gpu z-10">

      {/* Info Ribbon (Mobile Only) */}
      {activeFeature && (
        <button
          onClick={() => setIsDrawerOpen?.(!isDrawerOpen)}
          className="absolute md:hidden top-[72%] right-[-28px] w-[30px] h-[90px] bg-primary text-navy hover:bg-emerald-400 font-bold text-[11px] rounded-r-xl shadow-[5px_0_15px_rgba(16,185,129,0.25)] z-0 transition-all active:scale-95 flex items-center justify-center p-1 border-y border-r border-emerald-400/80"
        >
          <span className="[writing-mode:vertical-lr] rotate-180 tracking-[0.25em] uppercase">Info</span>
        </button>
      )}

      {/* The Phone Hardware Casing */}
      <div className="absolute inset-0 bg-navy rounded-[3rem] border-[10px] border-[#151b23] z-10 overflow-hidden shadow-2xl flex flex-col">
        {/* Punchhole Camera Area */}
        <div className="absolute top-3 inset-x-0 h-4 flex justify-center z-50 pointer-events-none">
          <div className="w-4 h-4 rounded-full bg-slate-900 border border-black/50 shadow-inner flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-900/40"></div>
          </div>
        </div>

        {/* Status bar */}
        <div className="h-10 w-full flex justify-between items-center px-6 text-[11px] text-white/90 absolute top-0 z-40 font-bold pointer-events-none bg-gradient-to-b from-navy/80 to-transparent backdrop-blur-[2px]">
          <span className="mt-1 tracking-wider">9:41</span>
          <div className="flex items-center gap-1.5 mt-1">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M2 22h20V2z" /></svg>
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"></path><path d="M1.42 9a16 16 0 0 1 21.16 0"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line></svg>
            <svg className="w-5 h-5 ml-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="16" height="10" rx="2" ry="2" /><line x1="22" y1="11" x2="22" y2="13" /></svg>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 w-full relative z-10 bg-navy">
          {children}
        </div>

        {/* Drawer for Info (Notification Center Style) */}
        <AnimatePresence>
          {isDrawerOpen && activeFeature && (
            <motion.div
              initial={{ y: '-100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '-100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute inset-x-0 top-0 bottom-0 z-50 bg-navy/40 backdrop-blur-md flex flex-col justify-start pt-14 px-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            >
              <div className="bg-navy-light/95 border border-white/10 rounded-[1.5rem] p-5 shadow-2xl relative">
                <div className="flex items-center gap-3.5 mb-4 pr-2">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 shadow-inner shrink-0">
                    <activeFeature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-[17px] leading-tight tracking-tight">{activeFeature.title}</h4>
                    <p className="text-primary text-[10px] font-bold uppercase tracking-widest mt-1">Feature Info</p>
                  </div>
                </div>
                <div className="w-full h-px bg-gradient-to-r from-white/10 to-transparent mb-4" />
                <p className="text-[13px] text-slate-300 leading-relaxed font-medium">
                  {activeFeature.desc}
                </p>
              </div>

              {/* Close Button at Drawer Bottom */}
              <div className="flex-1 flex flex-col items-center justify-end pb-12">
                <button
                  onClick={() => setIsDrawerOpen?.(false)}
                  className="w-14 h-14 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full text-white shadow-[0_10px_25px_rgba(0,0,0,0.3)] backdrop-blur-md transition-all active:scale-95 border border-white/20"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

const SplitsUi = () => {
  return (
    <div className="pt-12 px-4 pb-5 h-full flex flex-col font-sans bg-gradient-to-b from-navy to-navy-light relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-50px] right-[-50px] w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col items-center pb-6 border-b border-white/5 relative z-10">
        <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 mb-3 flex items-center justify-center border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.15)] text-3xl">🌴</div>
        <h2 className="text-white font-bold text-2xl mb-1 tracking-tight">Goa Trip</h2>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20 mt-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <p className="text-emerald-400 text-[10px] font-bold uppercase tracking-wider">You are owed ₹1,400</p>
        </div>
      </div>

      {/* Balances List */}
      <div className="space-y-3 mt-4 flex-1 overflow-y-auto pr-1 relative z-10 scrollbar-hide">
        <div className="bg-white/[0.03] p-4 rounded-3xl border border-white/5 flex items-center justify-between backdrop-blur-md shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-900/40 text-emerald-400 flex items-center justify-center font-bold text-lg border border-emerald-500/20">R</div>
            <div>
              <div className="text-white text-[15px] font-semibold">Rahul</div>
              <div className="text-slate-400 text-xs mt-0.5">Drinks & Cabs</div>
            </div>
          </div>
          <div className="text-emerald-400 font-bold text-lg">₹850</div>
        </div>

        <div className="bg-white/[0.03] p-4 rounded-3xl border border-white/5 flex items-center justify-between backdrop-blur-md shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-900/40 text-blue-400 flex items-center justify-center font-bold text-lg border border-blue-500/20">A</div>
            <div>
              <div className="text-white text-[15px] font-semibold">Anjali</div>
              <div className="text-slate-400 text-xs mt-0.5">Airbnb</div>
            </div>
          </div>
          <div className="text-blue-400 font-bold text-lg">₹550</div>
        </div>

        <div className="bg-white/[0.01] p-4 rounded-3xl border border-white/5 flex items-center justify-between opacity-50 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/5 text-white/50 flex items-center justify-center font-bold text-lg border border-white/10">P</div>
            <div>
              <div className="text-white/70 text-[15px] font-semibold line-through">Priya</div>
              <div className="text-slate-500 text-xs mt-0.5">Settled</div>
            </div>
          </div>
          <div className="text-slate-500 font-bold text-lg line-through">₹1,200</div>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="pt-2 relative z-10 pb-2">
        <div className="w-full py-4 bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-2xl text-navy font-bold text-[15px] text-center shadow-[0_10px_25px_rgba(16,185,129,0.3)]">
          Remind All
        </div>
      </div>
    </div>
  )
}

const SubscriptionsUi = () => {
  return (
    <div className="pt-12 px-4 pb-5 h-full flex flex-col font-sans relative overflow-hidden bg-navy">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header / Circular Progress */}
      <div className="flex flex-col items-center justify-center pb-6 border-b border-white/5 relative z-10">
        <div className="relative w-40 h-40 flex items-center justify-center mt-2">
          {/* Background ring */}
          <svg className="absolute inset-0 w-full h-full transform -rotate-90 drop-shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            <circle cx="80" cy="80" r="70" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="12" />
            <circle cx="80" cy="80" r="70" fill="none" stroke="#10b981" strokeWidth="12" strokeDasharray="440" strokeDashoffset="120" strokeLinecap="round" />
          </svg>
          <div className="text-center mt-2">
            <div className="text-slate-400 text-[11px] font-bold uppercase tracking-widest mb-1">Monthly</div>
            <div className="text-white font-bold text-3xl tracking-tight leading-none bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">₹2,840</div>
          </div>
        </div>
      </div>

      {/* Subscriptions List */}
      <div className="space-y-3 mt-4 flex-1 overflow-y-auto pr-1 relative z-10 scrollbar-hide">
        <div className="bg-white/[0.03] p-4 rounded-3xl border border-primary/40 flex items-center justify-between relative overflow-hidden shadow-[0_5px_20px_rgba(16,185,129,0.1)]">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary shadow-[0_0_10px_#10b981]"></div>
          <div className="flex items-center gap-4 pl-1">
            <div className="w-12 h-12 rounded-2xl bg-[#E50914]/10 text-[#E50914] flex items-center justify-center font-bold text-lg border border-[#E50914]/20 shadow-inner">N</div>
            <div>
              <div className="text-white text-[15px] font-semibold">Netflix</div>
              <div className="text-primary text-[10px] font-bold px-2 py-0.5 rounded-md bg-primary/10 mt-1 inline-flex items-center gap-1.5 border border-primary/20">
                <span className="w-1 h-1 rounded-full bg-primary animate-pulse" />
                3 Days Left
              </div>
            </div>
          </div>
          <div className="text-white font-bold text-lg">₹649</div>
        </div>

        <div className="bg-white/[0.03] p-4 rounded-3xl border border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-4 pl-1">
            <div className="w-12 h-12 rounded-2xl bg-[#1DB954]/10 text-[#1DB954] flex items-center justify-center font-bold text-lg border border-[#1DB954]/20">S</div>
            <div>
              <div className="text-white text-[15px] font-semibold">Spotify</div>
              <div className="text-slate-400 text-xs mt-0.5">Renews in 12 Days</div>
            </div>
          </div>
          <div className="text-white font-bold text-lg">₹119</div>
        </div>

        <div className="bg-white/[0.03] p-4 rounded-3xl border border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-4 pl-1">
            <div className="w-12 h-12 rounded-2xl bg-[#00A8E1]/10 text-[#00A8E1] flex items-center justify-center font-bold text-lg border border-[#00A8E1]/20">P</div>
            <div>
              <div className="text-white text-[15px] font-semibold">Prime Video</div>
              <div className="text-slate-400 text-xs mt-0.5">Renews next month</div>
            </div>
          </div>
          <div className="text-white font-bold text-lg">₹299</div>
        </div>
      </div>
    </div>
  )
}

const TransactionsUi = () => {
  return (
    <div className="pt-12 px-4 pb-5 h-full flex flex-col relative overflow-hidden font-sans bg-navy">
      {/* Background Decor */}
      <div className="absolute -left-10 -top-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -right-10 top-20 w-40 h-40 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="pb-5 border-b border-white/5 relative z-10">
        <h2 className="text-white font-bold text-2xl mb-4 tracking-tight px-1 text-center">Recent Logs</h2>
        <div className="flex gap-2">
          <span className="px-4 py-2 flex-1 text-center text-[13px] rounded-xl bg-primary/10 text-primary font-bold border border-primary/20 shadow-inner">All</span>
          <span className="px-4 py-2 flex-1 text-center text-[13px] rounded-xl bg-white/[0.03] text-slate-400 font-semibold border border-white/5">Auto</span>
          <span className="px-4 py-2 flex-1 text-center text-[13px] rounded-xl bg-white/[0.03] text-slate-400 font-semibold border border-white/5">Manual</span>
        </div>
      </div>

      {/* Transaction List */}
      <div className="space-y-5 pt-4 flex-1 overflow-y-auto pr-1 relative z-10 scrollbar-hide">
        {/* Date Group */}
        <div>
          <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-3 pl-2">Today</div>
          <div className="space-y-3">
            <div className="bg-white/[0.03] p-3.5 rounded-3xl border border-white/5 flex items-center justify-between backdrop-blur-sm">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-xl shadow-inner">🍔</div>
                <div>
                  <div className="text-white text-[15px] font-semibold">Burger King</div>
                  <div className="text-slate-400 text-xs mt-0.5">Food & Dining</div>
                </div>
              </div>
              <div className="text-white font-bold text-[16px] tracking-tight">-₹350</div>
            </div>

            <div className="bg-white/[0.03] p-3.5 rounded-3xl border border-white/5 flex items-center justify-between backdrop-blur-sm">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-xl shadow-inner">🚙</div>
                <div>
                  <div className="text-white text-[15px] font-semibold">Uber Rides</div>
                  <div className="text-slate-400 text-xs mt-0.5">Transport</div>
                </div>
              </div>
              <div className="text-white font-bold text-[16px] tracking-tight">-₹420</div>
            </div>
          </div>
        </div>

        {/* Date Group */}
        <div>
          <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-3 pl-2">Yesterday</div>
          <div className="space-y-3">
            <div className="bg-white/[0.03] p-3.5 rounded-3xl border border-emerald-500/10 flex items-center justify-between backdrop-blur-sm relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500/50"></div>
              <div className="flex items-center gap-3.5 pl-1">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-xl shadow-inner">💰</div>
                <div>
                  <div className="text-white text-[15px] font-semibold">Salary</div>
                  <div className="text-emerald-400 text-[10px] font-bold px-1.5 py-[1px] rounded bg-emerald-400/10 mt-0.5 inline-block">INCOME</div>
                </div>
              </div>
              <div className="text-emerald-400 font-bold text-[16px] tracking-tight">+₹85,000</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Add Button */}
      <div className="absolute bottom-6 right-5 z-20">
        <div className="w-14 h-14 bg-gradient-to-tr from-emerald-500 to-emerald-400 rounded-[1.25rem] flex items-center justify-center shadow-[0_8px_25px_rgba(16,185,129,0.4)] text-navy">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        </div>
      </div>
    </div>
  )
}
