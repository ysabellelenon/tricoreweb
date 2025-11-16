"use client";

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import AnimatedBorder from '@/components/ui/AnimatedBorder';

const Partners = () => {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, amount: 0.2 });

  return (
    <section className="py-20 relative overflow-hidden" id="partners">
      <AnimatedBorder position="top" delay={0} />
      <AnimatedBorder position="bottom" delay={0} />
      
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full grid-pattern opacity-10 z-0" />
      <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-primary opacity-5 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-secondary opacity-5 blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-12"
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h3 
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: 'Creato Display, sans-serif' }}
          >
            Our <span className="text-accent">Clients</span>
          </h3>
        </motion.div>

        {/* Scrolling Logos */}
        <div className="relative overflow-hidden py-8">
          {/* Gradient overlays for fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#000212] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#000212] to-transparent z-10 pointer-events-none" />
          
          <div className="flex animate-scroll">
            {/* First set of logos */}
            {['/images/le.png', '/images/JAE.png', '/images/rjlm.png', '/images/RBC.png', '/images/Mustela.png'].map((logo, index) => (
              <div
                key={`first-${index}`}
                className="flex-shrink-0 mx-16 flex items-center justify-center"
              >
                <div className="relative w-[100px] h-[60px]">
                  <Image
                    src={logo}
                    alt="Client Logo"
                    fill
                    className={`object-contain ${logo.includes('JAE.png') ? 'filter brightness-0 invert' : ''}`}
                  />
                </div>
              </div>
            ))}
            
            {/* Duplicate set for seamless loop */}
            {['/images/le.png', '/images/JAE.png', '/images/rjlm.png', '/images/RBC.png', '/images/Mustela.png'].map((logo, index) => (
              <div
                key={`second-${index}`}
                className="flex-shrink-0 mx-16 flex items-center justify-center"
              >
                <div className="relative w-[100px] h-[60px]">
                  <Image
                    src={logo}
                    alt="Client Logo"
                    fill
                    className={`object-contain ${logo.includes('JAE.png') ? 'filter brightness-0 invert' : ''}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;

