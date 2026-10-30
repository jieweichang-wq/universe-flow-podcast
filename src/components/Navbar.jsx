import React, { useState } from 'react';
import { Sparkles, Radio, BookOpen, ShoppingBag, Menu, X, Rss } from 'lucide-react';
import InstagramIcon from './InstagramIcon';

export default function Navbar({ currentPage, onNavigateHome, onNavigateBlog }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId) => {
    setMobileMenuOpen(false);
    if (currentPage !== 'home') {
      onNavigateHome();
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGoBlog = () => {
    setMobileMenuOpen(false);
    onNavigateBlog();
  };

  const handleGoHome = () => {
    setMobileMenuOpen(false);
    onNavigateHome();
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#080b14]/85 backdrop-blur-md border-b border-purple-500/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={handleGoHome}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-sky-400 p-0.5 shadow-lg shadow-purple-600/25 group-hover:shadow-purple-500/40 transition-all">
            <div className="w-full h-full bg-[#0a0e1c] rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-sky-400 group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold bg-gradient-to-r from-white via-slate-100 to-sky-200 bg-clip-text text-transparent tracking-wider">
                宇宙流
              </span>
              <span className="text-[10px] font-semibold tracking-wider px-1.5 py-0.2 bg-purple-500/20 text-purple-300 rounded border border-purple-500/30">
                PODCAST
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">Roger的自我覺察 & 心靈流動</p>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          <button
            onClick={() => handleNavClick('episodes')}
            className="px-3 py-1.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Radio className="w-4 h-4 text-sky-400" />
            最新單集
          </button>

          <button
            onClick={() => handleNavClick('about')}
            className="px-3 py-1.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            認識宇宙流
          </button>

          <button
            onClick={() => handleNavClick('instagram')}
            className="px-3 py-1.5 text-sm font-medium text-pink-300 hover:text-white hover:bg-pink-950/40 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <InstagramIcon className="w-4 h-4 text-pink-400" />
            IG 社群
          </button>

          {/* Dedicated Blog Page Tab */}
          <button
            onClick={handleGoBlog}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all flex items-center gap-1.5 ${
              currentPage === 'blog'
                ? 'bg-emerald-600 text-white font-bold shadow-md shadow-emerald-600/30'
                : 'text-slate-300 hover:text-emerald-300 hover:bg-emerald-950/30'
            }`}
          >
            <BookOpen className="w-4 h-4 text-emerald-400" />
            覺察與體驗手札
          </button>

          <button
            onClick={() => handleNavClick('merch')}
            className="px-3 py-1.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <ShoppingBag className="w-4 h-4 text-amber-400" />
            宇宙流周邊
          </button>
        </nav>

        {/* Right CTA / Platforms */}
        <div className="hidden lg:flex items-center gap-2.5">
          <a
            href="https://feed.firstory.me/rss/user/ckpp8gmtxcbi708463itdb0t5"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-slate-400 hover:text-orange-400 hover:bg-slate-800/60 rounded-lg transition-all flex items-center gap-1 text-xs"
            title="RSS 訂閱來源"
          >
            <Rss className="w-4 h-4 text-orange-400" />
            <span>RSS</span>
          </a>

          <a
            href="https://www.instagram.com/universe.flow2021/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#f09433] via-[#dc2743] to-[#bc1888] hover:opacity-95 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-pink-600/30 active:scale-95 transition-all"
          >
            <InstagramIcon className="w-3.5 h-3.5" />
            <span>追蹤 IG</span>
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-400 hover:text-white rounded-lg"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0c101d] border-b border-purple-500/20 px-4 pt-2 pb-6 space-y-2">
          <button
            onClick={() => handleNavClick('episodes')}
            className="w-full text-left px-3 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800 flex items-center gap-2.5"
          >
            <Radio className="w-4 h-4 text-sky-400" />
            最新單集 (306+集)
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className="w-full text-left px-3 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800 flex items-center gap-2.5"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            認識宇宙流
          </button>
          <button
            onClick={handleGoBlog}
            className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center gap-2.5 ${
              currentPage === 'blog'
                ? 'bg-emerald-600 text-white font-bold'
                : 'text-emerald-300 bg-emerald-950/40 border border-emerald-500/30'
            }`}
          >
            <BookOpen className="w-4 h-4 text-emerald-400" />
            覺察與體驗手札
          </button>
          <button
            onClick={() => handleNavClick('instagram')}
            className="w-full text-left px-3 py-2.5 rounded-lg text-pink-300 hover:bg-slate-800 flex items-center gap-2.5"
          >
            <InstagramIcon className="w-4 h-4 text-pink-400" />
            官方 IG 貼文牆
          </button>
          <button
            onClick={() => handleNavClick('merch')}
            className="w-full text-left px-3 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800 flex items-center gap-2.5"
          >
            <ShoppingBag className="w-4 h-4 text-amber-400" />
            宇宙流周邊 (預購登記)
          </button>
          <a
            href="https://www.instagram.com/universe.flow2021/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full text-left px-3 py-2.5 rounded-lg text-white bg-gradient-to-r from-[#f09433] via-[#dc2743] to-[#bc1888] font-bold flex items-center gap-2.5 shadow-md"
          >
            <InstagramIcon className="w-4 h-4" />
            追蹤宇宙流 IG (@universe.flow2021)
          </a>
        </div>
      )}
    </header>
  );
}
