import { ShieldCheck, LineChart, Zap, LayoutDashboard } from 'lucide-react';

const features = [
  {
    title: 'Bank Grade Security',
    description: 'Your data is encrypted with AES-256 and never sold to third parties. Read-only access ensures nobody can move your money.',
    icon: ShieldCheck,
  },
  {
    title: 'Real-Time Sync',
    description: 'Connect instantly with over 12,000 financial institutions worldwide via Plaid. Balances and transactions update automatically.',
    icon: Zap,
  },
  {
    title: 'Smart Categorization',
    description: 'Our ML models automatically categorize your spending with 98% accuracy, so you can see where your money goes without the manual work.',
    icon: LayoutDashboard,
  },
  {
    title: 'Proactive Insights',
    description: 'Get notified about upcoming bills, subscription price hikes, and personalized recommendations to improve your financial health.',
    icon: LineChart,
  },
];

export default function Why() {
  return (
    <section id="why" className="py-24 px-6 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">Why GreenPenny?</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">Designed for clarity, built for security. We give you the tools to understand your finances in seconds.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
          {/* Bento Item 1: Large Feature */}
          <div className="bg-navy border border-white/5 p-8 rounded-3xl hover:border-primary/30 transition-colors group md:col-span-2 row-span-2 flex flex-col justify-end relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <ShieldCheck className="w-48 h-48 text-primary" />
            </div>
            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors relative z-10">
              <ShieldCheck className="w-7 h-7 text-slate-300 group-hover:text-primary transition-colors" />
            </div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-white mb-3">{features[0].title}</h3>
              <p className="text-slate-400 leading-relaxed max-w-md">{features[0].description}</p>
            </div>
          </div>

          {/* Bento Item 2: Medium Feature */}
          <div className="bg-navy border border-white/5 p-8 rounded-3xl hover:border-primary/30 transition-colors group md:col-span-1 row-span-1 flex flex-col justify-end relative overflow-hidden">
             <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
              <Zap className="w-32 h-32 text-primary" />
            </div>
            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors relative z-10">
              <Zap className="w-6 h-6 text-slate-300 group-hover:text-primary transition-colors" />
            </div>
            <div className="relative z-10">
              <h3 className="text-lg font-bold text-white mb-2">{features[1].title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{features[1].description}</p>
            </div>
          </div>

          {/* Bento Item 3: Medium Feature */}
          <div className="bg-navy border border-white/5 p-8 rounded-3xl hover:border-primary/30 transition-colors group md:col-span-1 row-span-1 flex flex-col justify-end relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
              <LayoutDashboard className="w-32 h-32 text-primary" />
            </div>
            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors relative z-10">
              <LayoutDashboard className="w-6 h-6 text-slate-300 group-hover:text-primary transition-colors" />
            </div>
            <div className="relative z-10">
              <h3 className="text-lg font-bold text-white mb-2">{features[2].title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{features[2].description}</p>
            </div>
          </div>
          
           {/* Bento Item 4: Wide Feature */}
           <div className="bg-navy border border-white/5 p-8 rounded-3xl hover:border-primary/30 transition-colors group md:col-span-3 row-span-1 flex flex-col md:flex-row items-start md:items-center justify-between relative overflow-hidden gap-8">
            <div className="absolute right-0 bottom-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
              <LineChart className="w-64 h-64 text-primary" />
            </div>
            <div className="relative z-10 max-w-xl">
               <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
                <LineChart className="w-6 h-6 text-slate-300 group-hover:text-primary transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{features[3].title}</h3>
              <p className="text-slate-400 leading-relaxed">{features[3].description}</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
