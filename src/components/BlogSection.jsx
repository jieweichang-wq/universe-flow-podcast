import React, { useState } from 'react';
import { BookOpen, ExternalLink, Calendar, Clock, ArrowRight, X, Play, Sparkles } from 'lucide-react';
import articlesData from '../data/articles.json';

export default function BlogSection({ episodes, onPlayEpisode }) {
  const [activeArticle, setActiveArticle] = useState(null);

  const handlePlayRelated = (episodeId) => {
    const ep = episodes.find((e) => e.id === episodeId);
    if (ep) {
      onPlayEpisode(ep);
    }
  };

  return (
    <section id="blog" className="py-16 md:py-24 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-3">
              <BookOpen className="w-3.5 h-3.5" />
              <span>心靈手札與專欄文稿</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
              把聲音化為深刻的文字印記
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2">
              單集深度解析、心靈精華整理，與 Roger 隨心記錄的覺察手札
            </p>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articlesData.map((article) => (
            <div
              key={article.id}
              className="group bg-[#0d1222]/90 hover:bg-[#11172c] border border-slate-800/80 hover:border-emerald-500/40 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-lg"
            >
              <div>
                {/* Cover Image */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
                  <img
                    src={article.cover}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md text-[11px] font-medium text-emerald-300 border border-emerald-500/30">
                    {article.category}
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-slate-400 mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {article.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                  </div>

                  <h3 
                    onClick={() => setActiveArticle(article)}
                    className="text-lg font-bold text-slate-100 group-hover:text-emerald-300 transition-colors cursor-pointer line-clamp-2 mb-3"
                  >
                    {article.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-400 line-clamp-3 leading-relaxed">
                    {article.summary}
                  </p>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-6 pt-0 flex items-center justify-between border-t border-slate-800/60 mt-4">
                <button
                  onClick={() => setActiveArticle(article)}
                  className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 transition-colors"
                >
                  閱讀完整專欄
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>

                {article.relatedEpisodeId && (
                  <button
                    onClick={() => handlePlayRelated(article.relatedEpisodeId)}
                    className="px-2.5 py-1 text-xs text-purple-300 hover:text-purple-100 bg-purple-950/50 hover:bg-purple-900/60 border border-purple-500/30 rounded-lg flex items-center gap-1 transition-colors"
                    title="播放這篇文章對應的單集"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    收聽對應單集
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Article Reading Modal */}
        {activeArticle && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-[#0e1324] border border-emerald-500/30 rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in duration-200">
              {/* Modal Top */}
              <div className="p-6 border-b border-slate-800 flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2 text-xs">
                    <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                      {activeArticle.category}
                    </span>
                    <span className="text-slate-400">{activeArticle.date}</span>
                    <span className="text-slate-400">• 約 {activeArticle.readTime} 讀完</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-100 leading-snug">
                    {activeArticle.title}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveArticle(null)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Scroll Content */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-5 text-slate-300 leading-relaxed text-sm sm:text-base">
                {/* Audio quick play banner inside article */}
                {activeArticle.relatedEpisodeId && (
                  <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-500/30 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-purple-600 flex items-center justify-center text-white shrink-0">
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                      </div>
                      <div className="text-xs">
                        <div className="font-semibold text-slate-100">本篇文章搭配 Podcast 單集</div>
                        <div className="text-purple-300">邊看文章邊聽 Roger 的溫暖解析</div>
                      </div>
                    </div>
                    <button
                      onClick={() => handlePlayRelated(activeArticle.relatedEpisodeId)}
                      className="px-3.5 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold transition-all shrink-0"
                    >
                      開始播放
                    </button>
                  </div>
                )}

                {/* Article image */}
                <div className="rounded-xl overflow-hidden aspect-video max-h-72 w-full">
                  <img
                    src={activeArticle.cover}
                    alt={activeArticle.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Paragraphs */}
                <div className="space-y-4 pt-2">
                  {activeArticle.content.map((p, idx) => (
                    <p key={idx} className="leading-loose text-slate-300">
                      {p}
                    </p>
                  ))}
                </div>
              </div>

              {/* Modal Bottom */}
              <div className="p-4 border-t border-slate-800 bg-[#0a0e1b] flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  專欄文字：Roger（宇宙流 PODCAST）
                </span>

                <button
                  onClick={() => setActiveArticle(null)}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all"
                >
                  關閉閱讀
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
