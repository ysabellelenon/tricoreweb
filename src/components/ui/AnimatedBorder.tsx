"use client";

import { motion } from 'framer-motion';

interface AnimatedBorderProps {
  position: 'top' | 'bottom';
  delay?: number;
}

const AnimatedBorder = ({ position, delay = 0 }: AnimatedBorderProps) => {
  const positionClass = position === 'top' ? 'top-0' : 'bottom-0';

  return (
    <div className={`absolute ${positionClass} left-0 right-0 h-px overflow-hidden`}>
      <motion.div
        className="h-full w-full"
        style={{
          background: 'linear-gradient(90deg, #000000 0%, #000000 40%, #ffffff 50%, #000000 60%, #000000 100%)',
          backgroundSize: '200% 100%',
        }}
        animate={{
          backgroundPosition: ['0% 0%', '200% 0%'],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'linear',
          delay: delay,
        }}
      />
    </div>
  );
};

export default AnimatedBorder;

