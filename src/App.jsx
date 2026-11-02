import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
      {/* =========================================================================
          CINEMATIC INITIAL HORIZON UNVEIL BEAM (Plays once on page mount)
          ========================================================================= */}
      <motion.div
        initial={{ scaleX: 1, opacity: 1 }}
        animate={{ scaleX: 0, opacity: 0 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center origin-center"
      >
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gold-300 to-transparent shadow-[0_0_20px_#dfb752]" />
      </motion.div>

      {/* Delicate Architectural Outer Framing Hairlines (Desktop) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.8, delay: 0.5 }}
        className="pointer-events-none fixed inset-4 z-45 border border-gold-500/10 hidden lg:block"
        aria-hidden="true"
      >
        {/* Subtle Architectural Corner Pins */}
        <span className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-gold-400/60" />
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-gold-400/60" />
        <span className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-gold-400/60" />
        <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-gold-400/60" />
      </motion.div>

      {/* Ambient Canvas (Floating golden ambient motes with interactive burst) */}
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
