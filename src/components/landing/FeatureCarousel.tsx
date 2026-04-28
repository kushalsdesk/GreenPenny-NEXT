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
         <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">Everything you need, <br className="hidden md:block"/><span className="text-primary">nothing you don't.</span></h2>
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
         <div className="hidden md:flex flex-1 sticky top-32 h-[75vh] bg-navy-light/50 border border-white/5 rounded-[3rem] items-center justify-center overflow-hidden">
            <motion.div style={{ opacity: op1 }} className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-transparent">
               <ArrowLeftRight className="w-48 h-48 text-primary/80" />
            </motion.div>
            <motion.div style={{ opacity: op2 }} className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-500/10 to-transparent">
               <CreditCard className="w-48 h-48 text-blue-400/80" />
            </motion.div>
            <motion.div style={{ opacity: op3 }} className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gold/10 to-transparent">
               <PieChart className="w-48 h-48 text-gold/80 hover:scale-105 transition-transform duration-700" />
            </motion.div>
         </div>
      </div>
    </section>
  );
}
