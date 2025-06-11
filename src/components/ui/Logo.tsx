"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';

interface LogoProps {
  textSize?: string;
  iconSize?: string;
}

const Logo = ({ textSize = "text-xl", iconSize = "w-10 h-10" }: LogoProps) => {
  return (
    <Link href="/">
      <div className="flex items-center">
        <motion.div 
          className={`${iconSize} bg-accent rounded-lg mr-2 flex items-center justify-center relative overflow-hidden`}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Logo mark */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent opacity-20" />
          <div className="relative z-10">
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M12 2L2 7L12 12L22 7L12 2Z" 
                fill="currentColor" 
                className="text-background"
              />
              <path 
                d="M2 17L12 22L22 17" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="text-background"
              />
              <path 
                d="M2 12L12 17L22 12" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="text-background"
              />
            </svg>
          </div>
        </motion.div>
        
        <motion.div whileHover={{ scale: 1.05 }}>
          <span className={`font-bold ${textSize} gradient-text`}>TriCore</span>
        </motion.div>
      </div>
    </Link>
  );
};

export default Logo; 