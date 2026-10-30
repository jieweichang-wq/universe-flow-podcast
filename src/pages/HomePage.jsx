import React from 'react';
import HeroSection from '../components/HeroSection';
import EpisodeList from '../components/EpisodeList';
import AboutSection from '../components/AboutSection';
import InstagramSection from '../components/InstagramSection';
import BlogPreviewSection from '../components/BlogPreviewSection';
import MerchSection from '../components/MerchSection';

export default function HomePage({
  episodes,
  currentEpisode,
  isPlaying,
  onPlayEpisode,
  onNavigateBlog,
  onSelectArticle
}) {
  return (
    <>
      {/* Hero Section */}
      <HeroSection
        latestEpisode={episodes[0]}
        onPlayEpisode={onPlayEpisode}
      />

      {/* 306+ Episodes Catalog */}
      <EpisodeList
        episodes={episodes}
        currentEpisode={currentEpisode}
        isPlaying={isPlaying}
        onPlayEpisode={onPlayEpisode}
      />

      {/* About Roger & Brand Philosophy */}
      <AboutSection />

      {/* Core Social Community: Official Instagram Live Hub */}
      <InstagramSection />

      {/* Blog Preview Section (Teaser with Link to Dedicated Blog Page) */}
      <BlogPreviewSection
        episodes={episodes}
        onPlayEpisode={onPlayEpisode}
        onNavigateBlog={onNavigateBlog}
        onSelectArticle={onSelectArticle}
      />

      {/* Merchandise Showcase & Pre-order Registration */}
      <MerchSection />
    </>
  );
}
