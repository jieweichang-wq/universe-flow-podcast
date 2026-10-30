import React, { useState, useMemo } from 'react';
import { Play, Pause, Search, Clock, Calendar, ChevronRight, FileText, X, Sparkles, Filter } from 'lucide-react';

export default function EpisodeList({ episodes, currentEpisode, isPlaying, onPlayEpisode }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [visibleCount, setVisibleCount] = useState(12);
  const [activeNoteEpisode, setActiveNoteEpisode] = useState(null);

  const categories = ['全部', '粉絲樹洞', '影劇心靈', '人際與情感', '情緒與生活'];

  // Filter episodes
  const filteredEpisodes = useMemo(() => {
    return episodes.filter((ep) => {
      const matchesCategory = selectedCategory === '全部' || ep.category === selectedCategory;
      const matchesSearch = 
        ep.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ep.desc.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [episodes, selectedCategory, searchTerm]);

  const visibleEpisodes = filteredEpisodes.slice(0, visibleCount);

  const cleanDescription = (html) => {
    return html.replace(/<[^>]*>?/gm, '').replace(/&nbsp;/g, ' ').trim();
  };

  return (
    <section id="episodes" className="py-16 md:py-24 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-950/60 border border-sky-500/30 text-sky-300 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>306+ 集心靈音訊庫</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
              探索宇宙流全單集
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2">
              隨選即聽，讓 Roger 的聲音陪伴你梳理人生的煩惱與自我覺察
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="搜尋單集、電影或關鍵字..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setVisibleCount(12);
              }}
              className="w-full pl-10 pr-4 py-2.5 bg-[#0f1424] border border-slate-700/80 rounded-xl text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500/80 focus:ring-1 focus:ring-purple-500/50 transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 text-xs"
              >
                清除
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <span className="text-xs text-slate-400 mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            主題：
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setVisibleCount(12);
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-600/30'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
          <span className="text-xs text-slate-500 ml-auto hidden sm:inline">
            顯示 {visibleEpisodes.length} / {filteredEpisodes.length} 集
          </span>
        </div>

        {/* Episodes Grid */}
        {filteredEpisodes.length === 0 ? (
          <div className="text-center py-20 bg-[#0c101d] rounded-2xl border border-slate-800">
            <p className="text-slate-400 text-sm">找不到符合條件的單集，換個關鍵字搜尋看看吧！</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {visibleEpisodes.map((ep) => {
              const isCurrent = currentEpisode?.id === ep.id;
              const isCurrentPlaying = isCurrent && isPlaying;

              return (
                <div
                  key={ep.id}
                  className={`group relative rounded-2xl p-5 border transition-all duration-300 flex flex-col justify-between ${
                    isCurrent
                      ? 'bg-[#12182c] border-purple-500/60 shadow-lg shadow-purple-600/20'
                      : 'bg-[#0d1222]/90 hover:bg-[#10162a] border-slate-800/80 hover:border-purple-500/40'
                  }`}
                >
                  <div>
                    {/* Card Meta Top */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-sky-400/90 font-mono">
                          EP.{ep.episodeNumber}
                        </span>
                        <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-purple-950/60 text-purple-300 border border-purple-500/25">
                          {ep.category}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-slate-400">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{ep.duration}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 
                      onClick={() => onPlayEpisode(ep)}
                      className={`text-base font-semibold leading-snug line-clamp-2 cursor-pointer mb-2.5 transition-colors ${
                        isCurrent ? 'text-sky-300' : 'text-slate-100 group-hover:text-purple-300'
                      }`}
                    >
                      {ep.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-4">
                      {cleanDescription(ep.desc)}
                    </p>
                  </div>

                  {/* Card Bottom Actions */}
                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between mt-auto">
                    <span className="text-[11px] text-slate-500">
                      {new Date(ep.pubDate).toLocaleDateString('zh-TW')}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setActiveNoteEpisode(ep)}
                        className="px-2.5 py-1 text-xs text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-700/80 rounded-md transition-colors flex items-center gap-1"
                        title="查看單集筆記"
                      >
                        <FileText className="w-3 h-3 text-slate-400" />
                        筆記
                      </button>

                      <button
                        onClick={() => onPlayEpisode(ep)}
                        className={`px-3 py-1 text-xs font-medium rounded-md flex items-center gap-1 transition-all ${
                          isCurrentPlaying
                            ? 'bg-purple-600 text-white shadow-sm'
                            : 'bg-purple-950/60 hover:bg-purple-800/80 text-purple-200 border border-purple-500/30'
                        }`}
                      >
                        {isCurrentPlaying ? (
                          <>
                            <Pause className="w-3 h-3 fill-current" />
                            <span>暫停</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-3 h-3 fill-current" />
                            <span>播放</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Load More Button */}
        {visibleCount < filteredEpisodes.length && (
          <div className="text-center mt-12">
            <button
              onClick={() => setVisibleCount((prev) => prev + 12)}
              className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-sm font-medium hover:border-purple-500/50 transition-all shadow-md"
            >
              載入更多單集 (還有 {filteredEpisodes.length - visibleCount} 集)
            </button>
          </div>
        )}

        {/* Show Notes Modal */}
        {activeNoteEpisode && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#0e1324] border border-purple-500/30 rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in duration-200">
              {/* Modal Header */}
              <div className="p-6 border-b border-slate-800 flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-sky-400 font-mono">
                      EP.{activeNoteEpisode.episodeNumber}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-purple-950/80 text-purple-300 border border-purple-500/30">
                      {activeNoteEpisode.category}
                    </span>
                    <span className="text-xs text-slate-400">
                      {activeNoteEpisode.duration}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-100">
                    {activeNoteEpisode.title}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveNoteEpisode(null)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body / Notes */}
              <div className="p-6 overflow-y-auto space-y-4 text-sm text-slate-300 leading-relaxed">
                <div
                  className="prose prose-invert max-w-none text-slate-300 space-y-3"
                  dangerouslySetInnerHTML={{ __html: activeNoteEpisode.desc }}
                />
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-slate-800 bg-[#0a0e1b] flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  發布時間：{new Date(activeNoteEpisode.pubDate).toLocaleString('zh-TW')}
                </span>

                <button
                  onClick={() => {
                    onPlayEpisode(activeNoteEpisode);
                    setActiveNoteEpisode(null);
                  }}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-purple-600/30"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  立即播放此單集
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
