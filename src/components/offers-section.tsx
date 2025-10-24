import React, { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Clock,
  Percent,
  Gift,
  Star,
  Copy,
  Check,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { toast } from "sonner@2.0.3";
import { motion } from "motion/react";

export function OffersSection() {
  const [email, setEmail] = useState("");
  const [copiedCode, setCopiedCode] = useState<string | null>(
    null,
  );

  const handleSubscribe = () => {
    if (email.trim() && email.includes("@")) {
      toast.success(
        "Successfully subscribed for exclusive offers!",
      );
      setEmail("");
    } else {
      toast.error("Please enter a valid email address");
    }
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast.success(`Code ${code} copied to clipboard!`);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const offers = [
    {
      id: "1",
      title: "50% OFF",
      subtitle: "Family Feast Combo",
      description:
        "Get our signature family combo at half price! Perfect for sharing with loved ones.",
      code: "FAMILY50",
      category: "combos",
      image:
        "https://www.amcsa.co.za/docs/6757/2025_04_Main%20Banners4-min.jpg",
      validUntil: "Dec 31, 2024",
      bgColor: "bg-red-600",
      icon: <Percent className="w-5 h-5" />,
    },
    {
      id: "2",
      title: "FREE FRIES",
      subtitle: "With Any Burger",
      description:
        "Order any burger and get a free side of our golden crispy fries!",
      code: "FREEFRIES",
      category: "burgers",
      image:
        "https://tb-static.uber.com/prod/image-proc/processed_images/26edb07cfca679e3c95e1cb84f0f6eb8/fdf52d66534809b650058f41d517d74a.jpeg",
      validUntil: "Dec 25, 2024",
      bgColor: "bg-black",
      icon: <Gift className="w-5 h-5" />,
    },
    {
      id: "3",
      title: "BUY 2 GET 1 FREE",
      subtitle: "Chicken Wings",
      description:
        "Get an extra portion of our spicy wings absolutely free!",
      code: "WINGS3",
      category: "chicken",
      image:
        "https://www.spoonfulofflavor.com/wp-content/uploads/2025/06/air-fryer-bbq-chicken-wing.jpg",
      validUntil: "Dec 20, 2024",
      bgColor: "bg-orange-500",
      icon: <Star className="w-5 h-5" />,
    },
  ];

  const handleOrderNow = (offer: any) => {
    // Navigate to menu and set the specific category
    document
      .getElementById("menu")
      ?.scrollIntoView({ behavior: "smooth" });

    // Wait for scroll to complete, then trigger category selection
    setTimeout(() => {
      const categoryButton = document.querySelector(
        `[data-category="${offer.category}"]`,
      );
      if (categoryButton) {
        (categoryButton as HTMLElement).click();
      }
      toast.success(
        `Showing ${offer.category} menu for ${offer.subtitle}!`,
      );
    }, 1000);
  };

  return (
    <div className="relative">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-32 left-20 w-72 h-72 rounded-full bg-red-400/8 blur-3xl" />
        <div className="absolute bottom-32 right-20 w-64 h-64 rounded-full bg-orange-400/8 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-black mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Hot Deals & Offers
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Limited time offers you don't want to miss!
          </motion.p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {offers.map((offer, index) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden border-0 shadow-xl bg-white hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                {/* Offer Badge */}
                <div className="absolute top-3 left-3 z-20">
                  <Badge
                    className={`${offer.bgColor} text-white px-2 py-1 text-xs font-bold border-0`}
                  >
                    <span className="flex items-center gap-1">
                      {offer.icon}
                      LIMITED
                    </span>
                  </Badge>
                </div>

                {/* Expiry Date */}
                <div className="absolute bottom-3 right-3 z-20">
                  <div className="bg-black/70 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium text-white flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {offer.validUntil}
                  </div>
                </div>

                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={offer.image}
                    alt={offer.subtitle}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>

                <CardContent className="p-6">
                  {/* Offer Title */}
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-black mb-1">
                      {offer.title}
                    </h3>
                    <p className="text-lg text-gray-700 font-medium">
                      {offer.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 mb-6 line-height-relaxed">
                    {offer.description}
                  </p>

                  {/* Promo Code */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">
                          Promo Code
                        </p>
                        <p className="font-bold text-lg text-black">
                          {offer.code}
                        </p>
                      </div>
                      <Button
                        onClick={() => copyCode(offer.code)}
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2"
                      >
                        {copiedCode === offer.code ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                        {copiedCode === offer.code
                          ? "Copied!"
                          : "Copy"}
                      </Button>
                    </div>
                  </div>

                  {/* Order Button */}
                  <Button
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 mt-4"
                    onClick={() => handleOrderNow(offer)}
                  >
                    Order Now
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Subscription */}
        <motion.div
          className="bg-gradient-to-br from-gray-900 via-black to-gray-800 rounded-2xl p-8 text-center text-white border border-gray-700"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
              Get Exclusive Deals
            </h3>
            <p className="text-gray-300 mb-6">
              Subscribe to our newsletter and be the first to
              know about special offers, new menu items, and
              exclusive discounts!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg text-black bg-white border border-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 placeholder-gray-500"
              />
              <Button
                onClick={handleSubscribe}
                className="bg-red-600 text-white hover:bg-red-700 font-bold px-8 py-3 transition-all duration-300"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}