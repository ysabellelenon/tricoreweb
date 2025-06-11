"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

interface LogoProps {
  textSize?: string;
  iconSize?: string;
}

const Logo = ({ textSize = "text-xl", iconSize = "w-10 h-10" }: LogoProps) => {
  return (
    <Link href="/">
      <div className="flex items-center">
        <motion.div 
          className={`${iconSize} flex items-center justify-center relative`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg 
            width="40" 
            height="40" 
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
        
        <motion.div whileHover={{ scale: 1.05 }} className="ml-2">
          <span className={`font-bold ${textSize} gradient-text`}>TriCore</span>
        </motion.div>
      </div>
    </Link>
  );
};

export default Logo; 