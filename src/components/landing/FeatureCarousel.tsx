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
          <AndroidMockup>
            <motion.div style={{ opacity: op1 }} className="absolute inset-0 bg-navy">
              <SplitsUi />
            </motion.div>
            <motion.div style={{ opacity: op2 }} className="absolute inset-0 bg-navy">
              <SubscriptionsUi />
            </motion.div>
            <motion.div style={{ opacity: op3 }} className="absolute inset-0 bg-navy">
              <TransactionsUi />
            </motion.div>
          </AndroidMockup>
        </div>
      </div>
    </section>
  );
}

const AndroidMockup = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative w-[320px] h-[650px] bg-navy rounded-[3rem] border-[10px] border-[#151b23] shadow-[0_0_50px_-15px_rgba(16,185,129,0.3)] overflow-hidden shrink-0 transform-gpu">
      {/* Top Notch / Camera Area */}
      <div className="absolute top-0 inset-x-0 h-7 flex justify-center z-50">
        <div className="w-20 h-6 bg-[#151b23] rounded-b-2xl flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-900 shadow-inner flex items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-blue-900/40"></div>
          </div>
        </div>
      </div>

      {/* Inner Screen */}
      <div className="relative w-full h-full bg-navy flex flex-col z-0">
        {/* Status bar */}
        <div className="h-7 w-full flex justify-between items-center px-6 text-[11px] text-white/50 absolute top-0 z-10 bg-gradient-to-b from-black/60 to-transparent font-medium">
          <span>9:41</span>
          <div className="flex items-center gap-1.5 opacity-80">
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 2 2 22 22 22 22 2" /></svg>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="10" rx="2" ry="2" /><path d="M22 11v2" /></svg>
          </div>
        </div>

        {/* Content Area */}
        <div className="mt-8 mb-12 flex-1 w-full relative">
          {children}
        </div>

        {/* Layout Navigation Bar (Android style pill) */}
        <div className="h-10 w-full bg-navy-light/80 backdrop-blur-md absolute bottom-0 z-50 flex justify-center items-center pb-2">
          <div className="w-1/3 h-1.5 bg-white/20 rounded-full"></div>
        </div>
      </div>
    </div>
  )
}

const SplitsUi = () => {
  return (
    <div className="p-5 h-full flex flex-col gap-4 font-sans pattern-grid-lg text-white">
      {/* Header */}
      <div className="text-center pb-4 border-b border-white/5 pt-2">
        <h2 className="text-white font-bold text-xl mb-1 tracking-tight">Goa Trip 🌴</h2>
        <p className="text-primary text-sm font-medium">You are owed ₹1,400</p>
      </div>

      {/* Balances List */}
      <div className="space-y-3 mt-2 flex-1 overflow-y-auto pr-1">
        <div className="bg-navy-light/60 p-4 rounded-2xl border border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">R</div>
            <div>
              <div className="text-white text-sm font-medium">Rahul owes you</div>
              <div className="text-slate-400 text-xs mt-0.5">For "Drinks & Cabs"</div>
            </div>
          </div>
          <div className="text-primary font-bold">₹850</div>
        </div>

        <div className="bg-navy-light/60 p-4 rounded-2xl border border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-sm">A</div>
            <div>
              <div className="text-white text-sm font-medium">Anjali owes you</div>
              <div className="text-slate-400 text-xs mt-0.5">For "Airbnb"</div>
            </div>
          </div>
          <div className="text-primary font-bold">₹550</div>
        </div>

        <div className="bg-navy-light/60 p-4 rounded-2xl border border-white/5 flex items-center justify-between opacity-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-sm">P</div>
            <div>
              <div className="text-white text-sm font-medium line-through">Priya paid you</div>
              <div className="text-slate-400 text-xs mt-0.5">Settled just now</div>
            </div>
          </div>
          <div className="text-slate-500 font-bold line-through">₹1,200</div>
        </div>
      </div>

      {/* Floating Action Button area */}
      <div className="pt-2">
        <button className="w-full py-3.5 bg-primary rounded-xl text-navy font-bold shadow-[0_0_20px_rgba(16,185,129,0.3)]">
          Send Reminders
        </button>
      </div>
    </div>
  )
}

