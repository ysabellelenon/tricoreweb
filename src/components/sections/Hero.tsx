"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import AnimatedBorder from '@/components/ui/AnimatedBorder';
import ScrambleText from '@/components/ui/ScrambleText';
import AutoScrambleText from '@/components/ui/AutoScrambleText';
import { assetPath } from '@/lib/paths';

const Hero = () => {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  // Parallax: move bg up to 60px slower than scroll
  const y = useTransform(scrollY, [0, 400], [0, 60]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  };

  const navItems = [
    { name: 'ABOUT', href: '/#about' },
    { name: 'SERVICES', href: '/#services' },
    { name: 'SOLUTIONS', href: '/#solutions' },
    { name: 'CONTACT', href: '/#contact' },
  ];

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden" id="hero" ref={ref}>
      <AnimatedBorder position="top" delay={0} />
      <AnimatedBorder position="bottom" delay={0} />
      {/* Background video with parallax */}
      <motion.div className="absolute inset-0 z-0" style={{ y }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={assetPath('/images/hero_video.mp4')} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-black/65 to-black/55" />
      </motion.div>
      {/* Grid pattern overlay - centered */}
      <div className="absolute inset-0 z-10 grid-pattern opacity-20" style={{ backgroundPosition: 'center center' }} />
      {/* Animated shapes */}
      <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-primary opacity-5 blur-3xl z-0" />
      <div className="absolute bottom-20 left-20 w-72 h-72 rounded-full bg-secondary opacity-5 blur-3xl z-0" />

      {/* Main content */}
      <div className="relative z-20 flex-1 flex flex-col justify-center items-center px-4">
        <div className="max-w-7xl w-full text-center">
          {/* Main headline - Static with changing word */}
          <motion.h1 
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-12"
            style={{ fontFamily: 'Creato Display, sans-serif' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            You Name It.<br />
            We{' '}
            <AutoScrambleText 
              words={['Build', 'Design', 'Automate', 'Digitize', 'Develop']}
              className="text-accent"
              style={{ fontFamily: 'Creato Display, sans-serif' }}
              interval={2000}
            />{' '}
            It.
          </motion.h1>

          {/* Navigation bar */}
          <motion.div
            className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 px-4 py-2 bg-black/5 backdrop-blur-sm border border-white/10 rounded-lg max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {navItems.map((item, index) => (
              <div key={item.name} className="flex items-center">
                <Link
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    const id = item.href.replace('/#', '');
                    scrollToSection(id);
                  }}
                  className="text-white hover:text-accent transition-colors duration-300 text-xs sm:text-sm uppercase tracking-wide"
                >
                  <ScrambleText 
                    text={item.name}
                    style={{ fontFamily: 'VCR OSD Mono, monospace' }}
                  />
                </Link>
                {index < navItems.length - 1 && (
                  <span className="text-white/50 mx-2 sm:mx-4">/</span>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom section with footer text */}
      <div className="relative z-20 pb-12 px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <p className="text-white/80 text-base sm:text-lg max-w-3xl mx-auto" style={{ fontFamily: 'Alte Haas Grotesk, sans-serif' }}>
            We don't just solve problems, we create opportunities through technology.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero; 