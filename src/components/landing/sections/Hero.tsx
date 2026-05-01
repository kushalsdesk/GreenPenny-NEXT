"use client";
import FloatingCard from '../FloatingCard';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-12 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-center relative z-10">
        <div className="relative w-full flex justify-center items-center">
          <FloatingCard />
        </div>
      </div>
    </section>
  );
}
