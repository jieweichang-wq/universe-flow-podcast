import React, { useState, useEffect } from 'react';
import StarfieldCanvas from './components/StarfieldCanvas';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AudioPlayer from './components/AudioPlayer';
import BackToTop from './components/BackToTop';

import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';

import episodesData from './data/episodes.json';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'blog'
  const [activeArticleId, setActiveArticleId] = useState(null);
  const [currentEpisode, setCurrentEpisode] = useState(episodesData[0] || null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayer, setShowPlayer] = useState(true);

  // Sync with browser hash if user bookmarks or presses back/forward
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#blog/')) {
        const id = hash.replace('#blog/', '');
        setCurrentPage('blog');
        setActiveArticleId(id);
      } else if (hash === '#blog') {
        setCurrentPage('blog');
        setActiveArticleId(null);
      } else if (!hash || hash === '#' || hash === '#home') {
        setCurrentPage('home');
        setActiveArticleId(null);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigateHome = () => {
    setCurrentPage('home');
    setActiveArticleId(null);
    window.location.hash = '#home';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateBlog = () => {
    setCurrentPage('blog');
    setActiveArticleId(null);
    window.location.hash = '#blog';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectArticle = (articleId) => {
    setCurrentPage('blog');
    setActiveArticleId(articleId);
    window.location.hash = `#blog/${articleId}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlayEpisode = (episode) => {
    if (currentEpisode?.id === episode.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentEpisode(episode);
      setIsPlaying(true);
      setShowPlayer(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#080b14] text-slate-100 relative selection:bg-purple-600 selection:text-white">
      {/* Dynamic Cosmic Starfield Background */}
      <StarfieldCanvas />

      {/* Main Container */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Navigation Bar */}
        <Navbar
          currentPage={currentPage}
          onNavigateHome={handleNavigateHome}
          onNavigateBlog={handleNavigateBlog}
        />

        {/* Multi-Page Route Render */}
        <main className="flex-1">
          {currentPage === 'home' ? (
            <HomePage
              episodes={episodesData}
              currentEpisode={currentEpisode}
              isPlaying={isPlaying}
              onPlayEpisode={handlePlayEpisode}
              onNavigateBlog={handleNavigateBlog}
              onSelectArticle={handleSelectArticle}
            />
          ) : (
            <BlogPage
              episodes={episodesData}
              onPlayEpisode={handlePlayEpisode}
              onNavigateHome={handleNavigateHome}
              activeArticleId={activeArticleId}
              setActiveArticleId={(id) => {
                setActiveArticleId(id);
                if (id) {
                  window.location.hash = `#blog/${id}`;
                } else {
                  window.location.hash = '#blog';
                }
              }}
            />
          )}
        </main>

        {/* Global Footer */}
        <Footer
          onNavigateHome={handleNavigateHome}
          onNavigateBlog={handleNavigateBlog}
        />
      </div>

      {/* Floating Back-To-Top Button */}
      <BackToTop />

      {/* Persistent Global Sticky Audio Player (Audio keeps playing across pages!) */}
      {showPlayer && currentEpisode && (
        <AudioPlayer
          currentEpisode={currentEpisode}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          onClose={() => {
            setIsPlaying(false);
            setShowPlayer(false);
          }}
        />
      )}
    </div>
  );
}
