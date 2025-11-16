"use client";

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import Logo from '@/components/ui/Logo';

// Portfolio projects data (same as in About.tsx)
const projects = [
  {
    id: 1,
    title: 'Capwa - Website Design',
    category: 'Web Design',
    description: 'Modern website design with responsive layout and intuitive user experience.',
    image: '/images/web-design.jpg',
    video: '/images/CapwaVid.mp4',
    technologies: ['React', 'Next.js', 'Tailwind CSS'],
    year: '2024',
    color: 'from-primary to-secondary'
  },
  {
    id: 2,
    title: 'JIP - City Government Portal',
    category: 'Portal Development',
    description: 'Comprehensive portal system for city government services with integrated management tools.',
    image: '/images/cloud-migration.jpg',
    video: '/images/JipPortal.mp4',
    technologies: ['React', 'Node.js', 'Database'],
    year: '2024',
    color: 'from-secondary to-accent'
  },
  {
    id: 3,
    title: 'RBC - Cable Subscription System',
    category: 'Subscription Management',
    description: 'Comprehensive cable subscription management system with flexible package plans, automated billing, payment integration, and user-friendly account management.',
    image: '/images/ecommerce.jpg',
    video: '/images/MidasVid.mp4',
    technologies: ['React', 'Stripe', 'MongoDB'],
    year: '2024',
    color: 'from-accent to-primary'
  },
  {
    id: 4,
    title: 'Mustela - Inventory System',
    category: 'Inventory Management',
    description: 'Complete inventory management system with real-time tracking and reporting features.',
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
  },
  {
    id: 7,
    title: 'JAE - Manufacturing Production System',
    category: 'Manufacturing System',
    description: 'Comprehensive manufacturing production system with barcode and QR code scanning, real-time monitoring, quality control, and production tracking capabilities.',
    image: '/images/application-development.jpg',
    video: '/images/QRBarcodeVid.mp4',
    technologies: ['React', 'Node.js', 'Database'],
    year: '2025',
    color: 'from-primary to-accent'
  },
  {
    id: 8,
    title: 'JAE - Stock Audit System',
    category: 'Inventory Management',
    description: 'Comprehensive stock audit and reconciliation system with automated discrepancy detection, audit trail tracking, and detailed reporting for accurate inventory management.',
    image: '/images/application-development.jpg',
    video: '/images/StockAuditVid.mp4',
    technologies: ['React', 'Node.js', 'Database'],
    year: '2025',
    color: 'from-accent to-primary'
  },
  {
    id: 9,
    title: 'JAE - Production Order Management',
    category: 'Manufacturing System',
    description: 'Comprehensive production order management system with order tracking, workflow automation, and real-time production status monitoring.',
    image: '/images/application-development.jpg',
    video: '/images/PchartVid.mp4',
    technologies: ['React', 'Node.js', 'Database'],
    year: '2025',
    color: 'from-primary to-accent'
  }
];

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
          loop={false}
          muted
          playsInline
          controls
          className="w-full h-full object-contain"
        >
          <source src={project.video} type={project.video.endsWith('.mov') ? 'video/quicktime' : 'video/mp4'} />
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

// Project Card Component
const ProjectCard = ({ 
  project, 
  index,
  onCardClick
}: { 
  project: typeof projects[0]; 
  index: number;
  onCardClick: () => void;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isJAE = project.video?.includes('QRBarcodeVid.mp4');

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      
      // Ensure video plays
      video.play().catch(() => {
        // Autoplay might be blocked, but video will play on user interaction
      });

      if (isJAE) {
        const handleTimeUpdate = () => {
          if (video.currentTime >= 7) {
            video.currentTime = 0;
          }
        };

        video.addEventListener('timeupdate', handleTimeUpdate);
        
        return () => {
          video.removeEventListener('timeupdate', handleTimeUpdate);
        };
      }
    }
  }, [isJAE]);

  return (
    <motion.div
      className="group relative overflow-hidden rounded-2xl cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={onCardClick}
    >
      {/* Background Image/Video */}
      <div className="absolute inset-0 z-0">
        {project.video ? (
          <video
            ref={videoRef}
            autoPlay
            loop={!isJAE}
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          >
            <source src={project.video} type={project.video.endsWith('.mov') ? 'video/quicktime' : 'video/mp4'} />
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

      {/* Glass overlay */}
      <div className={`absolute inset-0 ${project.video ? 'bg-black/20 backdrop-blur-sm group-hover:bg-black/10' : 'bg-black/40 backdrop-blur-sm group-hover:bg-black/20'} transition-all duration-300`} />

      {/* Content */}
      <div className="relative z-10 p-8 h-full min-h-[400px] flex flex-col justify-between">
        {/* Top section */}
        <div>
          <div className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-semibold mb-4">
            {project.category}
          </div>
          
          <h3 
            className="text-3xl md:text-4xl font-bold mb-3 text-white"
            style={{ fontFamily: 'Creato Display, sans-serif' }}
          >
            {project.title}
          </h3>
        </div>

        {/* Bottom section */}
        <div className="space-y-4">
          <p className="text-black text-sm leading-relaxed font-medium">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, i) => (
              <span 
                key={i}
                className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-xs border border-white/20 text-white"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Year badge */}
          <div className="absolute top-6 right-6 w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
            <span className="text-xs font-bold text-white">{project.year}</span>
          </div>
        </div>

        {/* Hover effect border */}
        <div className="absolute inset-0 border-2 border-accent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </motion.div>
  );
};

export default function PortfolioPage() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const router = useRouter();

  const handleBackToHome = () => {
    router.push('/');
    window.scrollTo(0, 0);
  };

  return (
    <main className="min-h-screen bg-black">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between relative z-50">
          <div className="relative z-50">
            <Logo iconSize="w-10 h-10" textSize="text-2xl" />
          </div>
          <Link 
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleBackToHome();
            }}
            className="px-6 py-2 bg-accent text-white rounded-lg font-semibold hover:bg-accent/90 transition-all duration-300 cursor-pointer relative z-50 inline-block"
          >
            Back to Home
          </Link>
        </div>
      </header>

      {/* Portfolio Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          {/* Title Section */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white"
              style={{ fontFamily: 'Creato Display, sans-serif' }}
            >
              Our <span className="text-accent">Portfolio</span>
            </h1>
            <p className="text-black max-w-3xl mx-auto text-lg md:text-xl">
              Showcasing our expertise through successful projects that have transformed businesses and industries
            </p>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onCardClick={() => project.video && setSelectedProject(project)}
              />
            ))}
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
    </main>
  );
}

