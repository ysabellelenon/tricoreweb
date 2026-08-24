"use client";

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { assetPath } from '@/lib/paths';
import AnimatedBorder from '@/components/ui/AnimatedBorder';
import styles from './About.responsive.module.css';
import carouselStyles from './About.carousel.responsive.module.css';

// Portfolio projects data
const projects = [
  {
    id: 1,
    title: 'Capwa - Website Design',
    category: 'Web Design',
    description: 'A modern, responsive website design that combines elegant aesthetics with seamless user experience, delivering an engaging digital presence.',
    image: '/images/software-development.png',
    video: '/images/CapwaVid.mp4',
    technologies: ['React', 'Next.js', 'UI/UX'],
    year: '2024',
    color: 'from-primary to-accent'
  },
  {
    id: 2,
    title: 'JIP - City Government Portal',
    category: 'Software Development',
    description: 'A comprehensive company portal system that streamlines operations, manages client relationships, and provides real-time insights through an intuitive dashboard interface.',
    image: '/images/application-development.jpg',
    video: '/images/JipPortal.mp4',
    technologies: ['React', 'Next.js', 'Dashboard'],
    year: '2024',
    color: 'from-secondary to-primary'
  },
  {
    id: 3,
    title: 'RBC - Cable Subscription System',
    category: 'Web Development',
    description: 'Comprehensive cable subscription management system with flexible package plans, automated billing, payment integration, and user-friendly account management.',
    image: '/images/website-development.png',
    video: '/images/MidasVid.mp4',
    technologies: ['Next.js', 'Node.js', 'PostgreSQL'],
    year: '2023',
    color: 'from-accent to-secondary'
  },
  {
    id: 4,
    title: 'Mustela - Inventory System',
    category: 'Software Development',
    description: 'A comprehensive inventory management system that streamlines stock tracking, order processing, and warehouse operations with real-time updates and analytics.',
    image: '/images/cybersecurity.jpg',
    video: '/images/MustelaVid.mp4',
    technologies: ['React', 'Node.js', 'Database'],
    year: '2025',
    color: 'from-primary-dark to-accent'
  },
  {
    id: 5,
    title: 'SanriPack - Website Design',
    category: 'Web Design',
    description: 'Designed and developed a modern, responsive website with intuitive user interface and seamless user experience.',
    image: '/images/application-development.jpg',
    video: '/images/SanriPackVid.mp4',
    technologies: ['React', 'Next.js', 'Tailwind CSS'],
    year: '2024',
    color: 'from-secondary to-primary'
  },
  {
    id: 6,
    title: 'Workabee - Employee Management',
    category: 'Management System',
    description: 'Comprehensive employee management platform with attendance tracking, payroll management, and HR tools for streamlined workforce administration.',
    image: '/images/software-development.png',
    video: '/images/WorkabeeVid.mp4',
    technologies: ['React', 'Node.js', 'Database'],
    year: '2025',
    color: 'from-accent to-primary'
  }
];


