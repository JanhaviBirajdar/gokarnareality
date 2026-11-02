import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Sparkles, ChevronDown } from 'lucide-react';

export default function Hero({ onScrollClick }) {
  // Mouse parallax motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for fluid, weighted luxury physics
  const springConfig = { damping: 30, stiffness: 60, mass: 0.8 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Transform coordinates for background parallax
  const bgTranslateX = useTransform(smoothX, [-0.5, 0.5], ['-15px', '15px']);
  const bgTranslateY = useTransform(smoothY, [-0.5, 0.5], ['-12px', '12px']);

  // Transform coordinates for floating decorative elements
  const decorTranslateX = useTransform(smoothX, [-0.5, 0.5], ['20px', '-20px']);
  const decorTranslateY = useTransform(smoothY, [-0.5, 0.5], ['15px', '-15px']);

  // Dynamic cursor ambient light coordinates
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const normalizedX = (e.clientX / innerWidth) - 0.5;
      const normalizedY = (e.clientY / innerHeight) - 0.5;
      mouseX.set(normalizedX);
      mouseY.set(normalizedY);
      setCursorPos({ x: e.clientX, y: e.clientY });
      setIsHovered(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Stagger animation container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.1,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section className="relative min-h-[calc(100vh-88px)] flex flex-col justify-between items-center px-6 md:px-12 lg:px-16 overflow-hidden">
      {/* =========================================================================
          BACKGROUND LAYER: LUXURY VILLA + PARALLAX + TRANSPARENT OVERLAYS
          ========================================================================= */}
      <motion.div
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none scale-105"
        style={{
          x: bgTranslateX,
          y: bgTranslateY,
        }}
      >
        {/* High-quality background image of a modern luxury villa surrounded by greenery */}
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2880&q=85"
          alt="Modern luxury architectural villa enveloped in pristine greenery"
          className={`w-full h-full object-cover object-center transition-all duration-1000 ease-out scale-100 ${
            imgLoaded ? 'opacity-100 filter-none' : 'opacity-0 blur-sm'
          }`}
          onLoad={() => setImgLoaded(true)}
          loading="eager"
        />

        {/* Cinematic Deep Forest Green & Dark Overlays */}
        <div className="absolute inset-0 bg-forest-950/75 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/60 to-forest-950/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-950/90 via-transparent to-forest-950/90" />

        {/* Vignette effect */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 50% 45%, transparent 20%, rgba(4, 11, 8, 0.7) 70%, rgba(4, 11, 8, 0.98) 100%)',
          }}
        />

        {/* Luxury Film Grain Overlay */}
        <div className="absolute inset-0 bg-grain pointer-events-none opacity-40" />
      </motion.div>

      {/* =========================================================================
          INTERACTIVE CURSOR AMBIENT GLOW (follows mouse softly)
          ========================================================================= */}
      {isHovered && (
        <div
          className="pointer-events-none fixed z-10 w-[550px] h-[550px] -translate-x-1/2 -translate-y-1/2 rounded-full transition-transform duration-100 ease-out hidden lg:block"
          style={{
            left: `${cursorPos.x}px`,
            top: `${cursorPos.y}px`,
            background:
              'radial-gradient(circle, rgba(223, 183, 82, 0.08) 0%, rgba(38, 84, 68, 0.04) 40%, transparent 70%)',
          }}
          aria-hidden="true"
        />
      )}

      {/* =========================================================================
          FLOATING ARCHITECTURAL DECORATIVE ELEMENTS
          ========================================================================= */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-20 hidden md:block"
        style={{
          x: decorTranslateX,
          y: decorTranslateY,
        }}
        aria-hidden="true"
      >
        {/* Top Left Hairline Crosshair */}
        <div className="absolute top-12 left-12 flex flex-col gap-1 text-[10px] font-mono tracking-widest text-gold-400/50 uppercase">
          <div className="flex items-center gap-1.5">
            <span className="text-gold-400">+</span>
            <span>SPEC: 01 // RESIDENCE</span>
          </div>
          <div className="w-16 h-[1px] bg-gradient-to-r from-gold-500/30 to-transparent" />
        </div>

        {/* Top Right Hairline Crosshair */}
        <div className="absolute top-12 right-12 flex flex-col items-end gap-1 text-[10px] font-mono tracking-widest text-gold-400/50 uppercase">
          <div className="flex items-center gap-1.5">
            <span>KARNATAKA COAST</span>
            <span className="text-gold-400">+</span>
          </div>
          <div className="w-16 h-[1px] bg-gradient-to-l from-gold-500/30 to-transparent" />
        </div>

        {/* Floating Delicate Geometric Accents */}
        <div className="absolute top-1/4 right-[8%] w-32 h-32 rounded-full border border-gold-500/10 pointer-events-none animate-float-slow" />
        <div className="absolute top-1/3 left-[7%] w-20 h-20 rounded-full border border-gold-500/10 pointer-events-none animate-float-slow [animation-delay:2s]" />
      </motion.div>

      {/* =========================================================================
          MAIN HERO CONTENT (Staggered Animations, Typography, Badges)
          ========================================================================= */}
      <div className="relative z-30 my-auto w-full max-w-5xl text-center flex flex-col items-center py-10 md:py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* 1. Animated Badge: WEBSITE UNDER CONSTRUCTION */}
          <motion.div variants={itemVariants} className="mb-6 md:mb-8">
            <div className="shimmer-glow relative inline-flex items-center gap-2.5 px-4 py-1.5 md:px-5 md:py-2 rounded-full bg-forest-900/60 backdrop-blur-md border border-gold-500/30 shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
              {/* Concentric Pulsing Green/Gold Radar Dot */}
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gold-400 shadow-[0_0_8px_#dfb752]" />
              </span>

              {/* Badge Text */}
              <span className="font-montserrat text-[10px] md:text-xs font-semibold uppercase tracking-[0.22em] text-sand-100 flex items-center gap-1.5">
                Website Under Construction
                <Sparkles className="w-3 h-3 text-gold-400/90 inline-block ml-0.5" />
              </span>
            </div>
          </motion.div>

          {/* 2. Minimal COMING SOON Label with hairline luxury dividers */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-4 mb-4 md:mb-6"
          >
            <span className="h-[1px] w-8 md:w-16 bg-gradient-to-r from-transparent to-gold-400/60" />
            <span className="font-montserrat font-medium text-[11px] md:text-xs uppercase tracking-[0.4em] text-gold-300">
              Coming Soon
            </span>
            <span className="h-[1px] w-8 md:w-16 bg-gradient-to-l from-transparent to-gold-400/60" />
          </motion.div>

          {/* 3. Main Headline: 'Something Extraordinary Is Taking Shape.' */}
          <motion.h1
            variants={itemVariants}
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px] font-normal leading-[1.12] tracking-[-0.015em] text-sand-50 max-w-4xl mx-auto drop-shadow-sm mb-6 md:mb-8"
          >
            Something{' '}
            <span className="font-serif italic font-normal gold-shimmer-text">
              Extraordinary
            </span>{' '}
            Is Taking Shape<span className="text-gold-400 font-serif">.</span>
          </motion.h1>

          {/* 4. Supporting Text */}
          <motion.p
            variants={itemVariants}
            className="font-sans text-sand-200/90 text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto px-4 md:px-0"
          >
            We're crafting a new digital experience to help you discover exceptional
            properties and extraordinary spaces.
          </motion.p>

          {/* 5. Bespoke Luxury Seal / Signature Accent */}
          <motion.div
            variants={itemVariants}
            className="mt-8 md:mt-10 flex items-center gap-3 text-[11px] font-mono tracking-widest text-gold-400/60 uppercase"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400/60" />
            <span>Curated Sanctuaries & Coastal Estates</span>
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400/60" />
          </motion.div>
        </motion.div>
      </div>

      {/* =========================================================================
          ANIMATED SCROLL / DISCOVERY INDICATOR
          ========================================================================= */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="relative z-30 pb-6 md:pb-8 flex flex-col items-center"
      >
        <button
          onClick={onScrollClick}
          type="button"
          className="group flex flex-col items-center gap-2 cursor-pointer focus:outline-none"
          aria-label="Scroll to discover more details"
        >
          {/* Animated Scroll Mouse / Capsule */}
          <div className="w-5 h-9 rounded-full border border-gold-400/40 group-hover:border-gold-300 flex justify-center p-1 bg-forest-950/40 backdrop-blur-sm transition-colors duration-300">
            <motion.div
              animate={{
                y: [0, 14, 0],
                opacity: [1, 0.3, 1],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="w-1 h-2 rounded-full bg-gold-300 shadow-[0_0_6px_#dfb752]"
            />
          </div>

          <span className="font-montserrat text-[9px] md:text-[10px] tracking-[0.35em] text-sand-300 uppercase transition-colors duration-300 group-hover:text-gold-200">
            Discover
          </span>

          <ChevronDown className="w-3.5 h-3.5 text-gold-400/70 -mt-1 group-hover:translate-y-0.5 transition-transform duration-300" />
        </button>
      </motion.div>
    </section>
  );
}

