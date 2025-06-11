import Link from 'next/link';
import Logo from '@/components/ui/Logo';

const Footer = () => {
  return (
    <footer className="bg-background border-t border-surface py-12">
      <div className="container mx-auto px-4">
        <div>
          <div className="mb-4">
            <Logo iconSize="w-8 h-8" textSize="text-lg" />
          </div>
          <p className="text-muted mb-4 max-w-sm">
            TriCore Information Technology Solutions provides cutting-edge technology services to help businesses transform and thrive in the digital era.
          </p>
        </div>
        
        <div className="border-t border-surface mt-12 pt-8 flex flex-col md:flex-row justify-center items-center">
          <p className="text-muted text-sm">
            &copy; {new Date().getFullYear()} TriCore Information Technology Solutions. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 