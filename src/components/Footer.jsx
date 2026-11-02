import React from 'react';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="relative z-30 w-full border-t border-gold-500/15 bg-forest-950/70 backdrop-blur-md px-6 py-6 md:px-12 lg:px-16 transition-colors duration-500">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        {/* Left: Brand Copyright Notice */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="font-sans text-xs md:text-sm font-light tracking-wider text-sand-300/80"
        >
          © 2026 Gokarna Realty. All Rights Reserved.
        </motion.p>

        {/* Center / Right: Brand Philosophy */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="font-serif italic text-xs md:text-sm tracking-wide text-gold-300/90"
        >
          Building Spaces. Creating Possibilities.
        </motion.p>
      </div>
    </footer>
  );
}

