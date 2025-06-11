"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
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
          <Image
            src="/images/Tricore-Logo-Icon.png"
            alt="Tricore Logo"
            width={35}
            height={25}
            priority
            className="w-full h-full"
          />
        </motion.div>
        
        <motion.div whileHover={{ scale: 1.05 }} className="ml-2">
          <span className={`font-bold ${textSize} gradient-text`}>TriCore</span>
        </motion.div>
      </div>
    </Link>
  );
};

export default Logo; 