export default function Testimonials() {
  const reviews = [
    {
      body: "I had Notion, Figma, Linear, Copilot, and two streaming services running simultaneously. GreenPenny showed me I was spending ₹5,400/month on subscriptions I'd forgotten to audit.",
      author: "Rohan M.",
      role: "Software Engineer, Bangalore",
      avatar: "https://ui-avatars.com/api/?name=Rohan+M&background=1C2D42&color=10B981&size=256"
    },
    {
      body: "Three flatmates, shared rent, groceries, electricity every month. Splitwise felt like overkill. This is exactly the right size — clean, no noise, just who owes what.",
      author: "Priya S.",
      role: "Product Designer, Mumbai",
      avatar: "https://ui-avatars.com/api/?name=Priya+S&background=1C2D42&color=10B981&size=256"
    },
    {
      body: "Got the renewal reminder for my Adobe subscription 3 days before it hit. Cancelled it. That one email saved me ₹4,500. The app paid for itself before I even paid for it.",
      author: "Arjun K.",
      role: "Freelance Consultant, Delhi",
      avatar: "https://ui-avatars.com/api/?name=Arjun+K&background=1C2D42&color=10B981&size=256"
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
