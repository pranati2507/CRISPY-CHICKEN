import React, { useState } from 'react';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { LegalPages } from './legal-pages';
import { toast } from 'sonner@2.0.3';

export function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-red-600 mb-2">Crispy Chicken</h2>
              <p className="text-gray-300">
                Serving the world's most delicious fried chicken with our secret blend of 11 herbs and spices since 1952.
              </p>
            </div>
            
            {/* Social Media */}
            <div>
              <h4 className="font-bold mb-4">Follow Us</h4>
              <div className="flex gap-4">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-gray-300 hover:text-white hover:bg-blue-600"
                  onClick={() => {
                    window.open('https://facebook.com/crispychicken', '_blank');
                    toast.success('Opening Facebook page...');
                  }}
                >
                  <Facebook className="w-5 h-5" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-gray-300 hover:text-white hover:bg-blue-400"
                  onClick={() => {
                    window.open('https://twitter.com/crispychicken', '_blank');
                    toast.success('Opening Twitter page...');
                  }}
                >
                  <Twitter className="w-5 h-5" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-gray-300 hover:text-white hover:bg-pink-600"
                  onClick={() => {
                    window.open('https://instagram.com/crispychicken', '_blank');
                    toast.success('Opening Instagram page...');
                  }}
                >
                  <Instagram className="w-5 h-5" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-gray-300 hover:text-white hover:bg-red-600"
                  onClick={() => {
                    window.open('https://youtube.com/crispychicken', '_blank');
                    toast.success('Opening YouTube channel...');
                  }}
                >
                  <Youtube className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#menu" className="text-gray-300 hover:text-white transition-colors">
                  Our Menu
                </a>
              </li>
              <li>
                <a href="#offers" className="text-gray-300 hover:text-white transition-colors">
                  Special Offers
                </a>
              </li>
              <li>
                <a href="#locations" className="text-gray-300 hover:text-white transition-colors">
                  Store Locations
                </a>
              </li>
              <li>
                <a href="#membership" className="text-gray-300 hover:text-white transition-colors">
                  Membership
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-bold mb-6">Customer Service</h4>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => toast.info('Redirecting to order tracking...')}
                  className="text-gray-300 hover:text-white transition-colors text-left"
                >
                  Order Tracking
                </button>
              </li>
              <li>
                <button 
                  onClick={() => toast.info('Free delivery on orders $25+. Delivery time: 25-35 minutes.')}
                  className="text-gray-300 hover:text-white transition-colors text-left"
                >
                  Delivery Info
                </button>
              </li>
              <li>
                <button 
                  onClick={() => toast.info('Nutritional information available on our website and mobile app.')}
                  className="text-gray-300 hover:text-white transition-colors text-left"
                >
                  Nutritional Info
                </button>
              </li>
              <li>
                <button 
                  onClick={() => toast.info('Call (555) 123-HELP or use our live chat for support.')}
                  className="text-gray-300 hover:text-white transition-colors text-left"
                >
                  Contact Support
                </button>
              </li>
              <li>
                <button 
                  onClick={() => toast.info('Full refunds available for order issues. Processing time: 2-3 days.')}
                  className="text-gray-300 hover:text-white transition-colors text-left"
                >
                  Returns & Refunds
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold mb-6">Contact Info</h4>
            <div className="space-y-4">
              <button 
                onClick={() => {
                  window.location.href = 'tel:+15551234567';
                  toast.success('Calling customer service...');
                }}
                className="flex items-start gap-3 text-left hover:text-red-400 transition-colors"
              >
                <Phone className="w-5 h-5 text-red-600 mt-1" />
                <div>
                  <p className="font-medium">(555) 123-CRISPY</p>
                  <p className="text-sm text-gray-300">Customer Service</p>
                </div>
              </button>
              
              <button 
                onClick={() => {
                  window.location.href = 'mailto:support@crispychicken.com';
                  toast.success('Opening email client...');
                }}
                className="flex items-start gap-3 text-left hover:text-red-400 transition-colors"
              >
                <Mail className="w-5 h-5 text-red-600 mt-1" />
                <div>
                  <p className="font-medium">support@crispychicken.com</p>
                  <p className="text-sm text-gray-300">24/7 Email Support</p>
                </div>
              </button>
              
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-red-600 mt-1" />
                <div>
                  <p className="font-medium">24/7 Service</p>
                  <p className="text-sm text-gray-300">Always Here for You</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-gray-800" />

        {/* Bottom Footer */}
        <div className="py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-300 text-sm">
            © 2024 Crispy Chicken. All rights reserved.
          </div>
          
          <div className="flex flex-wrap gap-6 text-sm">
            <LegalPages />
          </div>
        </div>
      </div>
    </footer>
  );
}