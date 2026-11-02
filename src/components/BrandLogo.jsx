import React from 'react';
import { motion } from 'framer-motion';

export default function BrandLogo({ size = "default", className = "" }) {
  const isLarge = size === "large";

  return (
    <div className={`flex items-center gap-3.5 select-none ${className}`}>
      {/* Bespoke Architectural Monogram with Path Drawing Animation */}
      <div className="relative group cursor-pointer">
        <svg
          className={`${isLarge ? 'w-11 h-11' : 'w-9 h-9'} transition-transform duration-700 ease-out group-hover:scale-110`}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="goldMonogram" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FBF4DC" />
              <stop offset="50%" stopColor="#DFB752" />
              <stop offset="100%" stopColor="#9C7721" />
            </linearGradient>
            <linearGradient id="goldInnerGlow" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#DFB752" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          {/* Outer Octagonal Frame with animated stroke draw */}
          <motion.polygon
            points="24,2 43,11 43,37 24,46 5,37 5,11"
            stroke="url(#goldMonogram)"
            strokeWidth="1.2"
            fill="url(#goldInnerGlow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            className="transition-all duration-700 group-hover:stroke-gold-300"
          />

          {/* Inner Architectural Portal / Archway */}
          <motion.path
            d="M17 38V22C17 18.134 20.134 15 24 15C27.866 15 31 18.134 31 22V38"
            stroke="url(#goldMonogram)"
            strokeWidth="1.2"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Monogram Geometric Lines */}
          <motion.path
            d="M27 22H21C19.3431 22 18 23.3431 18 25C18 26.6569 19.3431 28 21 28H25.5V33"
            stroke="url(#goldMonogram)"
            strokeWidth="1.2"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Central Keystone Diamond Accent */}
          <motion.polygon
            points="24,9 26,12 24,15 22,12"
            fill="url(#goldMonogram)"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2, ease: "easeOut" }}
          />
        </svg>

        {/* Ambient Glow behind monogram with pulse */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 bg-gold-400/25 blur-lg rounded-full pointer-events-none"
        />
      </div>

      {/* Brand Typography with animated character tracking reveal */}
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col tracking-widest text-left"
      >
        <span className="font-serif font-medium tracking-[0.28em] text-sand-50 text-base md:text-lg uppercase leading-none group-hover:text-gold-200 transition-colors duration-500">
          Gokarna
        </span>
        <span className="font-sans font-light tracking-[0.45em] text-[9px] md:text-[10px] text-gold-300/90 uppercase mt-1 leading-none">
          Realty
        </span>
      </motion.div>
    </div>
  );
}
