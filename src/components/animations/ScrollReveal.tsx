"use client";

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  width?: "fit-content" | "100%";
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  className?: string;
  once?: boolean;
}

const ScrollReveal = ({
  children,
  width = "fit-content",
  direction = "up",
  delay = 0,
  className = "",
  once = true,
}: ScrollRevealProps) => {
  
  const getDirection = () => {
    switch (direction) {
      case "up":
        return { y: 50 };
      case "down":
        return { y: -50 };
      case "left":
        return { x: 50 };
      case "right":
        return { x: -50 };
      default:
        return { y: 50 };
    }
  };
  
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ width }}>
      <motion.div
        initial={{ opacity: 0, ...getDirection() }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
          delay,
        }}
        viewport={{ once }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default ScrollReveal; 