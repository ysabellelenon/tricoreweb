"use client";

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import AnimatedBorder from '@/components/ui/AnimatedBorder';
import styles from './Services.responsive.module.css';

const services = [
  {
    icon: '/images/software-development.png',
    title: 'Software Development',
    description: 'Custom software solutions designed to meet your specific business requirements and challenges.',
    color: 'from-primary to-accent'
  },
  {
    icon: '/images/website-development.png',
    title: 'Website Development',
    description: 'Professional, responsive websites optimized for performance, user experience, and conversions.',
    color: 'from-secondary to-primary'
  },
  {
    icon: '/images/application-development.jpg',
    title: 'Application Development',
    description: 'Mobile and web applications built with cutting-edge technologies for all platforms.',
    color: 'from-accent to-secondary'
  },
  {
    icon: '/images/cybersecurity.jpg',
    title: 'Cybersecurity',
    description: 'Comprehensive security solutions to protect your data, systems, and business reputation.',
    color: 'from-primary-dark to-secondary'
  },
  {
    icon: '/images/consulting.jpg',
    title: 'IT Consulting',
    description: 'Expert guidance to align technology with your business objectives and maximize ROI.',
    color: 'from-accent to-primary'
  },
  {
    icon: '/images/managed-services.jpg',
    title: 'Managed IT Services',
    description: '24/7 monitoring, maintenance, and support to keep your systems running smoothly.',
    color: 'from-secondary to-accent'
  }
];

const ServiceCard = ({ 
  service, 
  index, 
  isInView, 
  hoveredIndex, 
  setHoveredIndex 
}: { 
  service: typeof services[0], 
  index: number, 
  isInView: boolean,
  hoveredIndex: number | null,
  setHoveredIndex: (index: number | null) => void
}) => {
  const isHovered = hoveredIndex === index;
  const isOtherHovered = hoveredIndex !== null && hoveredIndex !== index;
  const isOdd = index % 2 === 1;
  
  return (
    <motion.div
      className={`overflow-hidden relative min-h-[500px] flex flex-col flex-1 ${styles.serviceCard}`}
      style={{
        background: isOdd 
          ? '#171274'
          : '#071C52'
      }}
      initial={{ opacity: 0 }}
      animate={isInView ? { 
        opacity: 1,
        clipPath: "inset(0% 0% 0% 0%)",
        scale: isHovered ? 1.1 : 1,
        filter: isOtherHovered ? "blur(4px)" : "blur(0px)",
        zIndex: isHovered ? 10 : 1
      } : { 
        opacity: 0,
        clipPath: "inset(0% 100% 0% 0%)"
      }}
      transition={{ 
        duration: isInView ? 0.6 : 0.6, 
        delay: isInView ? index * 0.6 : 0,
        ease: "easeOut",
        scale: { duration: 0.3 },
        filter: { duration: 0.3 }
      }}
      onHoverStart={() => setHoveredIndex(index)}
      onHoverEnd={() => setHoveredIndex(null)}
      whileHover={{ y: -10 }}
    >
      {/* Background Image - visible on all screens */}
      {service.icon && (
        <div className={`absolute inset-0 z-0 ${styles.serviceCardBackground}`}>
          <Image 
            src={service.icon} 
            alt={service.title}
            fill
            className="object-cover opacity-30"
          />
        </div>
      )}
      
      {/* Card content */}
      <div className={`p-6 relative z-10 flex flex-col h-full text-center justify-center ${styles.serviceCardContent}`}>
        <div className={styles.serviceCardText}>
          <h3 className={`text-2xl font-bold mb-3 leading-tight ${styles.serviceCardTitle}`}>{service.title}</h3>
          <p className={`text-muted text-sm leading-relaxed ${styles.serviceCardDescription}`}>{service.description}</p>
        </div>
      </div>
    </motion.div>
  );
};

const Services = () => {
  const titleRef = useRef(null);
  const cardsRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, amount: 0.2 });
  const cardsInView = useInView(cardsRef, { once: true, amount: 0.1 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  return (
    <section className="py-20 relative overflow-hidden" id="services">
      <AnimatedBorder position="top" delay={0} />
      <AnimatedBorder position="bottom" delay={0} />
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full grid-pattern opacity-10 z-0" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary opacity-5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-secondary opacity-5 rounded-full blur-3xl" />
      
      <div className="relative z-10">
        <div className="text-center mb-16 container mx-auto px-4" ref={titleRef}>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-semibold mb-8 flex justify-center items-center gap-4 flex-wrap" style={{ fontFamily: 'Creato Display, sans-serif' }}>
            {['Our', 'Services'].map((word, index) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, color: index === 0 ? '#00B2E3' : '#ffffff' }}
                animate={titleInView ? { 
                  opacity: [0, 1, 1],
                  color: index === 0 
                    ? ['#00B2E3', '#00B2E3', '#ffffff']  // "Our": blue to white
                    : ['#ffffff', '#ffffff', '#00B2E3']  // "Services": white to blue
                } : { opacity: 0, color: index === 0 ? '#00B2E3' : '#ffffff' }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.2,
                  times: [0, 0.3, 1],
                  ease: 'easeOut'
                }}
              >
                {word}
              </motion.span>
            ))}
          </h2>
          
          <motion.p 
            className="text-muted max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            Comprehensive development and IT solutions designed to drive innovation and growth for your business
          </motion.p>
        </div>
        
        <div 
          ref={cardsRef}
          className={`flex flex-row gap-0 overflow-visible justify-center items-stretch w-full py-12 ${styles.cardsContainer}`}
        >
          {services.map((service, index) => (
            <ServiceCard 
              key={service.title} 
              service={service} 
              index={index} 
              isInView={cardsInView}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services; 