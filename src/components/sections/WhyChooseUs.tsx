"use client";

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import AnimatedBorder from '@/components/ui/AnimatedBorder';

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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
