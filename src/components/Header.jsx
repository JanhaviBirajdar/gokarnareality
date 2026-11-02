import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Volume2, VolumeX } from 'lucide-react';
import BrandLogo from './BrandLogo';

export default function Header({ isMuted, onToggleAudio }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-40 w-full px-6 py-6 md:px-12 lg:px-16"
    >
      <div className="mx-auto max-w-7xl flex items-center justify-between">
        {/* Brand Name & Animated Monogram */}
        <BrandLogo size="default" />

        {/* Center / Right subtle bespoke indicators */}
        <div className="flex items-center gap-5 md:gap-8">
          {/* Coordinates indicator with spinning compass */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="hidden sm:flex items-center gap-2 text-[11px] font-mono tracking-widest text-sand-400/80 uppercase"
          >
            <Compass className="w-3.5 h-3.5 text-gold-400/70 animate-spin-very-slow" />
            <span>14.5479° N, 74.3188° E</span>
          </motion.div>

          {/* Sound of Sanctuary - Audio Ambience Toggle with Animated Equalizer Bars */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={onToggleAudio}
            type="button"
            className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-gold-500/25 bg-forest-900/50 backdrop-blur-md text-sand-300 hover:text-gold-200 hover:border-gold-500/50 hover:shadow-[0_0_15px_rgba(223,183,82,0.15)] transition-all duration-300 text-[11px] tracking-wider uppercase group"
            title={isMuted ? "Unmute sanctuary ambient tone" : "Mute ambient tone"}
            aria-label={isMuted ? "Unmute sanctuary ambient tone" : "Mute ambient tone"}
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5 text-sand-400 group-hover:text-gold-300 transition-colors" />
            ) : (
              <div className="flex items-center gap-0.5 h-3.5">
                {[0.6, 1, 0.4, 0.8].map((speed, i) => (
                  <motion.span
                    key={i}
                    animate={{
                      scaleY: [0.3, 1.2, 0.4, 1, 0.2],
                    }}
                    transition={{
                      duration: 1.2 * speed,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="w-0.5 h-3 bg-gold-400 rounded-full origin-bottom"
                  />
                ))}
              </div>
            )}
            <span className="hidden md:inline font-sans text-[10px] tracking-widest font-medium">
              {isMuted ? "Sound Off" : "Ambience On"}
            </span>
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
}
