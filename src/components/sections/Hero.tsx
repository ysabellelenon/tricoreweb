"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

// Foreground to background: element1 (cloud), element2 (download), element3 (window), element4 (globe)
const elementConfigs = [
  { src: '/images/hero_image_element1.png', style: 'right-[8%] top-[35%] w-[340px] h-[220px] xl:z-30 z-20', strength: 60, scale: 1.04, shadow: true }, // cloud (moved further right and higher)
  { src: '/images/hero_image_element2.png', style: 'right-[30%] top-[30%] w-[110px] h-[110px] xl:z-20 z-10', strength: 35 }, // download
  { src: '/images/hero_image_element3.png', style: 'right-[30%] top-[65%] w-[110px] h-[110px] xl:z-20 z-10', strength: 25 }, // window
  { src: '/images/hero_image_element4.png', style: 'right-[10%] top-[65%] w-[120px] h-[120px] xl:z-10 z-[5]', strength: 15 }, // globe (farthest)
];

const Hero = () => {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  // Parallax: move bg up to 60px slower than scroll
  const y = useTransform(scrollY, [0, 400], [0, 60]);

  // Mouse tracking for element parallax
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const section = ref.current as HTMLElement | null;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setMouse({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100, // Offset for navbar
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" id="hero" ref={ref}>
      {/* Background image with parallax */}
      <motion.div className="absolute inset-0 z-0" style={{ y }}>
        <Image
          src="/images/hero_image_bg.jpg"
          alt="TriCore Hero Background"
          fill
          priority
          className="object-cover"
          quality={100}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-black/10" />
      </motion.div>
      {/* Foreground elements with mouse-follow and depth effect */}
      {elementConfigs.map((el, i) => (
        <motion.div
          key={el.src}
          className={`absolute ${el.style}`}
          style={{
            translateX: (mouse.x - 0.5) * el.strength,
            translateY: (mouse.y - 0.5) * el.strength,
            scale: el.scale || 1,
            filter: el.shadow ? 'drop-shadow(0 8px 32px rgba(0,201,255,0.25))' : undefined,
          }}
          transition={{ type: 'spring', stiffness: 80, damping: 18 }}
        >
          <Image
            src={el.src}
            alt={`Hero Element ${i + 1}`}
            fill
            className="object-contain pointer-events-none"
            quality={100}
            priority={i === 0}
          />
        </motion.div>
      ))}
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 z-10 grid-pattern opacity-20" />
      {/* Animated shapes */}
      <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-primary opacity-5 blur-3xl z-0" />
      <div className="absolute bottom-20 left-20 w-72 h-72 rounded-full bg-secondary opacity-5 blur-3xl z-0" />
      {/* Content */}
      <div className="container mx-auto px-4 z-20 relative">
        <div className="max-w-3xl relative xl:py-0 py-8 xl:px-0 px-4">
          {/* Mobile background overlay - only visible on screens 1023px and below */}
          <div className="absolute inset-0 glass-effect rounded-2xl bg-black/40 backdrop-blur-md xl:hidden z-[-1]" />
          
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 relative z-30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="gradient-text">Innovative IT Solutions</span> <br />
            for the <span className="text-glow">Digital Future</span>
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-muted xl:text-muted text-gray-200 mb-8 max-w-2xl relative z-30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            TriCore empowers businesses with cutting-edge technology solutions to navigate the digital landscape with confidence and security.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 relative z-30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.button 
              className="px-6 py-3 rounded-full bg-primary hover:bg-primary-dark text-white font-medium transition-colors duration-300 btn-glow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('services')}
            >
              Explore Services
            </motion.button>
            <motion.button 
              className="px-6 py-3 rounded-full border border-surface hover:border-accent text-white font-medium transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('contact')}
            >
              Contact Us
            </motion.button>
          </motion.div>
        </div>
      </div>
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        onClick={() => scrollToSection('services')}
        style={{ cursor: 'pointer' }}
      >
        <div className="flex flex-col items-center">
          <span className="text-muted text-sm mb-2">Scroll Down</span>
          <motion.div 
            className="w-6 h-10 rounded-full border-2 border-muted flex justify-center items-start p-1"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <div className="w-1 h-2 bg-accent rounded-full" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero; 