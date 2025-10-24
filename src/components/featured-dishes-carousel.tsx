import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Clock,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface FeaturedDish {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  rating: number;
  cookTime: string;
  isSpecial?: boolean;
}

interface FeaturedDishesCarouselProps {
  onOrderNowClick: () => void;
}

export function FeaturedDishesCarousel({
  onOrderNowClick,
}: FeaturedDishesCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const featuredDishes: FeaturedDish[] = [
    {
      id: "1",
      name: "Chef’s Special Chicken Curry",
      description:
        "Our world-famous 11 herbs and spices blend with crispy, juicy chicken",
      price: "$12.99",
      image:
        "https://www.whiskaffair.com/wp-content/uploads/2021/10/Andhra-Chicken-Curry-2-3.jpg",
      rating: 4.9,
      cookTime: "35 min",
      isSpecial: true,
    },
    {
      id: "2",
      name: "Creamy Butter Chicken",
      description:
        "Rich, creamy, and perfectly spiced butter chicken bliss",
      price: "$13.49",
      image:
        "https://niksharmacooks.com/wp-content/uploads/2022/11/ButterChickenDSC_5616.jpg",
      rating: 4.8,
      cookTime: "30 min",
    },
    {
      id: "3",
      name: "Loaded Fries",
      description:
        "Fries topped with cheese, bacon, and sour cream",
      price: "$7.99",
      image:
        "https://images.squarespace-cdn.com/content/v1/5ed13dd3465af021e2c1342b/4884db9f-8f8c-4854-a403-99ab3a03e3ad/IMG_9989.jpg",
      rating: 4.7,
      cookTime: "12 min",
    },
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide(
        (prev) => (prev + 1) % featuredDishes.length,
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, featuredDishes.length]);

  const nextSlide = () => {
    setCurrentSlide(
      (prev) => (prev + 1) % featuredDishes.length,
    );
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) =>
        (prev - 1 + featuredDishes.length) %
        featuredDishes.length,
    );
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const currentDish = featuredDishes[currentSlide];

  return (
    <section
      className="relative bg-gradient-to-br from-red-600 via-red-700 to-black text-white overflow-hidden min-h-screen flex items-center"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <ImageWithFallback
              src={currentDish.image}
              alt={currentDish.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-red-900/50 to-transparent"></div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Main Content */}
      <div className="relative container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
        {/* Left Side - Text Content */}
        <div className="space-y-8">
          {/* Brand Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-white">FINGER</span>
              <br />
              <span className="text-red-400">LICKIN'</span>
              <br />
              <span className="text-white">GOOD</span>
            </motion.h1>

            <motion.p
              className="text-xl text-gray-200 max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Savor Every Bite, Crunch Into Joy, and Let Flavor
              Take Over!
            </motion.p>
          </motion.div>

          {/* Featured Dish Info */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.6 }}
              className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
            >
              <div className="flex items-center gap-4 mb-4">
                {currentDish.isSpecial && (
                  <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    TODAY'S SPECIAL
                  </span>
                )}
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-yellow-400 font-semibold">
                    {currentDish.rating}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-green-400" />
                  <span className="text-green-400 text-sm">
                    {currentDish.cookTime}
                  </span>
                </div>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                {currentDish.name}
              </h2>

              <p className="text-gray-200 mb-4 leading-relaxed">
                {currentDish.description}
              </p>

              <div className="text-3xl font-bold text-red-400">
                {currentDish.price}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Button
              onClick={onOrderNowClick}
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Order Now
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 backdrop-blur-sm bg-white/10"
              onClick={() =>
                document
                  .getElementById("menu")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              View Menu
            </Button>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            className="grid grid-cols-3 gap-6 pt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            {[
              { number: "50+", label: "Locations" },
              { number: "1M+", label: "Happy Customers" },
              { number: "4.8★", label: "Rating" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-white">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right Side - Visual Elements */}
        <div className="hidden lg:block">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="relative"
          >
            {/* Large Featured Image */}
            <div className="relative w-full max-w-lg mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, rotateY: 20 }}
                  animate={{ opacity: 1, rotateY: 0 }}
                  exit={{ opacity: 0, rotateY: -20 }}
                  transition={{ duration: 0.8 }}
                  className="relative rounded-3xl overflow-hidden shadow-2xl"
                >
                  <ImageWithFallback
                    src={currentDish.image}
                    alt={currentDish.name}
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-4">
        <button
          onClick={prevSlide}
          className="p-3 bg-black/40 backdrop-blur-sm rounded-full text-white hover:bg-black/60 transition-all duration-300 border border-white/20"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex gap-2">
          {featuredDishes.map((_, index) => (
            <button
              key={index}
              className={`transition-all duration-300 ${
                index === currentSlide
                  ? "w-8 h-3 bg-red-600 rounded-full"
                  : "w-3 h-3 bg-white/40 hover:bg-white/60 rounded-full"
              }`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="p-3 bg-black/40 backdrop-blur-sm rounded-full text-white hover:bg-black/60 transition-all duration-300 border border-white/20"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}