"use client";

import { motion } from 'framer-motion';
import Logo from '@/components/ui/Logo';

export default function Navbar() {
  return (
    <motion.header
      className="absolute top-0 left-0 right-0 z-50 py-6 bg-transparent"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 flex justify-center items-center">
        <Logo iconSize="w-16 h-16" textSize="text-3xl" />
      </div>
    </motion.header>
  );
} 