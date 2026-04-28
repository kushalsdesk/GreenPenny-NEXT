export default function Testimonials() {
  const reviews = [
    {
      body: "GreenPenny completely changed how I look at my spending. For the first time, I actually understand where my money is going without managing complex spreadsheets.",
      author: "Sarah L.",
      role: "Freelance Designer",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      body: "The insights provided by the AI categorization are shockingly accurate. It correctly tagged my obscure local coffee shops and gym memberships instantly.",
      author: "James T.",
      role: "Software Engineer",
      avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      body: "I've tried every budgeting app on the market. GreenPenny's interface is by far the cleanest and fastest. The multi-currency support is a game changer for my travels.",
      author: "Elena R.",
      role: "Digital Nomad",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    }
  ];

  return (
    <section id="testimonials" className="py-24 px-6 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-4xl md:text-5xl font-bold text-white mb-16 tracking-tight">Loved by modern professionals.</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <div key={i} className="bg-navy border border-white/5 rounded-[2rem] p-8 relative hover:border-primary/30 transition-colors group">
              <div className="absolute top-8 right-8 text-primary/10 group-hover:text-primary/20 transition-colors text-6xl font-serif">"</div>
              <p className="text-slate-300 leading-relaxed mb-8 relative z-10">{review.body}</p>
              <div className="flex items-center gap-4">
                <img src={review.avatar} alt={review.author} className="w-12 h-12 rounded-full border border-white/10" />
                <div>
                  <h4 className="text-white font-bold">{review.author}</h4>
                  <p className="text-xs text-slate-500">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
