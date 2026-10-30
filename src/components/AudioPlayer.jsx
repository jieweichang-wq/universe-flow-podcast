import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  RotateCw, 
  Volume2, 
  VolumeX, 
  X, 
  ChevronUp, 
  Radio, 
  Sparkles,
  ExternalLink 
} from 'lucide-react';

export default function AudioPlayer({ currentEpisode, isPlaying, setIsPlaying, onClose }) {
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // When episode changes, load and play
  useEffect(() => {
    if (!currentEpisode || !audioRef.current) return;
    audioRef.current.src = currentEpisode.audioUrl;
    audioRef.current.playbackRate = playbackRate;
    audioRef.current.volume = isMuted ? 0 : volume;

    if (isPlaying) {
      audioRef.current.play().catch((err) => {
        console.warn('Autoplay prevented or audio load error:', err);
        setIsPlaying(false);
      });
    }
  }, [currentEpisode]);

  // Sync isPlaying with audio element
  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch(() => setIsPlaying(false));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(console.warn);
    }
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return;
    setDuration(audioRef.current.duration || currentEpisode?.durationSec || 0);
  };

  const handleSeek = (e) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const skipTime = (seconds) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.min(
      Math.max(0, audioRef.current.currentTime + seconds),
      duration || 999999
    );
  };

  const cyclePlaybackRate = () => {
    const rates = [1, 1.25, 1.5, 2.0];
    const nextIdx = (rates.indexOf(playbackRate) + 1) % rates.length;
    const nextRate = rates[nextIdx];
    setPlaybackRate(nextRate);
    if (audioRef.current) {
      audioRef.current.playbackRate = nextRate;
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    audioRef.current.volume = nextMuted ? 0 : volume;
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    setIsMuted(val === 0);
    if (audioRef.current) {
      audioRef.current.volume = val;
    }
  };

  const formatTime = (timeInSec) => {
    if (isNaN(timeInSec) || timeInSec <= 0) return '00:00';
    const m = Math.floor(timeInSec / 60);
    const s = Math.floor(timeInSec % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (!currentEpisode) return null;

  return (
    <>
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />

      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0c101d]/95 backdrop-blur-md border-t border-purple-500/20 shadow-2xl transition-all duration-300">
        {/* Progress Bar Top Edge */}
        <div className="relative w-full h-1.5 bg-slate-800 group cursor-pointer">
          <input
            type="range"
            min="0"
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
          <div
            className="h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-sky-400 relative transition-all"
            style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>

        {/* Player Controls Bar */}
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
          {/* Episode Info */}
          <div className="flex items-center gap-3 min-w-0 max-w-sm sm:max-w-md">
            <div className="relative shrink-0 w-12 h-12 rounded-lg overflow-hidden border border-purple-500/30 shadow-md">
              <img
                src={currentEpisode.cover}
                alt={currentEpisode.title}
                className="w-full h-full object-cover"
              />
              {isPlaying && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-0.5">
                  <span className="w-1 bg-sky-400 rounded-full wave-bar-1" />
                  <span className="w-1 bg-purple-400 rounded-full wave-bar-2" />
                  <span className="w-1 bg-sky-400 rounded-full wave-bar-3" />
                  <span className="w-1 bg-purple-400 rounded-full wave-bar-4" />
                </div>
              )}
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-semibold tracking-wider px-1.5 py-0.5 bg-purple-500/20 text-purple-300 rounded border border-purple-500/30">
                  {currentEpisode.category || '宇宙流'}
                </span>
                <span className="text-xs text-slate-400 hidden sm:inline">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>
              <h4 className="text-sm font-medium text-slate-100 truncate hover:text-sky-300 transition-colors">
                {currentEpisode.title}
              </h4>
            </div>
          </div>

          {/* Core Controls */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <button
              onClick={() => skipTime(-15)}
              className="p-2 text-slate-400 hover:text-sky-300 hover:bg-slate-800/60 rounded-full transition-all"
              title="倒退 15 秒"
            >
              <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <button
              onClick={togglePlay}
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white flex items-center justify-center shadow-lg shadow-purple-600/30 active:scale-95 transition-all"
              title={isPlaying ? '暫停' : '播放'}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 fill-current" />
              ) : (
                <Play className="w-5 h-5 fill-current ml-0.5" />
              )}
            </button>

            <button
              onClick={() => skipTime(15)}
              className="p-2 text-slate-400 hover:text-sky-300 hover:bg-slate-800/60 rounded-full transition-all"
              title="快進 15 秒"
            >
              <RotateCw className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Speed Rate Button */}
            <button
              onClick={cyclePlaybackRate}
              className="px-2 py-1 text-xs font-semibold text-purple-300 bg-purple-900/30 hover:bg-purple-800/40 border border-purple-500/30 rounded-md transition-colors"
              title="切換播放速度"
            >
              {playbackRate}x
            </button>
          </div>

          {/* Volume & Actions */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-2">
              <button
                onClick={toggleMute}
                className="text-slate-400 hover:text-slate-200 transition-colors"
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-4 h-4 text-red-400" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-20 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-500 hover:text-slate-300 hover:bg-slate-800 rounded-full transition-colors ml-2"
              title="關閉播放器"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
