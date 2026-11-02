import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Sparkles, ChevronDown } from 'lucide-react';

export default function Hero({ onScrollClick }) {
  // Mouse parallax motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for fluid, weighted luxury physics
  const springConfig = { damping: 28, stiffness: 50, mass: 0.9 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Background Parallax
  const bgTranslateX = useTransform(smoothX, [-0.5, 0.5], ['-18px', '18px']);
  const bgTranslateY = useTransform(smoothY, [-0.5, 0.5], ['-14px', '14px']);

  // Floating elements counter-parallax
  const decorTranslateX = useTransform(smoothX, [-0.5, 0.5], ['25px', '-25px']);
  const decorTranslateY = useTransform(smoothY, [-0.5, 0.5], ['20px', '-20px']);

  // 3D Card Tilt for central typography
  const tiltRotateX = useTransform(smoothY, [-0.5, 0.5], ['6deg', '-6deg']);
  const tiltRotateY = useTransform(smoothX, [-0.5, 0.5], ['-6deg', '6deg']);

  // Dynamic cursor ambient light coordinates
  const [cursorPos, setCursorPos] = useState({ x: -200, y: -200 });
  const [isHovered, setIsHovered] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const normalizedX = e.clientX / innerWidth - 0.5;
      const normalizedY = e.clientY / innerHeight - 0.5;
      mouseX.set(normalizedX);
      mouseY.set(normalizedY);
      setCursorPos({ x: e.clientX, y: e.clientY });
      setIsHovered(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Staggered reveal variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.4,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  // Masked word variants for editorial title reveal
  const wordVariants = {
    hidden: { y: '110%', opacity: 0 },
    visible: {
      y: '0%',
      opacity: 1,
      transition: {
        duration: 1.1,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section className="relative min-h-[calc(100vh-92px)] flex flex-col justify-between items-center px-6 md:px-12 lg:px-16 overflow-hidden perspective-[1200px]">
      {/* =========================================================================
          1. CINEMATIC BACKGROUND LAYER: VILLA + KEN BURNS + PARALLAX + OVERLAYS
          ========================================================================= */}
      <motion.div
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none"
        style={{
          x: bgTranslateX,
          y: bgTranslateY,
        }}
      >
        {/* Living Cinematic Villa Photography with continuous slow Ken Burns drift */}
        <motion.div
          animate={{
            scale: [1.02, 1.08, 1.02],
            x: ['0%', '1.5%', '-1%', '0%'],
            y: ['0%', '-1.2%', '1%', '0%'],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="w-full h-full"
        >
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2880&q=85"
            alt="Modern luxury architectural villa enveloped in pristine greenery"
            className={`w-full h-full object-cover object-center transition-all duration-1000 ease-out ${
              imgLoaded ? 'opacity-100 filter-none' : 'opacity-0 blur-sm'
            }`}
            onLoad={() => setImgLoaded(true)}
            loading="eager"
          />
        </motion.div>

        {/* Cinematic Deep Forest Green & Dark Overlays */}
        <div className="absolute inset-0 bg-forest-950/75 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/60 to-forest-950/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-950/90 via-transparent to-forest-950/90" />

        {/* Dynamic Vignette effect */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 50% 45%, transparent 22%, rgba(4, 11, 8, 0.72) 72%, rgba(4, 11, 8, 0.98) 100%)',
          }}
        />

        {/* Luxury Film Grain Overlay */}
        <div className="absolute inset-0 bg-grain pointer-events-none opacity-40" />
      </motion.div>

      {/* =========================================================================
          2. ROTATING ARCHITECTURAL COMPASS / ASTROLABE (Background Geometry)
          ========================================================================= */}
      <motion.div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-[480px] h-[480px] md:w-[700px] md:h-[700px] rounded-full border border-gold-500/10 opacity-30 select-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 110, repeat: Infinity, ease: 'linear' }}
        aria-hidden="true"
      >
        {/* Inner concentric ring */}
        <div className="absolute inset-8 rounded-full border border-gold-400/10 border-dashed" />
        <div className="absolute inset-20 rounded-full border border-gold-400/5" />

        {/* Cardinal tick lines */}
        <span className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-4 bg-gold-400/30" />
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-4 bg-gold-400/30" />
        <span className="absolute left-0 top-1/2 -translate-y-1/2 h-[1px] w-4 bg-gold-400/30" />
        <span className="absolute right-0 top-1/2 -translate-y-1/2 h-[1px] w-4 bg-gold-400/30" />

        {/* 45-degree corner accent diamonds */}
        <span className="absolute top-1/4 left-1/4 w-1.5 h-1.5 rotate-45 border border-gold-400/20" />
        <span className="absolute top-1/4 right-1/4 w-1.5 h-1.5 rotate-45 border border-gold-400/20" />
        <span className="absolute bottom-1/4 left-1/4 w-1.5 h-1.5 rotate-45 border border-gold-400/20" />
        <span className="absolute bottom-1/4 right-1/4 w-1.5 h-1.5 rotate-45 border border-gold-400/20" />
      </motion.div>

      {/* =========================================================================
          3. INTERACTIVE CURSOR AMBIENT GLOW
          ========================================================================= */}
      {isHovered && (
        <div
          className="pointer-events-none fixed z-15 w-[650px] h-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full transition-transform duration-75 ease-out hidden lg:block"
          style={{
            left: `${cursorPos.x}px`,
            top: `${cursorPos.y}px`,
            background:
              'radial-gradient(circle, rgba(223, 183, 82, 0.08) 0%, rgba(38, 84, 68, 0.04) 45%, transparent 70%)',
          }}
          aria-hidden="true"
        />
      )}

      {/* =========================================================================
          4. FLOATING ARCHITECTURAL CORNER ELEMENTS (Animated Entrance)
          ========================================================================= */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-20 hidden md:block"
        style={{
          x: decorTranslateX,
          y: decorTranslateY,
        }}
        aria-hidden="true"
      >
        {/* Top Left Hairline Blueprint Tag */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.4, delay: 0.6 }}
          className="absolute top-8 left-10 flex flex-col gap-1 text-[10px] font-mono tracking-widest text-gold-400/60 uppercase"
        >
          <div className="flex items-center gap-2">
            <span className="text-gold-300 font-bold">+</span>
            <span>SANCTUARY RESIDENCES // 2026</span>
          </div>
          <div className="w-24 h-[1px] bg-gradient-to-r from-gold-500/40 to-transparent" />
        </motion.div>

        {/* Top Right Hairline Blueprint Tag */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.4, delay: 0.6 }}
          className="absolute top-8 right-10 flex flex-col items-end gap-1 text-[10px] font-mono tracking-widest text-gold-400/60 uppercase"
        >
          <div className="flex items-center gap-2">
            <span>KARNATAKA COASTLINE</span>
            <span className="text-gold-300 font-bold">+</span>
          </div>
          <div className="w-24 h-[1px] bg-gradient-to-l from-gold-500/40 to-transparent" />
        </motion.div>

        {/* Gentle floating rings */}
        <motion.div
          animate={{
            y: [0, -14, 0],
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{
            y: { duration: 7, repeat: Infinity, ease: 'easeInOut' },
            rotate: { duration: 60, repeat: Infinity, ease: 'linear' },
          }}
          className="absolute top-1/4 right-[9%] w-28 h-28 rounded-full border border-gold-500/10 pointer-events-none"
        />

        <motion.div
          animate={{
            y: [0, 12, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1.5,
          }}
          className="absolute top-1/3 left-[8%] w-16 h-16 rounded-full border border-gold-500/10 pointer-events-none"
        />
      </motion.div>

      {/* =========================================================================
          5. MAIN HERO CONTENT WITH 3D TILT & MASKED EDITORIAL TEXT REVEALS
          ========================================================================= */}
      <motion.div
        style={{
          rotateX: tiltRotateX,
          rotateY: tiltRotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative z-30 my-auto w-full max-w-5xl text-center flex flex-col items-center py-8 md:py-14 transition-transform duration-200"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Animated Badge: WEBSITE UNDER CONSTRUCTION */}
          <motion.div variants={itemVariants} className="mb-6 md:mb-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="shimmer-glow relative inline-flex items-center gap-2.5 px-4 py-2 md:px-5 md:py-2.5 rounded-full bg-forest-900/70 backdrop-blur-md border border-gold-400/40 shadow-[0_8px_32px_rgba(0,0,0,0.5)] cursor-default transition-all duration-300 hover:border-gold-300"
            >
              {/* Concentric Pulsing Green/Gold Radar Dot with Multiple Waves */}
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-60" />
                <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-40 scale-125" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-gold-400 shadow-[0_0_10px_#dfb752]" />
              </span>

              {/* Badge Text */}
              <span className="font-montserrat text-[10px] md:text-xs font-semibold uppercase tracking-[0.24em] text-sand-100 flex items-center gap-1.5">
                Website Under Construction
                <Sparkles className="w-3.5 h-3.5 text-gold-300 inline-block animate-pulse-subtle" />
              </span>
            </motion.div>
          </motion.div>

          {/* Minimal COMING SOON Label with animated expanding hairline dividers */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-4 mb-4 md:mb-6"
          >
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 0.6 }}
              className="h-[1px] w-10 md:w-20 bg-gradient-to-r from-transparent via-gold-400/40 to-gold-400 origin-right"
            />
            <span className="font-montserrat font-medium text-[11px] md:text-xs uppercase tracking-[0.45em] text-gold-300 drop-shadow-sm">
              Coming Soon
            </span>
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 0.6 }}
              className="h-[1px] w-10 md:w-20 bg-gradient-to-l from-transparent via-gold-400/40 to-gold-400 origin-left"
            />
          </motion.div>

          {/* Main Headline: 'Something Extraordinary Is Taking Shape.' */}
          <div className="overflow-hidden py-1">
            <motion.h1
              variants={itemVariants}
              className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[82px] font-normal leading-[1.12] tracking-[-0.015em] text-sand-50 max-w-4xl mx-auto drop-shadow-lg mb-6 md:mb-8"
            >
              <span className="inline-block">Something</span>{' '}
              <motion.span
                animate={{
                  textShadow: [
                    '0 0 15px rgba(223, 183, 82, 0.2)',
                    '0 0 30px rgba(223, 183, 82, 0.5)',
                    '0 0 15px rgba(223, 183, 82, 0.2)',
                  ],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="font-serif italic font-normal gold-shimmer-text inline-block"
              >
                Extraordinary
              </motion.span>{' '}
              <span className="inline-block">
                Is Taking Shape
                <span className="text-gold-400 font-serif animate-pulse">.</span>
              </span>
            </motion.h1>
          </div>

          {/* Supporting Text */}
          <motion.p
            variants={itemVariants}
            className="font-sans text-sand-200/90 text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto px-4 md:px-0"
          >
            We're crafting a new digital experience to help you discover exceptional
            properties and extraordinary spaces.
          </motion.p>

          {/* Bespoke Luxury Signature Accent with subtle pulse */}
          <motion.div
            variants={itemVariants}
            className="mt-8 md:mt-10 flex items-center gap-3 text-[11px] font-mono tracking-widest text-gold-400/70 uppercase"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400/80 animate-ping" />
            <span>Curated Sanctuaries & Coastal Estates</span>
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400/80" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* =========================================================================
          6. ANIMATED SCROLL / DISCOVERY INDICATOR (Beacon Wave Ripple)
          ========================================================================= */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 1.2 }}
        className="relative z-30 pb-6 md:pb-8 flex flex-col items-center"
      >
        <button
          onClick={onScrollClick}
          type="button"
          className="group flex flex-col items-center gap-2 cursor-pointer focus:outline-none"
          aria-label="Scroll to discover brand vision"
        >
          {/* Animated Scroll Mouse / Capsule */}
          <div className="relative w-5 h-9 rounded-full border border-gold-400/40 group-hover:border-gold-300 flex justify-center p-1 bg-forest-950/50 backdrop-blur-sm transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(223,183,82,0.3)]">
            {/* Sliding golden bead */}
            <motion.div
              animate={{
                y: [0, 14, 0],
                opacity: [1, 0.3, 1],
                scale: [1, 0.85, 1],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="w-1 h-2 rounded-full bg-gold-300 shadow-[0_0_8px_#dfb752]"
            />

            {/* Subtle beacon ripple expanding downwards */}
            <motion.span
              animate={{
                scale: [1, 1.8],
                opacity: [0.6, 0],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: 'easeOut',
              }}
              className="absolute inset-0 rounded-full border border-gold-400/30 pointer-events-none"
            />
          </div>

          <span className="font-montserrat text-[9px] md:text-[10px] tracking-[0.4em] text-sand-300 uppercase transition-colors duration-300 group-hover:text-gold-200">
            Discover
          </span>

          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-3.5 h-3.5 text-gold-400/70 -mt-1 group-hover:text-gold-300" />
          </motion.div>
        </button>
      </motion.div>
    </section>
  );
}
