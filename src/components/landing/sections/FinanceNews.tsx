export default function FinanceNews() {
  return (
    <section className="py-24 px-6 relative flex justify-center">
      <div className="w-full max-w-5xl rounded-full bg-white/5 border border-white/10 backdrop-blur-md overflow-hidden py-4 px-6 flex items-center shadow-2xl">
        <div className="flex items-center gap-12 whitespace-nowrap animate-[scroll_30s_linear_infinite]">
          {/* We duplicate the content to make the marquee seamless */}
          {[...Array(2)].map((_, idx) => (
            <div key={idx} className="flex items-center gap-12">
              <span className="font-mono font-bold tracking-widest text-sm flex items-center gap-2 text-white">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" /> S&P 500 +1.2%
              </span>
              <span className="font-mono font-bold tracking-widest text-sm text-slate-600">/</span>
              <span className="font-mono font-bold tracking-widest text-sm flex items-center gap-2 text-white">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" /> NASDAQ +2.4%
              </span>
              <span className="font-mono font-bold tracking-widest text-sm text-slate-600">/</span>
              <span className="font-mono font-bold tracking-widest text-sm text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" /> DOW -0.5%
              </span>
              <span className="font-mono font-bold tracking-widest text-sm text-slate-600">/</span>
              <span className="font-mono font-bold tracking-widest text-sm flex items-center gap-2 text-white">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" /> BTC +4.8%
              </span>
              <span className="font-mono font-bold tracking-widest text-sm text-slate-600">/</span>
              <span className="font-mono font-bold tracking-widest text-sm flex items-center gap-2 text-white">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" /> ETH +6.1%
              </span>
              <span className="font-mono font-bold tracking-widest text-sm text-slate-600">/</span>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
