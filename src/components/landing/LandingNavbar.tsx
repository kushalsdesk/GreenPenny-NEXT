"use client";

import { useRouter } from 'next/navigation';
import { useAuthStore } from '../../stores/authStore';

export default function LandingNavbar() {
  const router = useRouter();
  const setToken = useAuthStore((state) => state.setToken);

  const handleSignIn = () => {
    setToken('mock-jwt-token'); // Simple mock auth for now
    router.push('/dashboard');
  };

  return (
    <div className="fixed top-6 left-0 right-0 z-50 px-6 max-w-7xl mx-auto flex items-center justify-between pointer-events-none">
      {/* Logo Island */}
      <div className="pointer-events-auto flex items-center gap-3 bg-navy-light/80 backdrop-blur-xl border border-white/10 rounded-full pl-2 pr-5 py-2 shadow-2xl">
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
          <div className="w-3 h-3 bg-navy rounded-sm"></div>
        </div>
        <span className="font-bold text-lg tracking-tight text-white hidden sm:block">GreenPenny</span>
      </div>

      {/* CTA Island */}
      <div className="pointer-events-auto flex items-center bg-navy-light/80 backdrop-blur-xl border border-white/10 rounded-full p-1.5 shadow-2xl">
        <button
          onClick={handleSignIn}
          className="px-6 py-2.5 text-sm font-bold bg-primary text-navy rounded-full hover:bg-primary-dark transition-colors"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
