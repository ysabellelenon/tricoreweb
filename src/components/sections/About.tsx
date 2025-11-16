"use client";

import { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import AnimatedBorder from '@/components/ui/AnimatedBorder';

// Portfolio projects data
const projects = [
  {
    id: 1,
    title: 'Enterprise Cloud Migration',
    category: 'Infrastructure',
    description: 'Seamless migration of legacy systems to cloud infrastructure, reducing costs by 40% and improving scalability.',
    image: '/images/software-development.png',
    technologies: ['AWS', 'Docker', 'Kubernetes'],
    year: '2024',
    color: 'from-primary to-accent'
  },
  {
    id: 2,
    title: 'AI-Powered Analytics Platform',
    category: 'Software Development',
    description: 'Built a comprehensive analytics platform using machine learning to provide real-time business insights.',
    image: '/images/application-development.jpg',
    technologies: ['Python', 'TensorFlow', 'React'],
    year: '2024',
    color: 'from-secondary to-primary'
  },
  {
    id: 3,
    title: 'E-Commerce Platform',
    category: 'Web Development',
    description: 'Developed a high-performance e-commerce platform handling 1M+ transactions with 99.9% uptime.',
    image: '/images/website-development.png',
    technologies: ['Next.js', 'Node.js', 'PostgreSQL'],
    year: '2023',
    color: 'from-accent to-secondary'
  },
  {
    id: 4,
    title: 'Cybersecurity Framework',
    category: 'Security',
    description: 'Implemented enterprise-grade security framework protecting against advanced persistent threats.',
    image: '/images/cybersecurity.jpg',
    technologies: ['SIEM', 'Firewall', 'Encryption'],
    year: '2024',
    color: 'from-primary-dark to-accent'
  },
  {
    id: 5,
    title: 'Mobile Banking App',
    category: 'Application Development',
    description: 'Created a secure mobile banking application with biometric authentication and real-time transactions.',
    image: '/images/application-development.jpg',
    technologies: ['React Native', 'Blockchain', 'API'],
    year: '2023',
    color: 'from-secondary to-primary'
  },
  {
    id: 6,
    title: 'IoT Management System',
    category: 'IoT Solutions',
    description: 'Developed an IoT platform managing 10,000+ connected devices with real-time monitoring and control.',
    image: '/images/software-development.png',
    technologies: ['MQTT', 'Node.js', 'MongoDB'],
    year: '2024',
    color: 'from-accent to-primary'
  }
];


// Project card component
const ProjectCard = ({ 
  project, 
  index, 
  isInView,
  hoveredIndex,
  setHoveredIndex 
}: { 
  project: typeof projects[0]; 
  index: number;
  isInView: boolean;
  hoveredIndex: number | null;
  setHoveredIndex: (index: number | null) => void;
}) => {
  const isHovered = hoveredIndex === index;
  const isOtherHovered = hoveredIndex !== null && hoveredIndex !== index;
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      ref={cardRef}
      className="group relative overflow-hidden rounded-2xl cursor-pointer"
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { 
        opacity: 1,
        y: 0,
        scale: isHovered ? 1.05 : 1,
        filter: isOtherHovered ? "blur(4px) brightness(0.5)" : "blur(0px) brightness(1)",
        zIndex: isHovered ? 10 : 1
      } : { opacity: 0, y: 100 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        scale: { duration: 0.3 },
        filter: { duration: 0.3 }
      }}
      onHoverStart={() => setHoveredIndex(index)}
      onHoverEnd={() => setHoveredIndex(null)}
      style={{ y, opacity }}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src={project.image} 
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-80 group-hover:opacity-60 transition-opacity duration-300`} />
      </div>

      {/* Glass overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm group-hover:bg-black/20 transition-all duration-300" />

      {/* Content */}
      <div className="relative z-10 p-8 h-full min-h-[400px] flex flex-col justify-between">
        {/* Top section */}
        <div>
          <motion.div 
            className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-semibold mb-4"
            initial={{ opacity: 0, x: -20 }}
            animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            {project.category}
          </motion.div>
          
          <motion.h3 
            className="text-3xl md:text-4xl font-bold mb-3"
            style={{ fontFamily: 'Creato Display, sans-serif' }}
            initial={{ opacity: 0, y: 20 }}
            animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {project.title}
          </motion.h3>
        </div>

        {/* Bottom section */}
        <div className="space-y-4">
          <motion.p 
            className="text-white/90 text-sm leading-relaxed"
            initial={{ opacity: 0 }}
            animate={isHovered ? { opacity: 1 } : { opacity: 0.9 }}
            transition={{ delay: 0.3 }}
          >
            {project.description}
          </motion.p>

          {/* Technologies */}
          <motion.div 
            className="flex flex-wrap gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0 }}
            transition={{ delay: 0.4 }}
          >
            {project.technologies.map((tech, i) => (
              <span 
                key={i}
                className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-xs border border-white/20"
              >
                {tech}
              </span>
            ))}
          </motion.div>

          {/* Year badge */}
          <motion.div
            className="absolute top-6 right-6 w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center"
            initial={{ scale: 0, rotate: -180 }}
            animate={isHovered ? { scale: 1, rotate: 0 } : { scale: 1, rotate: 0 }}
            transition={{ delay: 0.5, type: "spring" }}
          >
            <span className="text-xs font-bold">{project.year}</span>
          </motion.div>
        </div>

        {/* Hover effect border */}
        <motion.div
          className="absolute inset-0 border-2 border-accent rounded-2xl opacity-0 group-hover:opacity-100"
          initial={false}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
};

const About = () => {
  const titleRef = useRef(null);
  const projectsRef = useRef(null);
  
  const titleInView = useInView(titleRef, { once: true, amount: 0.2 });
  const projectsInView = useInView(projectsRef, { once: true, amount: 0.1 });
  
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-20 relative overflow-hidden" id="about">
      <AnimatedBorder position="top" delay={0} />
      <AnimatedBorder position="bottom" delay={0} />
      
      {/* Background - Black */}
      <div className="absolute top-0 left-0 w-full h-full bg-black z-0" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Title Section */}
        <div className="text-center mb-20" ref={titleRef}>
          <motion.h2 
            className="text-5xl md:text-6xl lg:text-7xl font-semibold mb-8 flex justify-center items-center gap-4 flex-wrap" 
            style={{ fontFamily: 'Creato Display, sans-serif' }}
          >
            {['About', 'Us'].map((word, index) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, color: index === 0 ? '#00B2E3' : '#ffffff' }}
                animate={titleInView ? { 
                  opacity: [0, 1, 1],
                  color: index === 0 
                    ? ['#00B2E3', '#00B2E3', '#ffffff']
                    : ['#ffffff', '#ffffff', '#00B2E3']
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
          </motion.h2>
          
          <motion.p 
            className="text-muted max-w-3xl mx-auto text-lg leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            Transforming businesses through innovative technology solutions. We don't just build software—we craft digital experiences that drive growth, efficiency, and competitive advantage.
          </motion.p>
        </div>

        {/* Mission & Vision Section */}
        <div className="mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Mission */}
            <motion.div 
              className="glass-effect p-8 rounded-2xl relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: 'Creato Display, sans-serif' }}>
                  Our Mission
                </h3>
                <p className="text-muted leading-relaxed">
                  To deliver cutting-edge technology solutions that enable businesses to navigate the digital landscape with confidence and security.
                </p>
              </div>
            </motion.div>
            
            {/* Vision */}
            <motion.div 
              className="glass-effect p-8 rounded-2xl relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: 'Creato Display, sans-serif' }}>
                  Our Vision
                </h3>
                <p className="text-muted leading-relaxed">
                  To be the trusted technology partner for businesses seeking innovative solutions for their digital transformation journey.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Portfolio Projects Section */}
        <div ref={projectsRef}>
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={projectsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <h3 
              className="text-4xl md:text-5xl font-bold mb-4 text-white"
              style={{ fontFamily: 'Creato Display, sans-serif' }}
            >
              Our Portfolio
            </h3>
            <p className="text-black max-w-2xl mx-auto text-lg md:text-xl">
              Showcasing our expertise through successful projects that have transformed businesses and industries
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                isInView={projectsInView}
                hoveredIndex={hoveredIndex}
                setHoveredIndex={setHoveredIndex}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
