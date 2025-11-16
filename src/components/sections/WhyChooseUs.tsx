"use client";

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import AnimatedBorder from '@/components/ui/AnimatedBorder';
import styles from './WhyChooseUs.responsive.module.css';

// Component for word-by-word animation
const WordByWordText = ({ text, activeIndex, className, textColor = 'text-white' }: { 
  text: string; 
  activeIndex: number;
  className?: string;
  textColor?: string;
}) => {
  const [words, setWords] = useState<string[]>([]);
  const [visibleWords, setVisibleWords] = useState<number>(0);
  const [wordColors, setWordColors] = useState<Record<number, string>>({});
  const blueColor = '#00B2E3';
  const finalColor = textColor === 'text-white' ? '#ffffff' : 'rgba(255, 255, 255, 0.8)';

  useEffect(() => {
    // Split text into words, preserving spaces and punctuation
    const wordArray = text.split(/(\s+)/).filter(word => word.length > 0);
    setWords(wordArray);
    setVisibleWords(0);
    setWordColors({});
    
    const timeouts: NodeJS.Timeout[] = [];
    
    // Animate words appearing one by one
    wordArray.forEach((_, index) => {
      const timeout1 = setTimeout(() => {
        setVisibleWords(index + 1);
        // Set new word to blue initially
        setWordColors(prev => ({ ...prev, [index]: blueColor }));
        
        // After a short delay, transition to final color
        const timeout2 = setTimeout(() => {
          setWordColors(prev => ({ ...prev, [index]: finalColor }));
        }, 100); // 100ms delay before color transition (quickly change to white)
        timeouts.push(timeout2);
      }, index * 35); // 35ms delay between each word
      timeouts.push(timeout1);
    });
    
    // Cleanup function to clear timeouts if component unmounts or text changes
    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, [text, activeIndex, finalColor]);

  return (
    <p className={className}>
      {words.map((word, index) => {
        const isVisible = index < visibleWords;
        const wordColor = wordColors[index] || (isVisible ? finalColor : 'transparent');
        
        return (
          <motion.span
            key={`${activeIndex}-${index}`}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: isVisible ? 1 : 0,
              color: wordColor
            }}
            transition={{
              opacity: { duration: 0.1 },
              color: { duration: 0.3 }
            }}
            style={{ display: 'inline' }}
          >
            {word}
          </motion.span>
        );
      })}
    </p>
  );
};

const headings = [
  {
    title: 'Precision vs Shortcuts',
    tricore: 'Every line of code is crafted with intention, accuracy, and long-term stability —nothing rushed, nothing overlooked.',
    typical: 'Work done quickly but poorly, resulting in issues you\'re forced to fix later.'
  },
  {
    title: 'Consistency vs Neglect',
    tricore: 'Reliable communication, dependable updates, and continuous support that never leaves you in the dark.',
    typical: 'Unanswered messages, disappearing support, and projects abandoned once the invoice is paid.'
  },
  {
    title: 'Security vs Risk',
    tricore: 'Your data stays safe with updated security, solid defenses, and proactive checks.',
    typical: 'Weak security, outdated practices, and risky setups that expose your data and business.'
  }
];

