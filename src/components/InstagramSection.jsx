import React, { useState, useEffect } from 'react';
import { ExternalLink, Sparkles, RefreshCw, Send, CheckCircle2, Flame, Play } from 'lucide-react';
import InstagramIcon from './InstagramIcon';
import YoutubeIcon from './YoutubeIcon';

export default function InstagramSection() {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  // Auto-load Instagram embed script
  useEffect(() => {
    if (window.instgrm) {
      window.instgrm.Embeds.process();
    } else {
      const script = document.createElement('script');
      script.src = 'https://www.instagram.com/embed.js';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        if (window.instgrm) {
          window.instgrm.Embeds.process();
        }
      };
      document.body.appendChild(script);
    }
  }, [refreshKey]);

  const handleRefresh = () => {
    setIframeLoaded(false);
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <section id="instagram" className="py-16 md:py-24 border-t border-slate-800/80 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-pink-600/10 via-purple-600/10 to-amber-600/10 blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-pink-950/60 via-purple-950/60 to-amber-950/60 border border-pink-500/30 text-pink-300 text-xs font-semibold mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>即時同步 ｜ 宇宙流 Instagram 最新動態</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
              即時追蹤官方 IG 貼文
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2">
              IG 發布任何新貼文、覺察短片或限動，網站將第一時間即時呈現
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 self-start md:self-auto">
            <button
              onClick={handleRefresh}
              className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white text-xs font-medium transition-all flex items-center gap-1.5 shadow-sm"
              title="重新整理 IG 貼文"
            >
              <RefreshCw className="w-3.5 h-3.5 text-pink-400" />
              <span>重新整理</span>
            </button>

            <a
              href="https://www.instagram.com/universe.flow2021/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#f09433] via-[#dc2743] to-[#bc1888] hover:opacity-95 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-pink-600/30 active:scale-95 transition-all"
            >
              <InstagramIcon className="w-3.5 h-3.5" />
              <span>造訪主頁</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Real-time IG Embed Grid & Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Official Live Instagram Feed Container */}
          <div className="lg:col-span-7 bg-[#0d1222] border border-pink-500/30 rounded-3xl p-4 sm:p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-0.5 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]">
                  <div className="p-0.5 bg-[#0d1222] rounded-full">
                    <img
                      src="https://d3mww1g1pfq2pt.cloudfront.net/Avatar/ckpp8gmtxcbi708463itdb0t5/1674125530647.jpg"
                      alt="universe.flow2021"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-slate-100 text-sm">universe.flow2021</h3>
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  </div>
                  <p className="text-[11px] text-slate-400">宇宙流 PODCAST ｜ Roger</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] text-emerald-400 font-medium px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 hidden sm:inline-flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  即時連線中
                </span>
                <a
                  href="https://www.instagram.com/universe.flow2021/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs transition-colors"
                >
                  追蹤
                </a>
              </div>
            </div>

            {/* Live Embed Iframe */}
            <div className="relative w-full rounded-2xl overflow-hidden bg-[#090d19] border border-slate-800 min-h-[580px] flex items-center justify-center">
              {!iframeLoaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#090d19] text-slate-400 z-10">
                  <RefreshCw className="w-6 h-6 text-pink-500 animate-spin" />
                  <p className="text-xs">正在即時載入宇宙流最新貼文...</p>
                </div>
              )}

              <iframe
                key={refreshKey}
                src="https://www.instagram.com/universe.flow2021/embed/"
                title="宇宙流 Instagram 最新即時動態"
                className="w-full h-[620px] border-0 rounded-xl"
                onLoad={() => setIframeLoaded(true)}
                allowTransparency="true"
                allow="encrypted-media"
              />
            </div>

            <div className="pt-4 flex items-center justify-between text-xs text-slate-400">
              <span>貼文由 Instagram 即時提供</span>
              <a
                href="https://www.instagram.com/universe.flow2021/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-400 hover:text-pink-300 font-medium flex items-center gap-1 transition-colors"
              >
                在 Instagram App 中開啟
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Right Column: Interaction Hub & Shortcuts */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Podcast Video Showcase Card - Live YouTube Feed */}
            <div className="p-6 rounded-3xl bg-gradient-to-b from-[#111628] to-[#0c101d] border border-red-500/30 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
                  <YoutubeIcon className="w-4 h-4 text-red-500" />
                  精選 PODCAST 影片
                </span>
                <span className="text-[11px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  即時自動更新
                </span>
              </div>

              {/* YouTube Live Embed Iframe (Always plays latest video from channel's uploads) */}
              <div className="relative rounded-2xl overflow-hidden aspect-video bg-black border border-slate-800 mb-4 shadow-lg">
                <iframe
                  src="https://www.youtube-nocookie.com/embed/videoseries?list=UUFhn8zVLFZaxc_lU-HnKxNg"
                  title="宇宙流 Podcast YouTube 最新影音"
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                <span className="truncate">📺 宇宙流 YouTube 官方最新影片</span>
                <span className="text-[11px] text-red-400 font-medium">@podcast1832</span>
              </div>

              <a
                href="https://www.youtube.com/@podcast1832"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-red-500/50 text-slate-200 font-semibold text-xs flex items-center justify-center gap-2 transition-all"
              >
                <YoutubeIcon className="w-4 h-4 text-red-500" />
                <span>訂閱 YouTube 官方頻道觀看完整清單</span>
                <ExternalLink className="w-3 h-3 text-red-400" />
              </a>
            </div>

            {/* Direct Message (DM) Box Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-b from-[#111628] to-[#0c101d] border border-pink-500/30 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-pink-950/60 border border-pink-500/40 flex items-center justify-center text-pink-400">
                  <Send className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-100 text-sm">IG 私訊樹洞（Direct Message）</h4>
                  <p className="text-xs text-slate-400">給想直接聊聊的聽眾</p>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mb-5">
                不想寫正式的信件？隨時點開 IG 小盒子，向 Roger 傾訴你今天遇到的難題、工作煩惱或感情卡點。
              </p>

              <a
                href="https://www.instagram.com/universe.flow2021/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#f09433] via-[#dc2743] to-[#bc1888] hover:opacity-95 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-pink-600/25 active:scale-95 transition-all"
              >
                <InstagramIcon className="w-4 h-4" />
                <span>發送 IG 私訊給 Roger</span>
                <Send className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Update Guarantee Notice */}
            <div className="p-4 rounded-2xl bg-[#090d19] border border-slate-800 text-xs text-slate-400 leading-relaxed flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-200 block mb-0.5">即時自動更新機制說明</strong>
                只要您在 Instagram 發布新貼文，網頁會依據 IG 官方即時串流同步展現，無須手動更改任何程式碼或後台！
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
