import React from "react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface HeroSectionProps {
  onOrderNowClick: () => void;
}

export function HeroSection({
  onOrderNowClick,
}: HeroSectionProps) {
  return (
    <section
      id="home"
      className="relative bg-black text-white overflow-hidden"
    >
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1628561427714-5b6dd5082b7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmlzcHklMjBmcmllZCUyMGNoaWNrZW4lMjBidWNrZXQlMjByZXN0YXVyYW50JTIwZm9vZHxlbnwxfHx8fDE3NTc2OTI1NDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Crispy fried chicken bucket restaurant food"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>

      <div className="relative container mx-auto px-4 py-24 md:py-32">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-white">FINGER</span>
            <span className="text-red-600">LICKIN'</span>
            <span className="text-white">GOOD</span>
          </h1>

          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Crispy, juicy, and perfectly seasoned chicken that
            will make your taste buds dance!
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={onOrderNowClick}
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-bold rounded-lg transform transition-all duration-200 hover:shadow-2xl hover:shadow-red-600/25"
            >
              ORDER NOW
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg font-bold rounded-lg transition-all duration-200 min-w-[160px] whitespace-nowrap"
              onClick={() =>
                document
                  .getElementById("menu")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              VIEW MENU
            </Button>
          </div>

          <div className="flex items-center gap-8 mt-12">
            {[
              { number: "50+", label: "Locations" },
              { number: "1M+", label: "Happy Customers" },
              { number: "24/7", label: "Delivery" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}