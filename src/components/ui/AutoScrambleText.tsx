"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AutoScrambleTextProps {
  words: string[];
  className?: string;
  style?: React.CSSProperties;
  interval?: number;
}

const AutoScrambleText = ({ 
  words, 
  className = '', 
  style,
  interval = 3000 
}: AutoScrambleTextProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, interval);

    return () => clearInterval(timer);
  }, [words.length, interval]);

  return (
    <span style={{ ...style, display: 'inline', position: 'relative' }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          className={className}
          style={{ display: 'inline' }}
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 0, opacity: 0 }}
          transition={{ 
            duration: 0.15,
            ease: 'easeIn'
          }}
        >
          {words[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

export default AutoScrambleText;

