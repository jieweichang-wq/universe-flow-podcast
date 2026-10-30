import React, { useState, useMemo, useEffect } from 'react';
import { 
  BookOpen, 
  Search, 
  Calendar, 
  Clock, 
  ArrowLeft, 
  ArrowRight, 
  Play, 
  Sparkles, 
  Filter, 
  Share2, 
  Check,
  ChevronLeft
} from 'lucide-react';
import articlesData from '../data/articles.json';

export default function BlogPage({ episodes, onPlayEpisode, onNavigateHome, activeArticleId, setActiveArticleId }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [copied, setCopied] = useState(false);

  // Scroll to top on page load or article change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeArticleId]);

  const categories = ['全部', '影劇心靈', '粉絲樹洞', '情緒與生活', '自我覺察'];

  // Filter articles
  const filteredArticles = useMemo(() => {
    return articlesData.filter((article) => {
      const matchCat = selectedCategory === '全部' || article.category === selectedCategory;
      const matchSearch = 
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.content.some((p) => p.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchTerm]);

  // Find active article if in reader view
  const currentArticle = useMemo(() => {
    if (!activeArticleId) return null;
    return articlesData.find((a) => a.id === activeArticleId) || null;
  }, [activeArticleId]);

  // Find adjacent articles for next/prev
  const adjacentArticles = useMemo(() => {
    if (!currentArticle) return { prev: null, next: null };
    const idx = articlesData.findIndex((a) => a.id === currentArticle.id);
    return {
      prev: idx > 0 ? articlesData[idx - 1] : null,
      next: idx < articlesData.length - 1 ? articlesData[idx + 1] : null,
    };
  }, [currentArticle]);

  const handlePlayRelated = (episodeId) => {
    const ep = episodes.find((e) => e.id === episodeId);
    if (ep) {
      onPlayEpisode(ep);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // If reading a single article
  if (currentArticle) {
    const relatedEp = episodes.find((e) => e.id === currentArticle.relatedEpisodeId);

    return (
      <div className="py-12 md:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back navigation & Actions */}
        <div className="flex items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
          <button
            onClick={() => setActiveArticleId(null)}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 px-3.5 py-2 rounded-xl border border-slate-700 transition-all"
          >
            <ArrowLeft className="w-4 h-4 text-emerald-400" />
            返回手札文章列表
          </button>

          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 bg-slate-900/60 px-3 py-2 rounded-xl border border-slate-800 transition-all"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">已複製文章連結</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>分享文章</span>
              </>
            )}
          </button>
        </div>

        {/* Article Header */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-3 text-xs mb-3">
            <span className="px-2.5 py-1 rounded-md bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 font-medium">
              {currentArticle.category}
            </span>
            <span className="text-slate-400 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {currentArticle.date}
            </span>
            <span className="text-slate-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              約 {currentArticle.readTime} 讀完
            </span>
            <span className="text-slate-500 font-mono">筆記作者：Roger</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-100 leading-tight">
            {currentArticle.title}
          </h1>
        </div>

        {/* Podcast Audio Player Banner inside article */}
        {relatedEp && (
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-purple-950/50 to-indigo-950/50 border border-purple-500/30 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-purple-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-purple-600/30">
                <Play className="w-5 h-5 fill-current ml-0.5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 bg-purple-900/60 text-purple-300 rounded border border-purple-500/30">
                  搭配單集 EP.{relatedEp.episodeNumber}
                </span>
                <h4 className="text-sm font-bold text-slate-100 truncate max-w-md mt-1">
                  {relatedEp.title}
                </h4>
                <p className="text-xs text-purple-300 mt-0.5">邊讀文章邊聽 Roger 的溫暖剖析與陪伴</p>
              </div>
            </div>

            <button
              onClick={() => onPlayEpisode(relatedEp)}
              className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-md active:scale-95 shrink-0 self-stretch sm:self-auto flex items-center justify-center gap-2"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              立即播放單集
            </button>
          </div>
        )}

        {/* Featured Image */}
        <div className="rounded-2xl overflow-hidden aspect-video max-h-96 w-full mb-10 shadow-2xl border border-slate-800">
          <img
            src={currentArticle.cover}
            alt={currentArticle.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Body */}
        <article className="space-y-6 text-slate-200 text-base sm:text-lg leading-loose pb-12 border-b border-slate-800">
          {currentArticle.content.map((p, idx) => (
            <p key={idx} className="text-slate-300/95 font-normal tracking-wide">
              {p}
            </p>
          ))}
        </article>

        {/* Previous & Next Article Navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-4">
          {adjacentArticles.prev ? (
            <button
              onClick={() => setActiveArticleId(adjacentArticles.prev.id)}
              className="p-4 rounded-xl bg-[#0d1222] hover:bg-[#12182c] border border-slate-800 hover:border-emerald-500/40 text-left transition-all group"
            >
              <span className="text-[11px] text-slate-400 flex items-center gap-1 mb-1">
                <ChevronLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                上一篇手札
              </span>
              <p className="text-xs font-bold text-slate-200 group-hover:text-emerald-300 line-clamp-1">
                {adjacentArticles.prev.title}
              </p>
            </button>
          ) : <div />}

          {adjacentArticles.next ? (
            <button
              onClick={() => setActiveArticleId(adjacentArticles.next.id)}
              className="p-4 rounded-xl bg-[#0d1222] hover:bg-[#12182c] border border-slate-800 hover:border-emerald-500/40 text-right transition-all group sm:ml-auto w-full"
            >
              <span className="text-[11px] text-slate-400 flex items-center justify-end gap-1 mb-1">
                下一篇手札
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </span>
              <p className="text-xs font-bold text-slate-200 group-hover:text-emerald-300 line-clamp-1">
                {adjacentArticles.next.title}
              </p>
            </button>
          ) : <div />}
        </div>
      </div>
    );
  }

  // Blog Page Archive / List View
  return (
    <div className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Top Banner */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>宇宙流・覺察與體驗手札</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-100 tracking-tight">
                覺察與體驗手札
              </h1>
              <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
                將播客的聲音化為安靜的文字。這裡持續堆疊 Roger 的自我覺察筆記、單集深度延伸解析，以及聽眾樹洞的療癒梳理。
              </p>
            </div>

            {/* Back Home Button */}
            <button
              onClick={onNavigateHome}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold transition-all shrink-0 self-start lg:self-auto"
            >
              <ArrowLeft className="w-4 h-4 text-sky-400" />
              返回官網首頁
            </button>
          </div>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10 p-4 rounded-2xl bg-[#0c101d] border border-slate-800">
          {/* Category Chips */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400 mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              分類：
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="搜尋手札內容或關鍵字..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-[#090d19] border border-slate-700 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
              >
                清除
              </button>
            )}
          </div>
        </div>

        {/* Articles Count */}
        <div className="flex items-center justify-between text-xs text-slate-400 mb-6">
          <span>
            共累積 <strong className="text-emerald-400">{filteredArticles.length}</strong> 篇手札
          </span>
          <span className="text-slate-500">持續堆疊更新中 🌿</span>
        </div>

        {/* Articles Grid */}
        {filteredArticles.length === 0 ? (
          <div className="text-center py-20 bg-[#0d1222] rounded-2xl border border-slate-800">
            <p className="text-slate-400 text-sm">找不到符合條件的手札，換個關鍵字搜尋看看吧！</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                className="group bg-[#0d1222]/90 hover:bg-[#11172a] border border-slate-800/80 hover:border-emerald-500/40 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-lg"
              >
                <div>
                  {/* Cover */}
                  <div 
                    onClick={() => setActiveArticleId(article.id)}
                    className="relative aspect-video w-full overflow-hidden bg-slate-900 cursor-pointer"
                  >
                    <img
                      src={article.cover}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-md bg-black/75 backdrop-blur-md text-[10px] font-medium text-emerald-300 border border-emerald-500/30">
                      {article.category}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5">
                    <div className="flex items-center gap-2.5 text-xs text-slate-400 mb-2">
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

                    <h3 
                      onClick={() => setActiveArticleId(article.id)}
                      className="text-base font-bold text-slate-100 group-hover:text-emerald-300 transition-colors cursor-pointer line-clamp-2 mb-2.5"
                    >
                      {article.title}
                    </h3>

                    <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                      {article.summary}
                    </p>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="p-5 pt-0 border-t border-slate-800/60 mt-4 flex items-center justify-between">
                  <button
                    onClick={() => setActiveArticleId(article.id)}
                    className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors"
                  >
                    閱讀全文
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </button>

                  {article.relatedEpisodeId && (
                    <button
                      onClick={() => handlePlayRelated(article.relatedEpisodeId)}
                      className="px-2 py-1 text-[11px] text-purple-300 hover:text-purple-100 bg-purple-950/50 hover:bg-purple-900/60 border border-purple-500/30 rounded-md flex items-center gap-1 transition-colors"
                      title="聽對應 Podcast"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      搭配單集
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
