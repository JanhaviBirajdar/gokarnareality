import React from 'react';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="relative z-30 w-full border-t border-gold-500/15 bg-forest-950/70 backdrop-blur-md px-6 py-6 md:px-12 lg:px-16 transition-colors duration-500">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        {/* Left: Brand Copyright Notice */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans text-xs md:text-sm font-light tracking-wider text-sand-300/80"
        >
          © 2026 Gokarna Realty. All Rights Reserved.
        </motion.p>

        {/* Center / Right: Brand Philosophy with subtle golden glow */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif italic text-xs md:text-sm tracking-wide text-gold-300/90 hover:text-gold-200 transition-colors duration-300 cursor-default"
        >
          Building Spaces. Creating Possibilities.
        </motion.p>
      </div>
    </footer>
  );
}
