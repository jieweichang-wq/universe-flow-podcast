import React from 'react';
import { Sparkles, Mail, Rss, ExternalLink, Heart } from 'lucide-react';
import InstagramIcon from './InstagramIcon';
import YoutubeIcon from './YoutubeIcon';

export default function Footer({ onNavigateBlog, onNavigateHome }) {
  return (
    <footer className="bg-[#05070d] border-t border-slate-800/80 text-slate-400 py-16 pb-28 md:pb-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-sky-400 p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-[#090d18] rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-sky-400" />
                </div>
              </div>
              <span className="text-xl font-bold text-white tracking-wide">
                宇宙流 <span className="text-xs text-purple-400 font-mono">PODCAST</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md">
              「我們來自於宇宙，陪伴你隨著宇宙的流動，體驗人生、覺察生命，成為完整的自己。」
              由 Roger 主持，探討人生中的許多課題與煩惱，打破既有思維限制。
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="text-xs text-slate-500">官方信箱：</span>
              <a
                href="mailto:universe.flow2021@gmail.com"
                className="text-xs text-sky-300 hover:text-sky-200 transition-colors"
              >
                universe.flow2021@gmail.com
              </a>
            </div>
          </div>

          {/* Col 2: Fast Navigation */}
          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4">
              快速導覽
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#episodes" className="hover:text-white transition-colors">
                  最新單集 (306+集)
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  關於宇宙流與 Roger
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/universe.flow2021/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-300 text-left transition-colors flex items-center gap-1"
                >
                  <Heart className="w-3 h-3 text-pink-400" />
                  粉絲樹洞投書 (IG 私訊)
                </a>
              </li>
              <li>
                <button 
                  onClick={onNavigateBlog} 
                  className="hover:text-emerald-300 transition-colors text-left"
                >
                  覺察與體驗手札 (全部文章)
                </button>
              </li>
              <li>
                <a href="#merch" className="hover:text-white transition-colors">
                  宇宙流周邊 (預購登記)
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: External Platforms */}
          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4">
              官方社群與收聽
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href="https://www.instagram.com/universe.flow2021/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-400 hover:text-pink-300 font-semibold transition-colors flex items-center gap-1.5"
                >
                  <InstagramIcon className="w-3.5 h-3.5 text-pink-400" />
                  Instagram (@universe.flow2021)
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@podcast1832"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-400 hover:text-red-300 font-semibold transition-colors flex items-center gap-1.5"
                >
                  <YoutubeIcon className="w-3.5 h-3.5 text-red-500" />
                  YouTube 官方頻道 (@podcast1832)
                </a>
              </li>
              <li>
                <a
                  href="https://podcasts.apple.com/podcast/id1571623462"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-purple-300 transition-colors"
                >
                  Apple Podcasts 專屬頻道
                </a>
              </li>
              <li>
                <a
                  href="https://open.spotify.com/show/6GtjJ8OjsAbvnBzbqpqbLr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-300 transition-colors"
                >
                  Spotify 官方節目
                </a>
              </li>
              <li>
                <a
                  href="https://podcast.kkbox.com/channel/HYyUpLPNegHwH3s6Db"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-sky-300 transition-colors"
                >
                  KKBOX 音樂串流
                </a>
              </li>
              <li>
                <a
                  href="https://feed.firstory.me/rss/user/ckpp8gmtxcbi708463itdb0t5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-400 transition-colors flex items-center gap-1.5"
                >
                  <Rss className="w-3.5 h-3.5 text-orange-400" />
                  Firstory RSS Feed
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} 宇宙流 PODCAST. All rights reserved.</p>
          <p className="flex items-center gap-1 text-slate-400">
            隨著宇宙的流動，在浩瀚中安放自我 🌌
          </p>
        </div>
      </div>
    </footer>
  );
}