const WhyChooseUs = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [isResponsive, setIsResponsive] = useState(false);
  const isUnmountingRef = useRef(false);

  useEffect(() => {
    setIsMounted(true);
    isUnmountingRef.current = false;
    
    // Check if screen is responsive
    const checkResponsive = () => {
      if (typeof window === 'undefined') return false;
      return window.innerWidth <= 1024;
    };

    setIsResponsive(checkResponsive());

    // Listen for window resize with debounce to prevent too many updates
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      if (isUnmountingRef.current) return;
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (!isUnmountingRef.current) {
          setIsResponsive(checkResponsive());
        }
      }, 100);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      isUnmountingRef.current = true;
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', handleResize);
      setIsMounted(false);
    };
  }, []);

  // Only use scroll hooks on desktop (not responsive)
  // Always provide target, but scroll calculation will be disabled on responsive
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
    layoutEffect: false
  });

  // Calculate which heading should be active based on scroll progress
  // DISABLED on responsive screens - use arrow navigation instead
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!isMounted || isUnmountingRef.current || !sectionRef.current || isResponsive) return;
    
    // Additional safety checks
    try {
      if (isUnmountingRef.current) return;
      if (!sectionRef.current) return;
      if (!sectionRef.current.parentNode) return;
      if (!document.body.contains(sectionRef.current)) return;
      
      const segmentSize = 1 / headings.length;
      // More lenient calculation to ensure all headings are accessible
      const adjustedProgress = latest - (segmentSize * 0.2);
      let newIndex = Math.floor(adjustedProgress / segmentSize);
      newIndex = Math.min(newIndex, headings.length - 1);
      newIndex = Math.max(newIndex, 0);
      
      if (!isUnmountingRef.current && newIndex !== activeIndex) {
        setActiveIndex(newIndex);
      }
    } catch (error) {
      // Silently handle any errors during scroll calculation
      // Don't log to avoid console spam
    }
  });

  // Transform for left side headings scroll - move up as user scrolls
  // DISABLED on responsive screens
  const headingSpacing = 400;
  const totalScrollDistance = (headings.length - 1) * headingSpacing;
  const initialOffset = 500;
  const bottomSpacer = 500;
  
  // Always create transform, but it will be ignored on responsive
  const leftScrollY = useTransform(
    scrollYProgress,
    [0, 1],
    [initialOffset, initialOffset - totalScrollDistance - bottomSpacer]
  );

  // Calculate section height - use auto height on responsive
  const sectionHeight = isResponsive ? 'auto' : `800vh`;

  // Arrow navigation handlers
  const handlePrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? headings.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === headings.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section 
      ref={sectionRef} 
      className={`relative ${styles.whyChooseUsSection}`}
      id="solutions"
      style={{ height: sectionHeight }}
    >
      <AnimatedBorder position="top" delay={0} />
      <AnimatedBorder position="bottom" delay={0.5} />
      
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full grid-pattern opacity-10 z-0" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary opacity-5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-secondary opacity-5 rounded-full blur-3xl" />
      
      {/* Sticky container - this freezes the viewport on desktop, static on responsive */}
      <div 
        className={`sticky top-0 h-screen w-full flex items-center justify-center py-20 z-10 ${styles.whyChooseUsStickyContainer}`}
      >
        <div className="container mx-auto px-4 w-full h-full flex flex-col">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch flex-1 min-h-0">
            
            {/* Left side - Headings */}
            <div className={`relative h-full overflow-hidden flex items-center min-h-0 max-w-md ${styles.whyChooseUsLeftSide}`}>
              <motion.div
                style={isResponsive || !isMounted ? {} : { y: leftScrollY }}
                className={`flex flex-col items-start w-full ${styles.whyChooseUsHeadingsContainer}`}
              >
                {/* Spacer to position first heading at center - hidden on responsive */}
                {!isResponsive && <div className="h-[calc(50vh-200px)] flex-shrink-0" />}
                {headings.map((heading, index) => {
                  const isActive = activeIndex === index;
                  const [beforeVs, afterVs] = heading.title.split(' vs ');
                  const blueColor = '#00B2E3';
                  
                  return (
                    <motion.h3
                      key={index}
                      className={`text-5xl md:text-6xl lg:text-7xl font-bold transition-all duration-500 ${
                        isResponsive 
                          ? `${styles.whyChooseUsHeading} ${isActive ? styles.active : ''}`
                          : index < headings.length - 1 ? 'mb-[400px]' : 'mb-[calc(50vh-200px)]'
                      }`}
                      style={{ fontFamily: 'Creato Display, sans-serif' }}
                      animate={isResponsive ? {} : {
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
            <div className={`flex flex-col gap-6 h-full min-h-0 overflow-hidden ${isResponsive ? styles.whyChooseUsContentContainer : ''}`}>
              {/* Desktop: Original behavior - show only active content */}
              {!isResponsive && (
                <>
                  {/* TriCore box */}
                  <div className="relative p-6 md:p-8 border border-white/20 bg-black/40 backdrop-blur-sm flex-1 flex flex-col justify-between min-h-0">
                    {/* Corner brackets */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/50" />
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/50" />
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white/50" />
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/50" />
                    
                    <div className="flex items-center">
                      <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center relative">
                        <svg 
                          width="40" 
                          height="40" 
                          viewBox="0 0 400 400" 
                          fill="none" 
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-full h-full"
                        >
                          {/* Navy blue triangle top-left */}
                          <path 
                            d="M100 200 L180 80 L180 200 Z" 
                            fill="#002B5C" 
                          />
                          
                          {/* Light blue triangle top */}
                          <path 
                            d="M200 60 L300 180 L150 180 Z" 
                            fill="#00B2E3" 
                          />
                          
                          {/* Navy blue diamond middle */}
                          <path 
                            d="M220 220 L180 180 L220 140 L260 180 Z" 
                            fill="#002B5C" 
                          />
                          
                          {/* Light blue triangle bottom-left */}
                          <path 
                            d="M150 220 L120 300 L220 220 Z" 
                            fill="#00B2E3" 
                          />
                          
                          {/* Light blue rounded rectangle right */}
                          <path 
                            d="M260 180 L340 140 L300 260 L220 220 Z" 
                            fill="#00B2E3" 
                          />
                        </svg>
                      </div>
                      
                      <div className="ml-2">
                        <span className="font-bold text-3xl md:text-4xl gradient-text">TriCore</span>
                      </div>
                    </div>
                    <WordByWordText 
                      text={headings[activeIndex].tricore}
                      activeIndex={activeIndex}
                      className="text-xl md:text-2xl leading-relaxed"
                      textColor="text-white"
                    />
                  </div>

                  {/* Typical Services box */}
                  <div className="relative p-6 md:p-8 border border-white/20 bg-black/40 backdrop-blur-sm flex-1 flex flex-col justify-between min-h-0">
                    {/* Corner brackets */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/50" />
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/50" />
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white/50" />
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/50" />
                    
                    <h4 className="text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: 'Creato Display, sans-serif' }}>
                      Typical Services
                    </h4>
                    <WordByWordText 
                      text={headings[activeIndex].typical}
                      activeIndex={activeIndex}
                      className="text-xl md:text-2xl leading-relaxed"
                      textColor="text-white/80"
                    />
                  </div>
                </>
              )}

              {/* Responsive: Page-based navigation */}
              {isResponsive && headings.map((heading, pageIndex) => {
                const isActivePage = activeIndex === pageIndex;
                return (
                  <div
                    key={pageIndex}
                    className={`${styles.whyChooseUsContentPage} ${isActivePage ? styles.active : ''}`}
                  >
                    {/* TriCore box */}
                    <div className="relative p-6 md:p-8 border border-white/20 bg-black/40 backdrop-blur-sm flex-1 flex flex-col justify-between min-h-0">
                      {/* Corner brackets */}
                      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/50" />
                      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/50" />
                      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white/50" />
                      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/50" />
                      
                      <div className="flex items-center">
                        <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center relative">
                          <svg 
                            width="40" 
                            height="40" 
                            viewBox="0 0 400 400" 
                            fill="none" 
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-full h-full"
                          >
                            {/* Navy blue triangle top-left */}
                            <path 
                              d="M100 200 L180 80 L180 200 Z" 
                              fill="#002B5C" 
                            />
                            
                            {/* Light blue triangle top */}
                            <path 
                              d="M200 60 L300 180 L150 180 Z" 
                              fill="#00B2E3" 
                            />
                            
                            {/* Navy blue diamond middle */}
                            <path 
                              d="M220 220 L180 180 L220 140 L260 180 Z" 
                              fill="#002B5C" 
                            />
                            
                            {/* Light blue triangle bottom-left */}
                            <path 
                              d="M150 220 L120 300 L220 220 Z" 
                              fill="#00B2E3" 
                            />
                            
                            {/* Light blue rounded rectangle right */}
                            <path 
                              d="M260 180 L340 140 L300 260 L220 220 Z" 
                              fill="#00B2E3" 
                            />
                          </svg>
                        </div>
                        
                        <div className="ml-2">
                          <span className={`font-bold text-3xl md:text-4xl gradient-text ${styles.whyChooseUsTricoreHeading}`}>TriCore</span>
                        </div>
                      </div>
                      <WordByWordText 
                        text={heading.tricore}
                        activeIndex={pageIndex}
                        className={`text-xl md:text-2xl leading-relaxed ${styles.whyChooseUsBoxText}`}
                        textColor="text-white"
                      />
                    </div>

                    {/* Typical Services box */}
                    <div className="relative p-6 md:p-8 border border-white/20 bg-black/40 backdrop-blur-sm flex-1 flex flex-col justify-between min-h-0">
                      {/* Corner brackets */}
                      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/50" />
                      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/50" />
                      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white/50" />
                      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/50" />
                      
                      <h4 className={`text-3xl md:text-4xl font-bold text-white ${styles.whyChooseUsTypicalHeading}`} style={{ fontFamily: 'Creato Display, sans-serif' }}>
                        Typical Services
                      </h4>
                      <WordByWordText 
                        text={heading.typical}
                        activeIndex={pageIndex}
                        className={`text-xl md:text-2xl leading-relaxed ${styles.whyChooseUsBoxText}`}
                        textColor="text-white/80"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation arrows and dots - only visible on responsive */}
          {isResponsive && (
            <div className={styles.whyChooseUsNavigation}>
              <button
                onClick={handlePrevious}
                className={styles.whyChooseUsArrow}
                aria-label="Previous"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <div className={styles.whyChooseUsDots}>
                {headings.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleDotClick(index)}
                    className={`${styles.whyChooseUsDot} ${activeIndex === index ? styles.active : ''}`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className={styles.whyChooseUsArrow}
                aria-label="Next"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
