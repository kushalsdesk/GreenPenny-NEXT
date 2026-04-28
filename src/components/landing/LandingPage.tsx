"use client";
import { useState } from 'react';
import LandingNavbar from './LandingNavbar';
import Hero from './sections/Hero';
import Why from './sections/Why';
import FeatureCarousel from './FeatureCarousel';
import Testimonials from './sections/Testimonials';
import FinanceNews from './sections/FinanceNews';
import Footer from './sections/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-navy text-slate-200 selection:bg-primary/30 selection:text-white font-sans">
      <LandingNavbar />
      
      <main>
        <Hero />
        <FeatureCarousel />
        <Why />
        <Testimonials />
        <FinanceNews />
      </main>

      <Footer />
    </div>
  );
}
