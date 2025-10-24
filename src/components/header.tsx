import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  cartItems: number;
  onCartClick: () => void;
}

export function Header({ cartItems, onCartClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [prevCartItems, setPrevCartItems] = useState(cartItems);
  const [showCartAnimation, setShowCartAnimation] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    if (cartItems > prevCartItems) {
      setShowCartAnimation(true);
      const timeout = setTimeout(() => setShowCartAnimation(false), 600);
      return () => clearTimeout(timeout);
    }
    setPrevCartItems(cartItems);
  }, [cartItems, prevCartItems]);

  // Active section detection based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { id: 'home', element: document.querySelector('main') },
        { id: 'menu', element: document.getElementById('menu') },
        { id: 'offers', element: document.getElementById('offers') },
        { id: 'about', element: document.getElementById('about') },
        { id: 'testimonials', element: document.querySelector('[data-section="testimonials"]') },
        { id: 'membership', element: document.getElementById('membership') },
        { id: 'locations', element: document.getElementById('locations') }
      ];

      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element) {
          const offsetTop = section.element.offsetTop;
          if (scrollPosition >= offsetTop) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once to set initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (sectionId === 'testimonials') {
      const element = document.querySelector('[data-section="testimonials"]');
      element?.scrollIntoView({ behavior: 'smooth' });
    } else {
      const element = document.getElementById(sectionId);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  // Handle scroll to detect active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'menu', 'offers', 'about', 'reviews', 'membership', 'locations'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        let element;
        if (section === 'home') {
          element = document.querySelector('main');
        } else if (section === 'reviews') {
          element = document.getElementById('reviews');
        } else {
          element = document.getElementById(section);
        }
        
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsMenuOpen(false);
    
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (sectionId === 'reviews') {
      // Scroll to customer testimonials section
      const reviewsElement = document.querySelector('[data-section="reviews"]');
      if (reviewsElement) {
        reviewsElement.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="bg-red-600 text-white px-4 py-2 rounded-lg mr-3">
              <span className="font-bold text-xl">CRISPY</span>
            </div>
            <span className="text-black font-bold text-lg hidden sm:block">CHICKEN</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => handleNavClick('home')}
              className={`transition-colors font-medium ${
                activeSection === 'home' 
                  ? 'text-red-600 border-b-2 border-red-600 pb-1' 
                  : 'text-gray-700 hover:text-red-600'
              }`}
            >
              Home
            </button>
            <button 
              onClick={() => handleNavClick('menu')}
              className={`transition-colors font-medium ${
                activeSection === 'menu' 
                  ? 'text-red-600 border-b-2 border-red-600 pb-1' 
                  : 'text-gray-700 hover:text-red-600'
              }`}
            >
              Menu
            </button>
            <button 
              onClick={() => handleNavClick('offers')}
              className={`transition-colors font-medium ${
                activeSection === 'offers' 
                  ? 'text-red-600 border-b-2 border-red-600 pb-1' 
                  : 'text-gray-700 hover:text-red-600'
              }`}
            >
              Offers
            </button>
            <button 
              onClick={() => handleNavClick('membership')}
              className={`transition-colors font-medium ${
                activeSection === 'membership' 
                  ? 'text-red-600 border-b-2 border-red-600 pb-1' 
                  : 'text-gray-700 hover:text-red-600'
              }`}
            >
              Membership
            </button>
            <button 
              onClick={() => handleNavClick('about')}
              className={`transition-colors font-medium ${
                activeSection === 'about' 
                  ? 'text-red-600 border-b-2 border-red-600 pb-1' 
                  : 'text-gray-700 hover:text-red-600'
              }`}
            >
              About
            </button>
            <button 
              onClick={() => handleNavClick('reviews')}
              className={`transition-colors font-medium ${
                activeSection === 'reviews' 
                  ? 'text-red-600 border-b-2 border-red-600 pb-1' 
                  : 'text-gray-700 hover:text-red-600'
              }`}
            >
              Reviews
            </button>
            <button 
              onClick={() => handleNavClick('locations')}
              className={`transition-colors font-medium ${
                activeSection === 'locations' 
                  ? 'text-red-600 border-b-2 border-red-600 pb-1' 
                  : 'text-gray-700 hover:text-red-600'
              }`}
            >
              Locations
            </button>
          </nav>

          {/* Cart and Mobile Menu */}
          <div className="flex items-center space-x-4">
            <motion.div
              animate={showCartAnimation ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              <Button
                onClick={onCartClick}
                variant="outline"
                size="sm"
                className="relative border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all duration-200"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Cart
                <AnimatePresence>
                  {cartItems > 0 && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="absolute -top-2 -right-2"
                    >
                      <Badge className="bg-red-600 text-white h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center">
                        {cartItems}
                      </Badge>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-700 hover:text-red-600 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden py-4 border-t border-gray-200"
            >
              <div className="flex flex-col space-y-4">
                <a 
                  href="#home" 
                  className="text-gray-700 hover:text-red-600 transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </a>
                <a 
                  href="#menu" 
                  className="text-gray-700 hover:text-red-600 transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Menu
                </a>
                <a 
                  href="#offers" 
                  className="text-gray-700 hover:text-red-600 transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Offers
                </a>
                <a 
                  href="#membership" 
                  className="text-gray-700 hover:text-red-600 transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Membership
                </a>
                <a 
                  href="#about" 
                  className="text-gray-700 hover:text-red-600 transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </a>
                <a 
                  href="#locations" 
                  className="text-gray-700 hover:text-red-600 transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Locations
                </a>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}