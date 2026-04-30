export default function FinanceNews() {
  return (
    <section className="py-24 px-6 relative flex justify-center">
      <div className="w-full max-w-5xl rounded-full bg-white/5 border border-white/10 backdrop-blur-md overflow-hidden py-4 px-6 flex items-center shadow-2xl">
        <div className="flex items-center gap-12 whitespace-nowrap animate-[scroll_30s_linear_infinite]">
          {/* We duplicate the content to make the marquee seamless */}
          {[...Array(2)].map((_, idx) => (
            <div key={idx} className="flex items-center gap-12">
              <span className="font-mono font-bold tracking-widest text-sm flex items-center gap-2 text-white">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" /> Urban professionals average ₹4,800/month on subscriptions
              </span>
              <span className="font-mono font-bold tracking-widest text-sm text-slate-600">/</span>
              <span className="font-mono font-bold tracking-widest text-sm flex items-center gap-2 text-white">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" /> Most users find 2+ forgotten subscriptions in week one
              </span>
              <span className="font-mono font-bold tracking-widest text-sm text-slate-600">/</span>
              <span className="font-mono font-bold tracking-widest text-sm text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" /> Debt simplification cuts settlement steps by up to 60%
              </span>
              <span className="font-mono font-bold tracking-widest text-sm text-slate-600">/</span>
              <span className="font-mono font-bold tracking-widest text-sm flex items-center gap-2 text-white">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" /> 3-day renewal alerts prevent most surprise charges
              </span>
              <span className="font-mono font-bold tracking-widest text-sm text-slate-600">/</span>
              <span className="font-mono font-bold tracking-widest text-sm flex items-center gap-2 text-white">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" /> Average 6 active subscriptions per Indian urban user
              </span>
              <span className="font-mono font-bold tracking-widest text-sm text-slate-600">/</span>
              <span className="font-mono font-bold tracking-widest text-sm flex items-center gap-2 text-white">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" /> Manual tracking increases spend awareness by 40%
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
