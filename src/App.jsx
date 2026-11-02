import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import AmbientCanvas from './components/AmbientCanvas';
import { sanctuaryAudio } from './utils/audio';

export default function App() {
  const [isAudioMuted, setIsAudioMuted] = useState(true);

  const handleToggleAudio = () => {
    const isPlaying = sanctuaryAudio.toggle();
    setIsAudioMuted(!isPlaying);
  };

  const handleScrollClick = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  };

  return (
    <div className="relative min-h-screen w-full bg-forest-950 text-sand-100 flex flex-col justify-between overflow-x-hidden selection:bg-gold-500/20 selection:text-gold-200">
      {/* Delicate Architectural Outer Framing Hairlines (Desktop) */}
      <div className="pointer-events-none fixed inset-4 z-50 border border-gold-500/10 hidden lg:block" aria-hidden="true">
        {/* Subtle Architectural Corner Pins */}
        <span className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-gold-400/50" />
        <span className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-gold-400/50" />
        <span className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-gold-400/50" />
        <span className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-gold-400/50" />
      </div>

      {/* Ambient Canvas (Floating golden ambient motes) */}
      <AmbientCanvas />

      {/* Header */}
      <Header isMuted={isAudioMuted} onToggleAudio={handleToggleAudio} />

      {/* Full-screen Hero Section */}
      <main className="flex-1 flex flex-col justify-center">
        <Hero onScrollClick={handleScrollClick} />
      </main>

      {/* Minimal Footer */}
      <Footer />
    </div>
  );
}

