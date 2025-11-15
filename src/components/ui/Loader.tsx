"use client";

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface LoaderProps {
  onLoadingComplete: () => void;
}

const Loader = ({ onLoadingComplete }: LoaderProps) => {
  const letters = ['T', 'r', 'i', 'C', 'o', 'r', 'e'];
  const [shouldFadeOut, setShouldFadeOut] = useState(false);

  useEffect(() => {
    // Calculate animation time: logo (0.3s) + letters (0.1s each) + delay (0.5s)
    const animationTime = 300 + (letters.length * 100) + 500;
    
    // Start fade out after animation completes
    const fadeTimer = setTimeout(() => {
      setShouldFadeOut(true);
    }, animationTime);

    // Call onLoadingComplete after fade out completes (0.8s fade duration)
    const completeTimer = setTimeout(() => {
      onLoadingComplete();
    }, animationTime + 800);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [letters.length, onLoadingComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
      initial={{ opacity: 1 }}
      animate={{ opacity: shouldFadeOut ? 0 : 1 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    >
      <div className="flex items-center gap-3">
        {/* Logo SVG */}
        <motion.div
          className="w-16 h-16 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <svg 
            width="64" 
            height="64" 
            viewBox="0 0 400 400" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            {/* Navy blue triangle top-left */}
            <path 
              d="M100 200 L180 80 L180 200 Z" 
              fill="#002B5C" 
            />
            
            {/* Light blue triangle top */}
            <path 
              d="M200 60 L300 180 L150 180 Z" 
              fill="#00B2E3" 
            />
            
            {/* Navy blue diamond middle */}
            <path 
              d="M220 220 L180 180 L220 140 L260 180 Z" 
              fill="#002B5C" 
            />
            
            {/* Light blue triangle bottom-left */}
            <path 
              d="M150 220 L120 300 L220 220 Z" 
              fill="#00B2E3" 
            />
            
            {/* Light blue rounded rectangle right */}
            <path 
              d="M260 180 L340 140 L300 260 L220 220 Z" 
              fill="#00B2E3" 
            />
          </svg>
        </motion.div>

        {/* TriCore text - letter by letter */}
        <div className="flex">
          {letters.map((letter, index) => (
            <motion.span
              key={index}
              className="text-3xl font-bold gradient-text"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.2,
                delay: 0.3 + (index * 0.1),
                ease: 'easeOut'
              }}
            >
              {letter}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Loader;

