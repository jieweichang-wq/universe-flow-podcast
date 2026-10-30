import React from 'react';
import { Play, Sparkles, Heart, Radio, Headphones, Calendar, Compass } from 'lucide-react';
import InstagramIcon from './InstagramIcon';

export default function HeroSection({ latestEpisode, onPlayEpisode, onOpenTreeHole }) {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
      {/* Background ambient glow circles */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-purple-700/20 via-indigo-600/15 to-sky-500/10 blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Text Column */}
          <div className="flex-1 text-center lg:text-left">
            {/* Tag badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-900/40 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-6">
              <Sparkles className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
              <span>Roger 的自我覺察 & 心靈流動空間</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight mb-6">
              在浩瀚宇宙中
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-sky-400 bg-clip-text text-transparent">
                聽見內在溫柔的流動
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300/90 leading-relaxed max-w-2xl mb-8 mx-auto lg:mx-0">
              「我們來自於宇宙，陪伴你隨著宇宙的流動，體驗人生、覺察生命，成為完整的自己。」
              <br />
              探討人生、感情、信念與職場課題，打破限制，遇見真實的靈魂。
            </p>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-10">
              <button
                onClick={() => latestEpisode && onPlayEpisode(latestEpisode)}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-sky-500 hover:from-purple-500 hover:to-sky-400 text-white font-semibold text-sm sm:text-base flex items-center gap-2.5 shadow-xl shadow-purple-600/30 hover:shadow-purple-500/50 active:scale-95 transition-all"
              >
                <Play className="w-5 h-5 fill-current" />
                收聽最新第 {latestEpisode?.episodeNumber || 306} 集
              </button>

              <a
                href="https://www.instagram.com/universe.flow2021/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-xl bg-gradient-to-r from-[#f09433] via-[#dc2743] to-[#bc1888] hover:opacity-95 text-white font-bold text-sm sm:text-base flex items-center gap-2 shadow-lg shadow-pink-600/25 active:scale-95 transition-all"
              >
                <InstagramIcon className="w-4 h-4" />
                關注官方 IG
              </a>

              <a
                href="https://www.instagram.com/universe.flow2021/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800/80 border border-purple-500/30 hover:border-purple-400/60 text-slate-200 font-semibold text-sm sm:text-base flex items-center gap-2 transition-all"
              >
                <Heart className="w-5 h-5 text-purple-400" />
                粉絲樹洞投書 (IG 私訊)
              </a>
            </div>

            {/* Trust / Stats counters */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800/80 max-w-lg mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-slate-100 flex items-center justify-center lg:justify-start gap-1">
                  <span>306+</span>
                  <Headphones className="w-4 h-4 text-sky-400" />
                </div>
                <div className="text-xs text-slate-400 mt-0.5">累積深層單集</div>
              </div>

              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-slate-100 flex items-center justify-center lg:justify-start gap-1">
                  <span>每週四</span>
                  <Calendar className="w-4 h-4 text-purple-400" />
                </div>
                <div className="text-xs text-slate-400 mt-0.5">定期準時更新</div>
              </div>

              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-slate-100 flex items-center justify-center lg:justify-start gap-1">
                  <span>心靈覺察</span>
                  <Compass className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-xs text-slate-400 mt-0.5">陪伴回歸自我</div>
              </div>
            </div>
          </div>

          {/* Right Hero Visual Card */}
          <div className="flex-1 max-w-md w-full">
            <div className="relative group">
              {/* Outer decorative ring */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-sky-500 rounded-3xl blur-md opacity-40 group-hover:opacity-60 transition duration-500" />

              <div className="relative bg-[#0e1324] rounded-2xl border border-purple-500/30 p-6 shadow-2xl">
                {/* Podcast Cover */}
                <div className="relative aspect-square rounded-xl overflow-hidden mb-5 border border-purple-500/20 shadow-inner group/img">
                  <img
                    src={latestEpisode?.cover || "https://d3mww1g1pfq2pt.cloudfront.net/Avatar/ckpp8gmtxcbi708463itdb0t5/1674125530647.jpg"}
                    alt="宇宙流 Podcast 封面"
                    className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Floating play badge on cover */}
                  <div 
                    onClick={() => latestEpisode && onPlayEpisode(latestEpisode)}
                    className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                  >
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-600 to-sky-400 flex items-center justify-center text-white shadow-xl hover:scale-110 transition-transform">
                      <Play className="w-7 h-7 fill-current ml-1" />
                    </div>
                  </div>

                  <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-xs font-medium text-sky-300 border border-sky-500/30">
                    最新單集
                  </div>
                </div>

                {/* Latest episode quick info */}
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                    <span>發布於 {new Date(latestEpisode?.pubDate || '').toLocaleDateString('zh-TW')}</span>
                    <span className="text-purple-300">{latestEpisode?.duration}</span>
                  </div>
                  <h3 className="text-base font-semibold text-slate-100 line-clamp-2 mb-3">
                    {latestEpisode?.title || "最新精彩單集"}
                  </h3>

                  {/* Platforms mini buttons */}
                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-xs text-slate-400">收聽平台傳送門</span>
                    <div className="flex flex-wrap items-center gap-1.5 justify-end">
                      <a
                        href="https://podcasts.apple.com/podcast/id1571623462"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2 py-1 text-[11px] font-medium bg-slate-800/80 hover:bg-slate-700 text-slate-200 rounded-md transition-colors"
                        title="Apple Podcasts 專屬訂閱"
                      >
                        Apple
                      </a>
                      <a
                        href="https://open.spotify.com/show/6GtjJ8OjsAbvnBzbqpqbLr"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2 py-1 text-[11px] font-medium bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-300 rounded-md transition-colors"
                        title="Spotify 專屬追蹤"
                      >
                        Spotify
                      </a>
                      <a
                        href="https://podcast.kkbox.com/channel/HYyUpLPNegHwH3s6Db"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2 py-1 text-[11px] font-medium bg-sky-950/60 hover:bg-sky-900/80 text-sky-300 rounded-md transition-colors"
                        title="KKBOX 專屬收聽"
                      >
                        KKBOX
                      </a>
                      <a
                        href="https://www.youtube.com/@podcast1832"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2 py-1 text-[11px] font-medium bg-red-950/60 hover:bg-red-900/80 text-red-300 rounded-md transition-colors"
                        title="YouTube 頻道"
                      >
                        YouTube
                      </a>
                      <a
                        href="https://www.instagram.com/universe.flow2021/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2 py-1 text-[11px] font-semibold bg-pink-950/60 hover:bg-pink-900/80 text-pink-300 rounded-md transition-colors flex items-center gap-1 border border-pink-500/30"
                      >
                        <InstagramIcon className="w-3 h-3" />
                        IG
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
