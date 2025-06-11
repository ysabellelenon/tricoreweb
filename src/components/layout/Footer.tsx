import Link from 'next/link';
import Logo from '@/components/ui/Logo';

const Footer = () => {
  return (
    <footer className="bg-background border-t border-surface py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="mb-4">
              <Logo iconSize="w-8 h-8" textSize="text-lg" />
            </div>
            <p className="text-muted mb-4 max-w-sm">
              TriCore Information Technology Solutions provides cutting-edge technology services to help businesses transform and thrive in the digital era.
            </p>
            <div className="flex space-x-4">
              {['twitter', 'facebook', 'linkedin', 'github'].map((social) => (
                <a 
                  key={social}
                  href={`https://${social}.com`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full flex items-center justify-center border border-surface hover:border-accent transition-colors duration-300"
                >
                  <span className="text-muted hover:text-accent">{social[0].toUpperCase()}</span>
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-bold uppercase text-muted tracking-wider mb-4">Services</h3>
            <ul className="space-y-2">
              {['Cloud Solutions', 'Cybersecurity', 'IT Consulting', 'Software Development', 'Data Analytics'].map((item) => (
                <li key={item}>
                  <Link href="/services" className="text-foreground hover:text-accent transition-colors duration-300">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-bold uppercase text-muted tracking-wider mb-4">Company</h3>
            <ul className="space-y-2">
              {['About Us', 'Our Team', 'Careers', 'Contact Us', 'Blog'].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-foreground hover:text-accent transition-colors duration-300">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-surface mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted text-sm">
            &copy; {new Date().getFullYear()} TriCore Information Technology Solutions. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy-policy" className="text-muted hover:text-accent text-sm">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="text-muted hover:text-accent text-sm">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 