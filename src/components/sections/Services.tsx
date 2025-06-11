"use client";

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const services = [
  {
    icon: '💻',
    title: 'Software Development',
    description: 'Custom software solutions designed to meet your specific business requirements and challenges.',
    color: 'from-primary to-accent'
  },
  {
    icon: '🌐',
    title: 'Website Development',
    description: 'Professional, responsive websites optimized for performance, user experience, and conversions.',
    color: 'from-secondary to-primary'
  },
  {
    icon: '📱',
    title: 'Application Development',
    description: 'Mobile and web applications built with cutting-edge technologies for all platforms.',
    color: 'from-accent to-secondary'
  },
  {
    icon: '🔒',
    title: 'Cybersecurity',
    description: 'Comprehensive security solutions to protect your data, systems, and business reputation.',
    color: 'from-primary-dark to-secondary'
  },
  {
    icon: '🔧',
    title: 'IT Consulting',
    description: 'Expert guidance to align technology with your business objectives and maximize ROI.',
    color: 'from-accent to-primary'
  },
  {
    icon: '🔄',
    title: 'Managed IT Services',
    description: '24/7 monitoring, maintenance, and support to keep your systems running smoothly.',
    color: 'from-secondary to-accent'
  }
];

const ServiceCard = ({ service, index }: { service: typeof services[0], index: number }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.2 });
  
  return (
    <motion.div
      ref={cardRef}
      className="glass-effect rounded-xl overflow-hidden relative"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
    >
      {/* Gradient background */}
      <div className={`absolute inset-0 opacity-10 bg-gradient-to-br ${service.color}`} />
      
      {/* Card content */}
      <div className="p-6 relative z-10">
        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${service.color} flex items-center justify-center text-2xl mb-4`}>
          {service.icon}
        </div>
        
        <h3 className="text-xl font-bold mb-3">{service.title}</h3>
        <p className="text-muted">{service.description}</p>
        
        <motion.button
          className="mt-4 text-sm font-medium text-accent flex items-center"
          whileHover={{ x: 5 }}
          transition={{ type: 'spring', stiffness: 400 }}
        >
          Learn more
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4 ml-1" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>
      </div>
    </motion.div>
  );
};

const Services = () => {
  const titleRef = useRef(null);
  const isInView = useInView(titleRef, { once: true, amount: 0.2 });
  
  return (
    <section className="py-20 relative overflow-hidden" id="services">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full grid-pattern opacity-10 z-0" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary opacity-5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-secondary opacity-5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16" ref={titleRef}>
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            Our <span className="gradient-text">Services</span>
          </motion.h2>
          
          <motion.p 
            className="text-muted max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Comprehensive development and IT solutions designed to drive innovation and growth for your business
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services; 