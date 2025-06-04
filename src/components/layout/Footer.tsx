import React from 'react';
import { Link } from 'react-router-dom'; // Assuming react-router-dom is used
import { Briefcase, Home, Info, Mail } from 'lucide-react'; // Example icons

const Footer: React.FC = () => {
  console.log("Rendering Footer");
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Shop', path: '/products', icon: Briefcase }, // Example: /products or /shop
    { name: 'About Us', path: '/about', icon: Info },
    { name: 'Contact', path: '/contact', icon: Mail },
  ];

  return (
    <footer className="bg-background border-t border-border/50 mt-16 py-8 text-muted-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">MyStore Inc.</h3>
            <p className="text-sm">Minimalist designs for modern living.</p>
          </div>
          <div>
            <h4 className="text-md font-medium text-foreground mb-3">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.map(link => (
                <li key={link.name}>
                  <Link to={link.path} className="text-sm hover:text-primary transition-colors flex items-center">
                    <link.icon className="w-4 h-4 mr-2" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-md font-medium text-foreground mb-3">Connect</h4>
            {/* Add social media links here if needed */}
            <p className="text-sm">123 Design Street, Web City</p>
            <p className="text-sm">contact@mystore.dev</p>
          </div>
        </div>
        <div className="border-t border-border/50 pt-6 text-center text-sm">
          <p>&copy; {currentYear} MyStore Inc. All rights reserved.</p>
          <p className="mt-1">
            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link> | <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;