// Project card component
const ProjectCard = ({ 
  project, 
  index, 
  isInView,
  hoveredIndex,
  setHoveredIndex,
  onCardClick
}: { 
  project: typeof projects[0]; 
  index: number;
  isInView: boolean;
  hoveredIndex: number | null;
  setHoveredIndex: (index: number | null) => void;
  onCardClick: () => void;
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
      onClick={onCardClick}
      style={{ y, opacity }}
    >
      {/* Background Image/Video */}
      <div className="absolute inset-0 z-0">
        {project.video ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          >
            <source src={assetPath(project.video)} type="video/mp4" />
          </video>
        ) : (
          <>
            <Image 
              src={project.image} 
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-80 group-hover:opacity-60 transition-opacity duration-300`} />
          </>
        )}
      </div>

      {/* Glass overlay - lighter for videos */}
      <div className={`absolute inset-0 ${project.video ? 'bg-black/20 backdrop-blur-sm group-hover:bg-black/10' : 'bg-black/40 backdrop-blur-sm group-hover:bg-black/20'} transition-all duration-300`} />

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
            className="text-black text-sm leading-relaxed font-medium"
            initial={{ opacity: 0 }}
            animate={isHovered ? { opacity: 1 } : { opacity: 1 }}
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

// Video Modal Component
const VideoModal = ({ project, isOpen, onClose }: { project: typeof projects[0] | null; isOpen: boolean; onClose: () => void }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !project || !project.video) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
      
      {/* Modal Content */}
      <motion.div
        className="relative z-10 w-full max-w-6xl max-h-[90vh] rounded-2xl overflow-hidden"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-black/70 transition-all duration-300"
          aria-label="Close modal"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          controls
          className="w-full h-full object-contain"
        >
          <source src={assetPath(project.video)} type="video/mp4" />
        </video>

        {/* Project Info */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Creato Display, sans-serif' }}>
            {project.title}
          </h3>
          <p className="text-white/80">{project.description}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const About = () => {
  const titleRef = useRef(null);
  const projectsRef = useRef(null);
  
  const titleInView = useInView(titleRef, { once: true, amount: 0.2 });
  const projectsInView = useInView(projectsRef, { once: true, amount: 0.1 });
  
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
  const carouselImages = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  // Auto-play carousel - DISABLED on responsive screens (max-width: 1024px)
  useEffect(() => {
    // Check if screen is responsive
    const checkIsResponsive = () => {
      if (typeof window === 'undefined') return false;
      return window.innerWidth <= 1024;
    };

    // Don't auto-play on responsive screens
    if (checkIsResponsive()) {
      return;
    }

    const interval = setInterval(() => {
      // Check again before changing slide (in case window was resized)
      if (!checkIsResponsive()) {
        setCurrentCarouselIndex((prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1));
      }
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [carouselImages.length]);

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
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 ${styles.missionVisionContainer}`}>
            {/* Mission */}
            <motion.div 
              className={`group relative overflow-hidden rounded-3xl p-8 md:p-10 border border-white/10 bg-gradient-to-br from-black/40 via-black/30 to-black/40 backdrop-blur-xl ${styles.missionBox}`}
              initial={{ opacity: 0, x: -50 }}
              animate={titleInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-bl-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/5 rounded-tr-full blur-2xl" />
              
              {/* Animated border glow */}
              <div className="absolute inset-0 rounded-3xl border-2 border-accent/0 group-hover:border-accent/30 transition-all duration-500" />
              
              <div className="relative z-10">
                {/* Icon with enhanced design */}
                <motion.div 
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/10 backdrop-blur-sm border border-accent/20 flex items-center justify-center mb-6 shadow-lg shadow-accent/10 ${styles.missionIcon}`}
                  whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </motion.div>
                
                <motion.h3 
                  className={`text-3xl md:text-4xl font-bold mb-6 text-white ${styles.missionTitle}`}
                  style={{ fontFamily: 'Creato Display, sans-serif' }}
                  initial={{ opacity: 0 }}
                  animate={titleInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  Our Mission
                </motion.h3>
                
                <motion.p 
                  className={`text-white/80 leading-relaxed text-lg md:text-xl ${styles.missionText}`}
                  initial={{ opacity: 0 }}
                  animate={titleInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  To deliver cutting-edge technology solutions that enable businesses to navigate the digital landscape with confidence and security.
                </motion.p>
              </div>
            </motion.div>
            
            {/* Vision */}
            <motion.div 
              className={`group relative overflow-hidden rounded-3xl p-8 md:p-10 border border-white/10 bg-gradient-to-br from-black/40 via-black/30 to-black/40 backdrop-blur-xl ${styles.visionBox}`}
              initial={{ opacity: 0, x: 50 }}
              animate={titleInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Decorative corner accent */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 rounded-br-full blur-3xl" />
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-accent/5 rounded-tl-full blur-2xl" />
              
              {/* Animated border glow */}
              <div className="absolute inset-0 rounded-3xl border-2 border-primary/0 group-hover:border-primary/30 transition-all duration-500" />
              
              <div className="relative z-10">
                {/* Icon with enhanced design */}
                <motion.div 
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 backdrop-blur-sm border border-primary/20 flex items-center justify-center mb-6 shadow-lg shadow-primary/10 ${styles.visionIcon}`}
                  whileHover={{ rotate: [0, 10, -10, 10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </motion.div>
                
                <motion.h3 
                  className={`text-3xl md:text-4xl font-bold mb-6 text-white ${styles.visionTitle}`}
                  style={{ fontFamily: 'Creato Display, sans-serif' }}
                  initial={{ opacity: 0 }}
                  animate={titleInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  Our Vision
                </motion.h3>
                
                <motion.p 
                  className={`text-white/80 leading-relaxed text-lg md:text-xl ${styles.visionText}`}
                  initial={{ opacity: 0 }}
                  animate={titleInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                >
                  To be the trusted technology partner for businesses seeking innovative solutions for their digital transformation journey.
                </motion.p>
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
            {projects.filter(project => [6, 5, 4].includes(project.id)).sort((a, b) => {
              const order = [6, 5, 4];
              return order.indexOf(a.id) - order.indexOf(b.id);
            }).map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                isInView={projectsInView}
                hoveredIndex={hoveredIndex}
                setHoveredIndex={setHoveredIndex}
                onCardClick={() => project.video && setSelectedProject(project)}
              />
            ))}
          </div>

          {/* Show all Portfolio Button */}
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={projectsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link href="/portfolio">
              <motion.button
                className="px-8 py-4 bg-accent text-white rounded-lg font-semibold text-lg hover:bg-accent/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Show all Portfolio
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Glimpse of Our Projects Section */}
        <div className="mt-24">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={projectsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white"
              style={{ fontFamily: 'Creato Display, sans-serif' }}
            >
              Glimpse of Our Projects
            </h3>
            <p className="text-muted max-w-3xl mx-auto text-lg md:text-xl">
              A behind-the-scenes look into the systems we've shipped – and the results they delivered.
            </p>
          </motion.div>

          {/* Carousel */}
          <div className="relative py-16 md:py-24">
            <div className="relative max-w-7xl mx-auto px-4">
              {/* Carousel Container */}
              <div className="relative overflow-hidden">
                <div className="flex items-center justify-center gap-6 md:gap-8 lg:gap-10">
                  {carouselImages.map((num, index) => {
                    const isCenter = index === currentCarouselIndex;
                    const offset = Math.abs(index - currentCarouselIndex);
                    const isVisible = offset <= 1;
                    
                    // Show 3 images: previous, current, next
                    if (offset > 1) {
                      return null;
                    }
                    
                    // Calculate perspective/rotation for side images
                    const rotation = index < currentCarouselIndex ? -8 : index > currentCarouselIndex ? 8 : 0;
                    const translateX = index < currentCarouselIndex ? -20 : index > currentCarouselIndex ? 20 : 0;
                    
                    return (
                      <motion.div
                        key={num}
                        className={`flex-shrink-0 transition-all duration-700 ${
                          isCenter 
                            ? 'z-20' 
                            : 'z-10'
                        }`}
                        onClick={() => setCurrentCarouselIndex(index)}
                        style={{ cursor: 'pointer', perspective: '1000px' }}
                        initial={{ opacity: 0, scale: 0.8, rotateY: 0 }}
                        animate={{ 
                          opacity: isCenter ? 1 : 0.6,
                          scale: isCenter ? 1.2 : 0.75,
                          rotateY: rotation,
                          x: translateX
                        }}
                        transition={{ duration: 0.7, ease: "easeInOut" }}
                        whileHover={{ scale: isCenter ? 1.25 : 0.8 }}
                      >
                        <div className={`glass-effect rounded-3xl p-2 md:p-3 border border-white/10 relative overflow-hidden group transition-all duration-700 ${
                          isCenter 
                            ? `w-[400px] md:w-[550px] lg:w-[650px] h-[280px] md:h-[380px] lg:h-[450px] shadow-2xl shadow-accent/30 ${carouselStyles.carouselImageCenter}` 
                            : `w-[240px] md:w-[300px] lg:w-[360px] h-[170px] md:h-[220px] lg:h-[260px] ${carouselStyles.carouselImageSide}`
                        }`}>
                          <Image
                            src={`/images/${num}.png`}
                            alt={`Project ${num}`}
                            fill
                            className="object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          {isCenter && (
                            <div className="absolute inset-0 border-2 border-accent/30 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={() => setCurrentCarouselIndex((prev) => (prev === 0 ? carouselImages.length - 1 : prev - 1))}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all duration-300 group shadow-lg"
                aria-label="Previous image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 md:h-8 md:w-8 text-white group-hover:text-accent transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={() => setCurrentCarouselIndex((prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1))}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all duration-300 group shadow-lg"
                aria-label="Next image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 md:h-8 md:w-8 text-white group-hover:text-accent transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Dots Indicator */}
              <div className="flex justify-center gap-2 mt-10">
                {carouselImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentCarouselIndex(index)}
                    className={`transition-all duration-300 rounded-full ${
                      index === currentCarouselIndex
                        ? 'w-10 h-3 bg-accent shadow-lg shadow-accent/50'
                        : 'w-3 h-3 bg-white/30 hover:bg-white/50'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedProject && (
          <VideoModal 
            key={selectedProject.id}
            project={selectedProject} 
            isOpen={selectedProject !== null} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default About;
