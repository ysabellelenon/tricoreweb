"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

const Hero = () => {
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
    <section className="relative min-h-screen flex items-center overflow-hidden" id="hero">
      {/* Hero Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero_image.png"
          alt="TriCore Web Solutions Hero"
          fill
          priority
          className="object-cover"
          quality={100}
        />
        {/* Lighter overlay for better image visibility */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-black/10" />
      </div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 z-10 grid-pattern opacity-20" />
      
      {/* Animated shapes */}
      <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-primary opacity-5 blur-3xl z-0" />
      <div className="absolute bottom-20 left-20 w-72 h-72 rounded-full bg-secondary opacity-5 blur-3xl z-0" />
      
      {/* Content */}
      <div className="container mx-auto px-4 z-20 relative">
        <div className="max-w-3xl">
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="gradient-text">Innovative IT Solutions</span> <br />
            for the <span className="text-glow">Digital Future</span>
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-muted mb-8 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            TriCore empowers businesses with cutting-edge technology solutions to navigate the digital landscape with confidence and security.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4"
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