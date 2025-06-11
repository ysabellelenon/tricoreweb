"use client";

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

const features = [
  {
    title: 'Cutting-Edge Technology',
    description: 'We leverage the latest technologies to deliver innovative solutions that keep you ahead of the competition.',
    icon: '📱'
  },
  {
    title: 'Expert Team',
    description: 'Our team of certified professionals brings years of experience across diverse technology domains.',
    icon: '👥'
  },
  {
    title: '24/7 Support',
    description: 'Round-the-clock technical support ensures your systems are always up and running efficiently.',
    icon: '🔧'
  },
  {
    title: 'Tailored Solutions',
    description: 'We create customized strategies and solutions designed specifically for your unique business needs.',
    icon: '🎯'
  },
  {
    title: 'Security First',
    description: 'We prioritize the security of your data and systems with robust, multi-layered protection measures.',
    icon: '🛡️'
  },
  {
    title: 'Scalable Infrastructure',
    description: 'Our solutions grow with your business, ensuring seamless scalability as your needs evolve.',
    icon: '📈'
  }
];

const FeatureCard = ({ feature, index }: { feature: typeof features[0], index: number }) => {
  return (
    <motion.div
      className="relative rounded-lg p-6 transition-all duration-300 glass-effect hover:bg-surface-hover group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -5 }}
    >
      <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary to-accent opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
      
      <div className="flex items-start">
        <div className="mr-4 text-2xl">{feature.icon}</div>
        <div>
          <h3 className="text-lg font-bold mb-2 group-hover:text-accent transition-colors duration-300">
            {feature.title}
          </h3>
          <p className="text-muted">{feature.description}</p>
        </div>
      </div>
      
      <motion.div 
        className="absolute bottom-3 right-3 w-6 h-6 rounded-full bg-accent opacity-0 group-hover:opacity-30"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

const WhyChooseUs = () => {
  const titleRef = useRef(null);
  const isInView = useInView(titleRef, { once: true, amount: 0.2 });
  
  return (
    <section className="py-20 relative overflow-hidden" id="solutions">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full grid-pattern opacity-10 z-0" />
      <div className="absolute top-40 right-40 w-80 h-80 rounded-full bg-primary opacity-5 blur-3xl" />
      <div className="absolute bottom-40 left-40 w-80 h-80 rounded-full bg-secondary opacity-5 blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why <span className="gradient-text">Choose Us</span>
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side with image */}
          <div className="order-2 lg:order-1">
            <div className="relative">
              <motion.div
                className="relative z-10 rounded-2xl overflow-hidden border border-surface glass-effect"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="aspect-[4/3] relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 z-10" />
                  <div className="absolute inset-0 grid-pattern opacity-30" />
                  
                  {/* Placeholder for an actual image */}
                  <div className="absolute inset-0 bg-gradient-to-br from-background to-surface flex items-center justify-center">
                    <span className="text-6xl">💻</span>
                  </div>
                </div>
              </motion.div>
              
              {/* Decorative elements */}
              <motion.div 
                className="absolute -bottom-4 -left-4 w-24 h-24 rounded-xl border border-surface rotate-12 bg-background z-0"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              />
              <motion.div 
                className="absolute -top-4 -right-4 w-20 h-20 rounded-xl border border-surface -rotate-12 bg-background z-0"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              />
              
              {/* Stats overlay */}
              <motion.div
                className="absolute -right-10 bottom-10 glass-effect rounded-lg p-4 shadow-lg z-20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="flex flex-col">
                  <span className="text-accent font-bold text-2xl">98%</span>
                  <span className="text-muted text-sm">Client Satisfaction</span>
                </div>
              </motion.div>
            </div>
          </div>
          
          {/* Right side content */}
          <div className="order-1 lg:order-2" ref={titleRef}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-muted mb-8">
                At TriCore, we combine technical expertise with business acumen to deliver solutions that drive real results. Our client-focused approach ensures that we understand your unique challenges and opportunities.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <FeatureCard key={feature.title} feature={feature} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs; 