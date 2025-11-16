"use client";

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import AnimatedBorder from '@/components/ui/AnimatedBorder';

const headings = [
  {
    title: 'Precision vs Shortcuts',
    tricore: 'Smart contracts enforce execution. If a deal dies, funds return instantly.',
    typical: 'Deals vanish, buyers drop out, funds sit idle for weeks.'
  },
  {
    title: 'Consistency vs Neglect',
    tricore: 'Automated processes ensure every project follows the same high standards and quality checks.',
    typical: 'Inconsistent delivery, missed deadlines, and quality varies between projects.'
  },
  {
    title: 'Security vs Risk',
    tricore: 'Multi-layered security protocols protect your data and systems around the clock.',
    typical: 'Vulnerable systems, data breaches, and reactive security measures.'
  }
];

const WhyChooseUs = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  // Calculate which heading should be active based on scroll progress
  // Each heading gets 1/3 of the scroll progress
  // Adjusted to ensure all three headings are accessible
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const segmentSize = 1 / headings.length;
    // More lenient calculation to ensure all headings are accessible
    const adjustedProgress = latest - (segmentSize * 0.2);
    let newIndex = Math.floor(adjustedProgress / segmentSize);
    newIndex = Math.min(newIndex, headings.length - 1);
    newIndex = Math.max(newIndex, 0);
    
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  });

  // Transform for left side headings scroll - move up as user scrolls
  // Each heading is 400px apart, so we need to move by (headings.length - 1) * 400 pixels
  // Start with first heading centered, end with last heading centered
  // Add initial offset to move headings down so first one is visible
  const headingSpacing = 400;
  const totalScrollDistance = (headings.length - 1) * headingSpacing;
  const initialOffset = 500; // Move down initially to show first heading
  const bottomSpacer = 500; // Spacer height for last heading
  // Start with offset (first heading visible), end at offset - totalScrollDistance (last heading visible)
  // Extended range to ensure last heading is fully accessible with bottom spacer
  const leftScrollY = useTransform(
    scrollYProgress,
    [0, 1],
    [initialOffset, initialOffset - totalScrollDistance - bottomSpacer]
  );

  // Calculate section height to allow proper scroll through all headings
  // Need enough height for sticky to work - each heading needs ~250vh of scroll space
  // Total: 3 headings * 250vh = 750vh minimum
  // Using 800vh to ensure smooth scrolling and all headings are fully accessible
  const sectionHeight = `800vh`;

  return (
    <section 
      ref={sectionRef} 
      className="relative" 
      id="solutions"
      style={{ height: sectionHeight }}
    >
      <AnimatedBorder position="top" delay={0} />
      <AnimatedBorder position="bottom" delay={0.5} />
      
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full grid-pattern opacity-10 z-0" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary opacity-5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-secondary opacity-5 rounded-full blur-3xl" />
      
      {/* Sticky container - this freezes the viewport */}
      <div 
        className="sticky top-0 h-screen w-full flex items-center justify-center py-20 z-10"
      >
        <div className="container mx-auto px-4 w-full h-full flex flex-col">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch flex-1 min-h-0">
            
            {/* Left side - Headings */}
            <div className="relative h-full overflow-hidden flex items-center min-h-0 max-w-md">
              <motion.div
                style={{ y: leftScrollY }}
                className="flex flex-col items-start w-full"
              >
                {/* Spacer to position first heading at center */}
                <div className="h-[calc(50vh-200px)] flex-shrink-0" />
                {headings.map((heading, index) => {
                  const isActive = activeIndex === index;
                  const [beforeVs, afterVs] = heading.title.split(' vs ');
                  const blueColor = '#00B2E3';
                  
                  return (
                    <motion.h3
                      key={index}
                      className={`text-5xl md:text-6xl lg:text-7xl font-bold transition-all duration-500 ${
                        index < headings.length - 1 ? 'mb-[400px]' : 'mb-[calc(50vh-200px)]'
                      }`}
                      style={{ fontFamily: 'Creato Display, sans-serif' }}
                      animate={{
                        opacity: isActive ? 1 : 0.95,
                        scale: isActive ? 1 : 0.95,
                      }}
                    >
                      <span style={{ color: isActive ? blueColor : 'rgba(0, 178, 227, 0.95)' }}>
                        {beforeVs}
                      </span>
                      <span className={isActive ? 'text-white' : 'text-gray-600'}> vs </span>
                      <span className={isActive ? 'text-white' : 'text-gray-600'}>
                        {afterVs}
                      </span>
                    </motion.h3>
                  );
                })}
              </motion.div>
            </div>

            {/* Right side - Content boxes */}
            <div className="flex flex-col gap-6 h-full min-h-0 overflow-hidden">
              {/* TriCore box */}
              <div className="relative p-12 md:p-16 border border-white/20 bg-black/40 backdrop-blur-sm flex-1 flex flex-col justify-between min-h-0">
                {/* Corner brackets */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/50" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/50" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white/50" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/50" />
                
                <h4 className="text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: 'Creato Display, sans-serif' }}>
                  TriCore
                </h4>
                <motion.p 
                  key={`tricore-text-${activeIndex}`}
                  className="text-white text-xl md:text-2xl leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {headings[activeIndex].tricore}
                </motion.p>
              </div>

              {/* Typical Services box */}
              <div className="relative p-12 md:p-16 border border-white/20 bg-black/40 backdrop-blur-sm flex-1 flex flex-col justify-between min-h-0">
                {/* Corner brackets */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/50" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/50" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white/50" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/50" />
                
                <h4 className="text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: 'Creato Display, sans-serif' }}>
                  Typical Services
                </h4>
                <motion.p 
                  key={`typical-text-${activeIndex}`}
                  className="text-white/80 text-xl md:text-2xl leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  {headings[activeIndex].typical}
                </motion.p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
