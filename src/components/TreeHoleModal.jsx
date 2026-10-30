import React, { useState } from 'react';
import { X, Heart, Send, Sparkles, CheckCircle2 } from 'lucide-react';

export default function TreeHoleModal({ isOpen, onClose }) {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('感情困擾');
  const [content, setContent] = useState('');
  const [allowBroadcast, setAllowBroadcast] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    const submission = {
      id: 'sub-' + Date.now(),
      nickname: nickname.trim() || '匿名旅人',
      email: email.trim(),
      category,
      content: content.trim(),
      allowBroadcast,
      createdAt: new Date().toISOString()
    };

    // Save to local storage for persistence
    const existing = JSON.parse(localStorage.getItem('universe_flow_tree_submissions') || '[]');
    localStorage.setItem('universe_flow_tree_submissions', JSON.stringify([submission, ...existing]));

    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setNickname('');
    setEmail('');
    setContent('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0e1324] border border-purple-500/40 rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden animate-in fade-in duration-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-purple-900/40 border border-purple-500/30 flex items-center justify-center">
              <Heart className="w-4 h-4 text-purple-400 fill-purple-400/30" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100">粉絲樹洞投書箱</h3>
              <p className="text-xs text-slate-400">寫下你的心事，讓宇宙接住你的情緒</p>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="p-1.5 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center shadow-lg">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-slate-100">信件已送達宇宙樹洞</h4>
            <p className="text-sm text-slate-300 leading-relaxed max-w-sm mx-auto">
              謝謝你的信任與勇氣。你的脆弱從不可恥，它見證著你認真生活的痕跡。
              Roger 會用心閱讀每一封信，期待在節目中陪伴你。
            </p>
            <div className="pt-4">
              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium text-sm transition-all shadow-md shadow-purple-600/30"
              >
                好的，我知道了
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  你的稱呼 / 筆名
                </label>
                <input
                  type="text"
                  placeholder="留空即為匿名旅人"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className="w-full px-3 py-2 bg-[#090d19] border border-slate-700 rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Email 信箱（選填）
                </label>
                <input
                  type="email"
                  placeholder="若希望收到個別回信可留"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-[#090d19] border border-slate-700 rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                煩惱類型
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 bg-[#090d19] border border-slate-700 rounded-lg text-sm text-slate-200 focus:outline-none focus:border-purple-500"
              >
                <option value="感情困擾">感情困擾（分手、暗戀、溝通障礙）</option>
                <option value="人際焦慮">人際焦慮（覺得被排擠、討好型人格）</option>
                <option value="職場生活">職場生活（倦怠、迷惘、價值感喪失）</option>
                <option value="自我懷疑">自我懷疑（內在審判、無法和解）</option>
                <option value="生活瑣事">生活瑣事與突發崩潰</option>
                <option value="其他心情">其他想要分享的心情</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                想和 Roger 聊的心事 *
              </label>
              <textarea
                required
                rows={5}
                placeholder="最近發生了什麼事？心裡卡在哪個地方？慢慢寫，宇宙會好好傾聽你的聲音……"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#090d19] border border-slate-700 rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500 leading-relaxed resize-none"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="allowBroadcast"
                checked={allowBroadcast}
                onChange={(e) => setAllowBroadcast(e.target.checked)}
                className="rounded border-slate-700 bg-slate-900 text-purple-600 focus:ring-purple-500"
              />
              <label htmlFor="allowBroadcast" className="text-xs text-slate-400 cursor-pointer">
                同意 Roger 在《粉絲樹洞》單集中化名分享並提供覺察視角
              </label>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-purple-600/30 transition-all"
              >
                <Send className="w-4 h-4" />
                投入樹洞信箱
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
