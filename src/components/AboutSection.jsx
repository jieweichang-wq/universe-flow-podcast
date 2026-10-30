import React from 'react';
import { Sparkles, Heart, Mail, Compass, Radio, Users, MessageSquareQuote } from 'lucide-react';
import InstagramIcon from './InstagramIcon';

export default function AboutSection({ onOpenTreeHole }) {
  return (
    <section id="about" className="py-16 md:py-24 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>認識宇宙流</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            順應宇宙的流動，成為完整的自己
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3 leading-relaxed">
            這不是一個給予標準解答的講堂，而是一個陪你放慢腳步、向內探索的心靈避風港。
          </p>
        </div>

        {/* Brand Mission & Host Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          {/* Left: Host Roger Card */}
          <div className="lg:col-span-5 bg-gradient-to-b from-[#111628] to-[#0c101d] rounded-2xl border border-purple-500/30 p-8 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-purple-500/40 shadow-lg shrink-0">
                  <img
                    src="https://d3mww1g1pfq2pt.cloudfront.net/Avatar/ckpp8gmtxcbi708463itdb0t5/1674125530647.jpg"
                    alt="Roger"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-100">Roger</h3>
                  <p className="text-xs text-sky-400 font-medium">創作者 / 聲音陪伴者 / 自我覺察旅人</p>
                  <p className="text-xs text-slate-400 mt-0.5">《宇宙流》節目主持人</p>
                </div>
              </div>

              <div className="space-y-4 text-sm text-slate-300/90 leading-relaxed">
                <p>
                  「無論是工作上的焦慮、人際關係的拉扯，還是深夜裡突如其來的孤獨感……我總是相信，每個人內心都擁有一整座未被探索的宇宙。」
                </p>
                <p>
                  自 2021 年起，Roger 透過麥克風錄下了超過 300 多個深夜裡的思辨與對話。不說教、不灌雞湯，而是以最誠實的視角，陪你一起照見內心的傷痛、光芒與無限可能。
                </p>
              </div>
            </div>

            {/* Social / Email contact */}
            <div className="mt-8 pt-6 border-t border-slate-800/80 space-y-3">
              <a
                href="https://www.instagram.com/universe.flow2021/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#f09433] via-[#dc2743] to-[#bc1888] hover:opacity-95 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-pink-600/25 transition-all"
              >
                <InstagramIcon className="w-4 h-4" />
                追蹤 Roger 的 IG 官方社群 (@universe.flow2021)
              </a>

              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-slate-400">商務與節目合作</span>
                <a
                  href="mailto:universe.flow2021@gmail.com"
                  className="text-sky-300 hover:text-sky-200 flex items-center gap-1 font-medium transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  universe.flow2021@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Right: Three Core Values */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-4">
            <div className="p-6 rounded-2xl bg-[#0d1222]/90 border border-slate-800 hover:border-purple-500/40 transition-all flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-900/40 border border-purple-500/30 flex items-center justify-center shrink-0">
                <Compass className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-100 mb-1">
                  1. 自我覺察：打破原有思維的限制
                </h4>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  所有的焦慮與痛苦，往往來自於我們未曾檢視的信念枷鎖。透過提問與照見，看見盲點，重新擁有選擇的自由。
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#0d1222]/90 border border-slate-800 hover:border-sky-500/40 transition-all flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-sky-900/40 border border-sky-500/30 flex items-center justify-center shrink-0">
                <Radio className="w-6 h-6 text-sky-400" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-100 mb-1">
                  2. 影劇與人生哲思：用故事看見靈魂
                </h4>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  從《與神同行》看見自我內在審判，從日常小事解讀心理機制。藉由他人故事作為鏡子，梳理屬於你的真實經歷。
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#0d1222]/90 border border-slate-800 hover:border-emerald-500/40 transition-all flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-900/40 border border-emerald-500/30 flex items-center justify-center shrink-0">
                <Heart className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-100 mb-1">
                  3. 溫暖同頻：給孤獨者的樹洞
                </h4>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  在群體中感到格格不入並不可怕，因為同頻的人終會相聚。在這裡，你的脆弱會被溫柔接住。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tree Hole Banner Callout */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-purple-900/50 via-indigo-900/40 to-sky-950/50 border border-purple-500/40 p-8 sm:p-10 shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-300 bg-purple-950/80 px-2.5 py-1 rounded-md border border-purple-500/30 mb-3">
                <MessageSquareQuote className="w-3.5 h-3.5" />
                <span>專屬聽眾樹洞</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                心裡有事？來「粉絲樹洞」把煩惱留下來
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                生活中遇到了解不開的結、關係中的委屈、或無法向身邊人說出口的心事嗎？
                歡迎透過 Instagram 小盒子私訊你的故事，Roger 會在後續的《粉絲樹洞》單集中用溫暖的聲音陪伴你。
              </p>
            </div>

            <a
              href="https://www.instagram.com/universe.flow2021/"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#f09433] via-[#dc2743] to-[#bc1888] hover:opacity-95 text-white font-bold text-sm shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <InstagramIcon className="w-4 h-4" />
              前往 IG 私訊投書
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
