import React, { useState, useEffect, memo } from 'react';
import { Card, CardContent } from './ui/card';
import { Star, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  comment: string;
  avatar: string;
  verified: boolean;
}

export function CustomerTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      location: "New York, NY",
      rating: 5,
      comment: "Absolutely amazing! The Original Recipe chicken is finger lickin' good indeed. Best fried chicken I've ever had!",
      avatar: "👩‍🦰",
      verified: true
    },
    {
      id: 2,
      name: "Mike Chen",
      location: "Los Angeles, CA",
      rating: 5,
      comment: "The spicy Nashville Hot is incredible! Perfect amount of heat and flavor. The service was outstanding too.",
      avatar: "👨‍💼",
      verified: true
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      location: "Chicago, IL",
      rating: 5,
      comment: "Family feast combo was perfect for our gathering. Everyone loved it! Great value for money and super fresh.",
      avatar: "👩‍🎓",
      verified: true
    },
    {
      id: 4,
      name: "David Wilson",
      location: "Houston, TX",
      rating: 5,
      comment: "The chicken sandwich is a game changer! Crispy, juicy, and the perfect size. Will definitely order again!",
      avatar: "👨‍🍳",
      verified: true
    },
    {
      id: 5,
      name: "Lisa Thompson",
      location: "Miami, FL",
      rating: 5,
      comment: "Best delivery service! Food arrived hot and fresh. The wings are addictive - my new favorite spot!",
      avatar: "👩‍💻",
      verified: true
    },
    {
      id: 6,
      name: "James Park",
      location: "Seattle, WA",
      rating: 5,
      comment: "The secret 11 herbs and spices really make a difference. You can taste the quality in every bite!",
      avatar: "👨‍🎨",
      verified: true
    }
  ];

  // Auto-rotate testimonials every 5 seconds (reduced frequency)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    // Only start interval after a delay to avoid blocking initial render
    const timer = setTimeout(() => {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }, 5000);
    }, 3000); // Wait 3 seconds before starting rotation

    return () => {
      clearTimeout(timer);
      if (interval) {
        clearInterval(interval);
      }
    };
  }, []);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section 
      data-section="reviews" 
      className="relative bg-gradient-to-br from-gray-50 to-gray-100 py-20"
    >
      {/* Bold Red Highlight Border */}
      <div className="absolute inset-0 border-4 border-red-600 pointer-events-none opacity-80"></div>
      <div className="absolute inset-2 border-2 border-red-400 pointer-events-none opacity-60"></div>
      
      {/* Red Corner Accents */}
      <div className="absolute top-0 left-0 w-16 h-16 bg-red-600 opacity-20"></div>
      <div className="absolute top-0 right-0 w-16 h-16 bg-red-600 opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-red-600 opacity-20"></div>
      <div className="absolute bottom-0 right-0 w-16 h-16 bg-red-600 opacity-20"></div>
      
      {/* Animated Red Glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-red-600 via-transparent to-red-600 opacity-30 blur-sm animate-pulse"></div>
      
      <div className="relative container mx-auto px-4 lg:px-8">
        {/* Section Header with Red Accents */}
        <div className="text-center mb-12 relative">
          {/* Red Title Background */}
          <div className="absolute inset-0 bg-red-600 opacity-5 rounded-2xl transform -rotate-1"></div>
          
          <motion.div
            className="relative bg-white border-2 border-red-500 rounded-2xl p-8 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
              <span className="text-red-600">★</span> What Our Customers Say <span className="text-red-600">★</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real reviews from real customers who love our finger lickin' good chicken!
            </p>
            
            {/* Red Accent Lines */}
            <div className="flex items-center justify-center mt-4 gap-4">
              <div className="w-16 h-1 bg-red-600 rounded"></div>
              <div className="w-2 h-2 bg-red-600 rounded-full"></div>
              <div className="w-16 h-1 bg-red-600 rounded"></div>
            </div>
          </motion.div>
        </div>

        {/* Main Testimonial Card */}
        <div className="max-w-4xl mx-auto mb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.9 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <Card className="bg-white shadow-2xl border-4 border-red-500 overflow-hidden relative ring-4 ring-red-200 shadow-red-500/25">
                {/* Quote Icon */}
                <div className="absolute top-6 left-6 text-red-600/20">
                  <Quote className="w-16 h-16" />
                </div>
                
                <CardContent className="p-8 md:p-12 relative">
                  {/* Rating Stars */}
                  <div className="flex justify-center mb-6">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.1, duration: 0.3 }}
                      >
                        <Star className="w-6 h-6 text-yellow-400 fill-current mx-1" />
                      </motion.div>
                    ))}
                  </div>

                  {/* Comment */}
                  <motion.blockquote 
                    className="text-xl md:text-2xl text-gray-700 text-center mb-8 leading-relaxed italic"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    "{currentTestimonial.comment}"
                  </motion.blockquote>

                  {/* Customer Info */}
                  <motion.div 
                    className="flex items-center justify-center gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    <div className="text-4xl">{currentTestimonial.avatar}</div>
                    <div className="text-center">
                      <div className="flex items-center gap-2 justify-center mb-1">
                        <h4 className="font-bold text-lg text-black">{currentTestimonial.name}</h4>
                        {currentTestimonial.verified && (
                          <span className="text-green-600 text-sm">✓ Verified</span>
                        )}
                      </div>
                      <p className="text-gray-500">{currentTestimonial.location}</p>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Testimonial Indicators */}
        <div className="flex justify-center gap-3 mb-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-red-600 w-8' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Quick Stats with Red Highlights */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="text-center bg-white border-2 border-red-500 rounded-xl p-6 shadow-lg">
            <div className="text-4xl font-bold text-red-600 mb-2">4.9★</div>
            <div className="text-gray-600 font-medium">Average Rating</div>
          </div>
          <div className="text-center bg-red-600 border-2 border-red-700 rounded-xl p-6 shadow-lg text-white">
            <div className="text-4xl font-bold mb-2">50K+</div>
            <div className="font-medium">Happy Customers</div>
          </div>
          <div className="text-center bg-white border-2 border-red-500 rounded-xl p-6 shadow-lg">
            <div className="text-4xl font-bold text-red-600 mb-2">99%</div>
            <div className="text-gray-600 font-medium">Would Recommend</div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-lg text-gray-600 mb-6">
            Join thousands of satisfied customers and taste the difference!
          </p>
          <motion.button
            onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-red-600 hover:bg-red-700 text-white px-10 py-5 rounded-xl font-bold text-xl transition-all duration-300 shadow-2xl hover:shadow-3xl border-2 border-red-800 hover:border-red-900"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            🍗 Order Your Favorites Now 🍗
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

export default memo(CustomerTestimonials);