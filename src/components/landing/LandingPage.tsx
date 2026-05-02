"use client";
import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import LandingNavbar from './LandingNavbar';
import Hero from './sections/Hero';
import Why from './sections/Why';
import FeatureCarousel from './FeatureCarousel';
import Testimonials from './sections/Testimonials';
import FinanceNews from './sections/FinanceNews';
import Footer from './sections/Footer';
import AuthComponent from '../auth/AuthComponent';
import { useAuthStore } from '@/src/stores/authStore';

function LandingPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { checkSession, isAuthenticated, setShowLogin } = useAuthStore();

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (searchParams.get('auth') === 'failed' || searchParams.get('login') === 'true') {
      setShowLogin(true);
    }
  }, [searchParams, setShowLogin]);

  return (
    <>
      <LandingNavbar />

      <main>
        <Hero />
        <FinanceNews />
        <FeatureCarousel />
        <Why />
        <Testimonials />
      </main>

      <Footer />
      <AuthComponent />
    </>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-navy text-slate-200 selection:bg-primary/30 selection:text-white font-sans">
      <Suspense fallback={<div className="min-h-screen bg-navy" />}>
        <LandingPageContent />
      </Suspense>
    </div>
  );
}
