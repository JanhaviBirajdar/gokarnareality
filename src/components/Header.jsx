import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Volume2, VolumeX } from 'lucide-react';
import BrandLogo from './BrandLogo';

export default function Header({ isMuted, onToggleAudio }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-40 w-full px-6 py-6 md:px-12 lg:px-16"
    >
      <div className="mx-auto max-w-7xl flex items-center justify-between">
        {/* Brand Name & Monogram */}
        <BrandLogo size="default" />

        {/* Center / Right subtle bespoke indicators */}
        <div className="flex items-center gap-6 md:gap-8">
          {/* Coordinates indicator - visible on tablet & up */}
          <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono tracking-widest text-sand-400/80 uppercase">
            <Compass className="w-3.5 h-3.5 text-gold-400/70 animate-spin-very-slow" />
            <span>14.5479° N, 74.3188° E</span>
          </div>

          {/* Sound of Sanctuary - Audio Ambience Toggle */}
          <button
            onClick={onToggleAudio}
            type="button"
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold-500/20 bg-forest-900/40 backdrop-blur-md text-sand-300 hover:text-gold-200 hover:border-gold-500/40 transition-all duration-300 text-[11px] tracking-wider uppercase group"
            title={isMuted ? "Unmute sanctuary ambient tone" : "Mute ambient tone"}
            aria-label={isMuted ? "Unmute sanctuary ambient tone" : "Mute ambient tone"}
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5 text-sand-400 group-hover:text-gold-300 transition-colors" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-gold-400 animate-pulse-subtle" />
            )}
            <span className="hidden md:inline font-sans text-[10px] tracking-widest">
              {isMuted ? "Sound Off" : "Ambience"}
            </span>
          </button>
        </div>
      </div>
    </motion.header>
  );
}

