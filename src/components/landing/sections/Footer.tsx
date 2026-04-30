import { Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-navy border-t border-white/5 py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-navy font-bold text-xl">G</span>
            </div>
            <span className="font-semibold text-xl tracking-tight text-white">GreenPenny</span>
          </div>
          <p className="text-slate-400 max-w-md leading-relaxed text-sm">
            We believe financial clarity shouldn't require handing over your bank credentials. Track splits, subscriptions, and spends — privately.
          </p>
          <div className="flex items-center gap-4 mt-6">
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-primary transition-colors">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-primary transition-colors">
              <Github className="w-4 h-4" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-primary transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-xs">Product</h4>
          <ul className="space-y-4 text-sm text-slate-400">
            <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">How It Works</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Changelog</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-xs">Legal</h4>
          <ul className="space-y-4 text-sm text-slate-400">
            <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Cookie Policy</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono text-center md:text-left">
        <p>© 2026 GreenPenny, Inc. All rights reserved.</p>
        <p>Values provided for illustrative purposes only.</p>
      </div>
    </footer>
  );
}
