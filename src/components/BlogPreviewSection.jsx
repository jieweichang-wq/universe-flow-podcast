import React from 'react';
import { BookOpen, ArrowRight, Calendar, Clock, Play } from 'lucide-react';
import articlesData from '../data/articles.json';

export default function BlogPreviewSection({ episodes, onPlayEpisode, onNavigateBlog, onSelectArticle }) {
  // Show latest 3 articles
  const latestArticles = articlesData.slice(0, 3);

  const handlePlayRelated = (episodeId, e) => {
    e.stopPropagation();
    const ep = episodes.find((item) => item.id === episodeId);
    if (ep) {
      onPlayEpisode(ep);
    }
  };

  return (
    <section id="blog-preview" className="py-16 md:py-24 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-3">
              <BookOpen className="w-3.5 h-3.5" />
              <span>覺察與體驗手札精選</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
              把聲音化為深刻的文字印記
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2">
              單集深度解析、心靈精華整理，與 Roger 隨心記錄的覺察手札
            </p>
          </div>

          <button
            onClick={onNavigateBlog}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/25 active:scale-95 transition-all shrink-0 self-start md:self-auto"
          >
            <span>探索全部手札文章 ({articlesData.length} 篇)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 3 Featured Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestArticles.map((article) => (
            <div
              key={article.id}
              onClick={() => onSelectArticle(article.id)}
              className="group bg-[#0d1222]/90 hover:bg-[#11172a] border border-slate-800/80 hover:border-emerald-500/40 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-lg cursor-pointer"
            >
              <div>
                {/* Image */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
                  <img
                    src={article.cover}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md text-[10px] font-medium text-emerald-300 border border-emerald-500/30">
                    {article.category}
                  </div>
                </div>

                {/* Body */}
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                    <span className="flex items-center gap-1 text-[11px]">
                      <Calendar className="w-3 h-3" />
                      {article.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-[11px]">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-100 group-hover:text-emerald-300 transition-colors line-clamp-2 mb-2.5">
                    {article.title}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {article.summary}
                  </p>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-5 pt-0 border-t border-slate-800/60 mt-4 flex items-center justify-between">
                <span className="text-xs font-semibold text-emerald-400 group-hover:text-emerald-300 flex items-center gap-1">
                  閱讀完整手札
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>

                {article.relatedEpisodeId && (
                  <button
                    onClick={(e) => handlePlayRelated(article.relatedEpisodeId, e)}
                    className="px-2 py-1 text-[11px] text-purple-300 hover:text-purple-100 bg-purple-950/50 hover:bg-purple-900/60 border border-purple-500/30 rounded-md flex items-center gap-1 transition-colors"
                    title="播放此單集"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    聽音訊
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
