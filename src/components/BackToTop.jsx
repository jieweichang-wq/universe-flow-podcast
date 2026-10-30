import React, { useState, useEffect } from 'react';
import { ArrowUp, Sparkles } from 'lucide-react';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-24 right-5 sm:right-8 z-40 p-3 rounded-full bg-[#0d1222]/90 hover:bg-[#151c36] border border-purple-500/40 hover:border-sky-400 text-sky-300 hover:text-white shadow-xl shadow-purple-950/50 backdrop-blur-md group hover:scale-110 active:scale-95 transition-all duration-300 animate-in fade-in"
      title="回到頂部"
      aria-label="回到頂部"
    >
      <div className="relative">
        <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
        <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-sky-400 animate-ping opacity-75" />
      </div>
    </button>
  );
}
