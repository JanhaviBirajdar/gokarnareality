import React from 'react';

export default function BrandLogo({ size = "default", className = "" }) {
  const isLarge = size === "large";

  return (
    <div className={`flex items-center gap-3.5 select-none ${className}`}>
      {/* Bespoke Architectural Monogram */}
      <div className="relative group">
        <svg
          className={`${isLarge ? 'w-11 h-11' : 'w-9 h-9'} transition-transform duration-500 ease-out group-hover:scale-105`}
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
              <stop offset="0%" stopColor="#DFB752" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          {/* Outer Octagonal / Architectural Frame */}
          <polygon
            points="24,2 43,11 43,37 24,46 5,37 5,11"
            stroke="url(#goldMonogram)"
            strokeWidth="1.2"
            fill="url(#goldInnerGlow)"
            className="transition-all duration-700 group-hover:stroke-gold-300"
          />

          {/* Inner Architectural Portal / Archway */}
          <path
            d="M17 38V22C17 18.134 20.134 15 24 15C27.866 15 31 18.134 31 22V38"
            stroke="url(#goldMonogram)"
            strokeWidth="1.2"
            strokeLinecap="round"
          />

          {/* Elegant Monogram GR geometric overlay */}
          <path
            d="M27 22H21C19.3431 22 18 23.3431 18 25C18 26.6569 19.3431 28 21 28H25.5V33"
            stroke="url(#goldMonogram)"
            strokeWidth="1.2"
            strokeLinecap="round"
          />

          {/* Central Keystone Diamond Accent */}
          <polygon
            points="24,9 26,12 24,15 22,12"
            fill="url(#goldMonogram)"
          />
        </svg>

        {/* Ambient Glow behind monogram */}
        <div className="absolute inset-0 bg-gold-400/20 blur-md rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col tracking-widest text-left">
        <span className="font-serif font-medium tracking-[0.28em] text-sand-50 text-base md:text-lg uppercase leading-none">
          Gokarna
        </span>
        <span className="font-sans font-light tracking-[0.45em] text-[9px] md:text-[10px] text-gold-300/90 uppercase mt-1 leading-none">
          Realty
        </span>
      </div>
    </div>
  );
}