const SubscriptionsUi = () => {
  return (
    <div className="p-5 h-full flex flex-col gap-4 font-sans">
      {/* Circular Progress / Header */}
      <div className="flex flex-col items-center justify-center pb-6 border-b border-white/5 pt-4">
        <div className="relative w-32 h-32 flex items-center justify-center">
          {/* Fake progress ring */}
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="64" cy="64" r="56" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
            <circle cx="64" cy="64" r="56" fill="none" stroke="#10b981" strokeWidth="8" strokeDasharray="351" strokeDashoffset="140" strokeLinecap="round" />
          </svg>
          <div className="absolute text-center">
            <div className="text-slate-400 text-[10px] font-medium uppercase tracking-wider mb-1">Monthly</div>
            <div className="text-white font-bold text-2xl tracking-tight">₹2,840</div>
          </div>
        </div>
      </div>

      {/* Subscriptions List */}
      <div className="space-y-3 mt-2 flex-1 overflow-y-auto pr-1">
        <div className="bg-navy-light/60 p-4 rounded-2xl border border-primary/30 flex items-center justify-between relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E50914]/20 text-[#E50914] flex items-center justify-center font-bold text-sm">N</div>
            <div>
              <div className="text-white text-sm font-medium">Netflix</div>
              <div className="text-primary text-[10px] font-bold px-1.5 py-0.5 rounded bg-primary/10 mt-1 inline-block border border-primary/20">Renews in 3 Days</div>
            </div>
          </div>
          <div className="text-white font-bold">₹649</div>
        </div>

        <div className="bg-navy-light/60 p-4 rounded-2xl border border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1DB954]/20 text-[#1DB954] flex items-center justify-center font-bold text-sm">S</div>
            <div>
              <div className="text-white text-sm font-medium">Spotify</div>
              <div className="text-slate-400 text-xs mt-0.5">Renews in 12 Days</div>
            </div>
          </div>
          <div className="text-white font-bold">₹119</div>
        </div>

        <div className="bg-navy-light/60 p-4 rounded-2xl border border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#00A8E1]/20 text-[#00A8E1] flex items-center justify-center font-bold text-sm">P</div>
            <div>
              <div className="text-white text-sm font-medium">Prime Video</div>
              <div className="text-slate-400 text-xs mt-0.5">Renews next month</div>
            </div>
          </div>
          <div className="text-white font-bold">₹299</div>
        </div>
      </div>
    </div>
  )
}

const TransactionsUi = () => {
  return (
    <div className="p-5 h-full flex flex-col gap-4 font-sans">
      {/* Header */}
      <div className="pb-4 border-b border-white/5 pt-2">
        <h2 className="text-white font-bold text-xl mb-3 tracking-tight">Recent Logs</h2>
        <div className="flex gap-2">
          <span className="px-3 py-1.5 text-xs rounded-lg bg-primary/20 text-primary font-medium border border-primary/20">All</span>
          <span className="px-3 py-1.5 text-xs rounded-lg bg-white/5 text-slate-400 font-medium">Income</span>
          <span className="px-3 py-1.5 text-xs rounded-lg bg-white/5 text-slate-400 font-medium">Expense</span>
        </div>
      </div>

      {/* Transaction List */}
      <div className="space-y-4 flex-1 overflow-y-auto pr-1">
        {/* Date Group */}
        <div>
          <div className="text-xs text-slate-500 font-medium mb-2 pl-1">Today</div>
          <div className="space-y-2.5">
            <div className="bg-navy-light/60 p-3.5 rounded-2xl border border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center text-lg">🍔</div>
                <div>
                  <div className="text-white text-sm font-medium">Burger King</div>
                  <div className="text-slate-400 text-xs mt-0.5">Food & Dining</div>
                </div>
              </div>
              <div className="text-white font-bold">-₹350</div>
            </div>

            <div className="bg-navy-light/60 p-3.5 rounded-2xl border border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-lg">🚙</div>
                <div>
                  <div className="text-white text-sm font-medium">Uber</div>
                  <div className="text-slate-400 text-xs mt-0.5">Transport</div>
                </div>
              </div>
              <div className="text-white font-bold">-₹420</div>
            </div>
          </div>
        </div>

        {/* Date Group */}
        <div>
          <div className="text-xs text-slate-500 font-medium mb-2 pl-1">Yesterday</div>
          <div className="space-y-2.5">
            <div className="bg-navy-light/60 p-3.5 rounded-2xl border border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-lg">💰</div>
                <div>
                  <div className="text-white text-sm font-medium">Salary</div>
                  <div className="text-slate-400 text-xs mt-0.5">Income</div>
                </div>
              </div>
              <div className="text-primary font-bold">+₹85,000</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Add Button */}
      <div className="absolute bottom-6 right-5 shadow-2xl">
        <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.4)] text-navy">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        </div>
      </div>
    </div>
  )
}

