import React, { useState, useMemo, useCallback } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Plus,
  Star,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Flame,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion, AnimatePresence } from "motion/react";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isPopular?: boolean;
  isSpicy?: boolean;
}

interface MenuSectionProps {
  onAddToCart: (item: MenuItem) => void;
}

export function MenuSection({ onAddToCart }: MenuSectionProps) {
  const [activeCategory, setActiveCategory] =
    useState("chicken");

  const categories = [
    { id: "chicken", name: "Chicken", icon: "🍗" },
    { id: "burgers", name: "Burgers", icon: "🍔" },
    { id: "sides", name: "Sides", icon: "🍟" },
    { id: "combos", name: "Combos", icon: "🥤" },
  ];

  const scrollToItem = (direction: "left" | "right") => {
    const container = document.getElementById(
      "menu-scroll-container",
    );
    if (container) {
      const scrollAmount = 320; // Approximate card width + gap
      container.scrollBy({
        left:
          direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const menuItems: MenuItem[] = [
    // Chicken Items (12 items)
    {
      id: "1",
      name: "Chef’s Special Chicken Curry",
      description: "Our signature blend of 11 herbs and spices",
      price: 12.99,
      image:
        "https://www.whiskaffair.com/wp-content/uploads/2021/10/Andhra-Chicken-Curry-2-3.jpg",
      category: "chicken",
      isPopular: true,
    },
    {
      id: "2",
      name: "Spicy Wings",
      description:
        "Crispy chicken wings with our fiery spice blend",
      price: 9.99,
      image:
        "https://smokinandgrillinwitab.com/wp-content/uploads/2023/08/Spicy-Korean-BBQ-Chicken-Wings.jpeg",
      category: "chicken",
      isSpicy: true,
    },
    {
      id: "c3",
      name: "Crispy Chicken Pieces",
      description:
        "Golden crispy chicken pieces, perfect for sharing",
      price: 14.99,
      image:
        "https://images.unsplash.com/photo-1690519315565-c31ce99f8d58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllZCUyMGNoaWNrZW4lMjBwaWVjZXMlMjBnb2xkZW58ZW58MXx8fHwxNzU3MjIxNDU3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "chicken",
      isPopular: true,
    },
    {
      id: "c4",
      name: "Chicken Tenders",
      description:
        "Tender, juicy chicken strips with honey mustard",
      price: 11.99,
      image:
        "https://www.perfectitaliano.com.au/content/dam/perfectitaliano-aus/recipe/0_desktop/18721-Desktop-Traditional-Airfryer%20Chicken-Tenders.jpg",
      category: "chicken",
    },
    {
      id: "c5",
      name: "Grilled Drumsticks",
      description:
        "Smoky grilled chicken drumsticks with BBQ sauce",
      price: 10.99,
      image:
        "https://assets.bonappetit.com/photos/60dce966a33c8d04e301dc20/1:1/w_2560%2Cc_limit/0821-Grilled%2520Pineapple%2520Drumsticks.jpg",
      category: "chicken",
    },
    {
      id: "c6",
      name: "Mini Chicken Crunch",
      description:
        "Crispy golden chicken bites packed with bold flavor",
      price: 8.99,
      image:
        "https://realfood.tesco.com/media/images/1400x919-Nuggets-1c1dfaef-4ac0-4eb6-85c4-a9094ff2e1d1-0-1400x919.jpg",
      category: "chicken",
      isSpicy: true,
    },
    {
      id: "c7",
      name: "Honey Glazed Chicken",
      description:
        "Sweet and savory honey glazed chicken thighs",
      price: 13.99,
      image:
        "https://saltedmint.com/wp-content/uploads/2023/07/Honey-Baked-Chicken-Thighs-2-500x500.jpg",
      category: "chicken",
    },
    {
      id: "c8",
      name: "Golden Broth Chicken Soup",
      description: "Louisiana-style spiced chicken with heat",
      price: 12.49,
      image:
        "https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_4:3/k%2FEdit%2F2023-01-Creamy-Chicken-Soup%2Fcreamy-chicken-soup-4",
      category: "chicken",
      isSpicy: true,
    },
    {
      id: "c9",
      name: "Lemon Herb Chicken",
      description:
        "Fresh lemon and herb marinated chicken breast",
      price: 11.49,
      image:
        "https://afullliving.com/wp-content/uploads/2022/08/Lemon-Herb-Chicken-1200-x-1200.png",
      category: "chicken",
    },
    {
      id: "c10",
      name: "BBQ Chicken Wings",
      description: "Smoky BBQ chicken wings with tangy sauce",
      price: 10.49,
      image:
        "https://www.shutterstock.com/image-photo/chicken-wings-cooked-on-skewers-260nw-1922244587.jpg",
      category: "chicken",
    },
    {
      id: "c11",
      name: "Creamy Butter Chicken",
      description:
        "Rich, creamy, and perfectly spiced butter chicken bliss",
      price: 13.49,
      image:
        "https://niksharmacooks.com/wp-content/uploads/2022/11/ButterChickenDSC_5616.jpg",
      category: "chicken",
      isSpicy: true,
      isPopular: true,
    },
    {
      id: "c12",
      name: "Chicken Biryani",
      description:
        "Aromatic, spiced rice layered with tender chicken perfection",
      price: 11.99,
      image:
        "https://images.lifestyleasia.com/wp-content/uploads/sites/7/2022/08/02184009/Untitled-design-3-1600x900.jpg",
      category: "chicken",
    },

    // Burger Items (10 items)
    {
      id: "3",
      name: "Crispy Chicken Burger",
      description:
        "Juicy chicken breast with fresh lettuce and mayo",
      price: 8.99,
      image:
        "https://images.unsplash.com/photo-1707750795395-f9a4cababde9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwYnVyZ2VyJTIwc2FuZHdpY2h8ZW58MXx8fHwxNzU3MTU1OTg3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "burgers",
      isPopular: true,
    },
    {
      id: "4",
      name: "Signature House Burger",
      description:
        "Our chef’s special creation with a secret house touch",
      price: 10.99,
      image:
        "https://media-cdn.tripadvisor.com/media/photo-s/1a/cc/31/ba/burgers.jpg",
      category: "burgers",
    },
    {
      id: "b3",
      name: "Double Cheeseburger",
      description:
        "Twice the cheese, twice the patty, and double the satisfaction in every bite",
      price: 13.99,
      image:
        "https://www.kitchensanctuary.com/wp-content/uploads/2021/05/Double-Cheeseburger-square-FS-42.jpg",
      category: "burgers",
      isPopular: true,
    },
    {
      id: "b4",
      name: "Spicy Chicken Deluxe",
      description:
        "Spicy chicken breast with jalapeños and pepper jack cheese",
      price: 9.99,
      image:
        "https://images.unsplash.com/photo-1643111998354-07e7a780c92b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmlzcHklMjBjaGlja2VuJTIwc2FuZHdpY2h8ZW58MXx8fHwxNzU3MjIxNDY2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "burgers",
      isSpicy: true,
    },
    {
      id: "b5",
      name: "Popcorn Chicken Burger",
      description:
        "Crispy popcorn chicken in a soft, saucy bun",
      price: 12.49,
      image:
        "https://storage.googleapis.com/shy-pub/33030/1620556659134_SKU-0003_0.jpg",
      category: "burgers",
    },
    {
      id: "b6",
      name: "Mushroom Swiss Burger",
      description:
        "Juicy patty topped with Swiss cheese and savory mushrooms",
      price: 11.49,
      image:
        "https://embed.widencdn.net/img/beef/s3ccow03qm/exact/Mushroom-Swiss-Burger-with-Jalapeno-Aioli_FY22_3.tif?keep=c&u=7fueml",
      category: "burgers",
    },
    {
      id: "b7",
      name: "Vegan Beet Burger",
      description:
        "A vibrant beetroot patty bursting with plant-based flavor",
      price: 10.49,
      image:
        "https://biancazapatka.com/wp-content/uploads/2021/10/rote-bete-burger.jpg",
      category: "burgers",
      isSpicy: true,
    },
    {
      id: "b8",
      name: "Veggie Deluxe Burger",
      description: "Plant-based patty with avocado and sprouts",
      price: 9.49,
      image:
        "https://static1.squarespace.com/static/60231107dfa15a50e4612c46/60231373c7bac516a873bed8/602b48f7b2afaf41bc6dbbae/1656567339015/Veggie+burger+01.jpg?format=1500w",
      category: "burgers",
    },
    {
      id: "b9",
      name: "Fish Fillet Burger",
      description: "Crispy fish fillet with tartar sauce",
      price: 8.49,
      image:
        "https://images.sbs.com.au/dims4/default/b2caf25/2147483647/strip/true/crop/2309x1299+0+0/resize/1280x720!/quality/90/?url=http%3A%2F%2Fsbs-au-brightspot.s3.amazonaws.com%2F54%2Fac%2F12c96abb413fb364f93ecfef90ff%2Frx041-recipe-frida-fillet-o-fish-burger-creditjiwonkim-tcus5-2.jpg",
      category: "burgers",
    },
    {
      id: "b10",
      name: "Supreme Deluxe Burger",
      description: "Our biggest burger with everything on it",
      price: 15.99,
      image:
        "https://www.datocms-assets.com/129288/1725461261-big-juicy-burgers.jpg",
      category: "burgers",
      isPopular: true,
    },

    // Sides Items (12 items)
    {
      id: "5",
      name: "Golden Fries",
      description: "Crispy golden fries seasoned to perfection",
      price: 4.99,
      image:
        "https://www.recipetineats.com/tachyon/2022/09/Fries-with-rosemary-salt_1.jpg",
      category: "sides",
    },
    {
      id: "s2",
      name: "Onion Rings",
      description: "Crispy golden onion rings with ranch dip",
      price: 5.99,
      image:
        "https://smokinandgrillinwitab.com/wp-content/uploads/2025/02/iStock-2188707691-scaled.jpg",
      category: "sides",
      isPopular: true,
    },
    {
      id: "s3",
      name: "Coleslaw",
      description: "Fresh and creamy coleslaw salad",
      price: 3.99,
      image:
        "https://www.retrorecipebox.com/wp-content/uploads/2021/04/easy-coleslaw-featured.jpg",
      category: "sides",
    },
    {
      id: "s4",
      name: "Mac and Cheese",
      description:
        "Creamy macaroni and cheese with breadcrumb topping",
      price: 6.49,
      image:
        "https://www.foodandwine.com/thmb/sEAEhqA3ahWQhJd-VKvmKwHZT9o=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/macaroni-and-cheese-with-buttery-crumbs-FT-RECIPE0220-19359588ccf04af0a2c48c3abf6caf84.jpg",
      category: "sides",
      isPopular: true,
    },
    {
      id: "s5",
      name: "Mashed Potatoes",
      description: "Smooth mashed potatoes with gravy",
      price: 4.49,
      image:
        "https://images.getrecipekit.com/20231111154342-greek-20yogurt-20mashed-20potatoes.jpg?width=650&quality=90&",
      category: "sides",
    },
    {
      id: "s6",
      name: "Sweet Potato Fries",
      description: "Crispy sweet potato fries with cinnamon",
      price: 5.49,
      image:
        "https://www.chewoutloud.com/wp-content/uploads/2023/01/Sweet-Potato-Fries-Horizontal.jpg",
      category: "sides",
    },
    {
      id: "s7",
      name: "Corn on the Cob",
      description: "Buttered corn with herbs and spices",
      price: 3.49,
      image:
        "https://static01.nyt.com/images/2019/09/14/dining/ef-corn-on-the-cob-with-miso-butter-and-chives/merlin_157388811_fc81b580-7de2-4b21-baf7-12edd388bab8-jumbo.jpg",
      category: "sides",
    },
    {
      id: "s8",
      name: "Garlic Bread",
      description: "Toasted bread with garlic butter",
      price: 4.99,
      image:
        "https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/hasselback_garlic_bread_79835_16x9.jpg",
      category: "sides",
    },
    {
      id: "s9",
      name: "Loaded Fries",
      description:
        "Fries topped with cheese, bacon, and sour cream",
      price: 7.99,
      image:
        "https://images.squarespace-cdn.com/content/v1/5ed13dd3465af021e2c1342b/4884db9f-8f8c-4854-a403-99ab3a03e3ad/IMG_9989.jpg",
      category: "sides",
      isPopular: true,
    },
    {
      id: "s10",
      name: "Warm Honey Butter Rolls",
      description: "Warm, flaky biscuits with honey butter",
      price: 2.99,
      image:
        "https://kitchenfunwithmy3sons.com/wp-content/uploads/2020/10/Honey-Butter-Biscuits-34.jpg",
      category: "sides",
    },
    {
      id: "s11",
      name: "Potato Wedges",
      description: "Crispy seasoned potato wedges",
      price: 5.99,
      image:
        "https://www.allrecipes.com/thmb/EkjupGB5tEKODyJgMU_NmLJx4Z8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/266826-air-fryer-potato-wedges-2x1-245-92117597ba594ef884083c1c6270b28c.jpg",
      category: "sides",
    },
    {
      id: "s12",
      name: "Jalapeño Poppers",
      description:
        "Cream cheese filled jalapeños, breaded and fried",
      price: 6.99,
      image:
        "https://therecipecritic.com/wp-content/uploads/2019/11/jalapeno_poppers_hero.jpg",
      category: "sides",
      isSpicy: true,
    },

    // Combo Items (10 items)
    {
      id: "6",
      name: "Family Feast Combo",
      description:
        "A hearty combo packed with all your favorites — perfect for sharing, savoring, and celebrating together",
      price: 32.99,
      image:
        "https://www.bitesbee.com/wp-content/uploads/2021/09/banner-2.jpg",
      category: "combos",
      isPopular: true,
    },
    {
      id: "co2",
      name: "Chicken Tender Combo",
      description:
        "Crispy chicken tenders served with golden fries and a creamy dip for the perfect comfort meal",
      price: 14.99,
      image:
        "https://www.checkersandrallys.com/wp-content/uploads/2025/05/20250325_eComm-Menu-Images-Fry-Seasoned-Chicken-Tenders-Combo_FINAL.jpg",
      category: "combos",
      isPopular: true,
    },
    {
      id: "co3",
      name: "Burger Combo",
      description: "Any burger, fries, and drink",
      price: 12.99,
      image:
        "https://media.istockphoto.com/id/520134277/photo/take-out-food-classic-cheeseburger-meal-isolated-on-white.jpg?s=612x612&w=0&k=20&c=-e-sj-hieOBQclUBRu8E7wRfIxqe4mB_CKnkJwyr-es=",
      category: "combos",
    },
    {
      id: "co4",
      name: "Wings Combo",
      description: "8 wings, fries, drink, and celery sticks",
      price: 16.99,
      image:
        "https://i.pinimg.com/736x/0c/13/58/0c13581404f7ea1ef6192f9eae9f7425.jpg",
      category: "combos",
    },
    {
      id: "co5",
      name: "Double Down Combo",
      description:
        "2 chicken pieces, 2 sides, drink, and biscuit",
      price: 18.99,
      image:
        "https://tb-static.uber.com/prod/image-proc/processed_images/0a28c40270258bb505a31f3697ebc742/0fb376d1da56c05644450062d25c5c84.jpeg",
      category: "combos",
      isPopular: true,
    },
    {
      id: "co6",
      name: "Spicy Combo",
      description:
        "Spicy chicken, spicy fries, drink, and cooling ranch",
      price: 15.99,
      image:
        "https://bloximages.newyork1.vip.townnews.com/franchisetimes.com/content/tncms/assets/v3/editorial/b/0a/b0a3210a-a913-11ef-b3b1-97d9febdd4dd/674f351081339.image.jpg?crop=1033%2C586%2C299%2C479",
      category: "combos",
      isSpicy: true,
    },
    {
      id: "co7",
      name: "Big Box Combo",
      description:
        "Chicken piece, tender, wing, fries, coleslaw, drink",
      price: 19.99,
      image:
        "https://communityimpact.com/uploads/images/2025/04/21/362483.jpg",
      category: "combos",
    },
    {
      id: "co8",
      name: "Date Night Combo",
      description:
        "2 chicken pieces, 2 sides, 2 drinks, 2 desserts",
      price: 24.99,
      image:
        "https://findingtimetofly.com/wp-content/uploads/2025/01/Valentines-Snack-Board.jpg",
      category: "combos",
      isPopular: true,
    },
    {
      id: "co9",
      name: "Game Day Combo",
      description:
        "12 wings, loaded fries, onion rings, 2 drinks",
      price: 28.99,
      image:
        "https://mamaneedscake.com/wp-content/uploads/2025/02/Game-Day-Charcuterie-Board-msn-image.jpg",
      category: "combos",
    },
    {
      id: "co10",
      name: "Ultimate Feast",
      description:
        "16pc mixed chicken, 6 sides, 6 drinks, 4 biscuits",
      price: 49.99,
      image:
        "https://restaurantindia.s3.ap-south-1.amazonaws.com/s3fs-public/news8158.jpg",
      category: "combos",
      isPopular: true,
    },
  ];

  const filteredItems = useMemo(
    () =>
      menuItems.filter(
        (item) => item.category === activeCategory,
      ),
    [activeCategory, menuItems],
  );

  return (
    <div className="relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-red-500/5 blur-3xl" />
        <div className="absolute bottom-20 left-10 w-48 h-48 rounded-full bg-orange-500/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <Sparkles className="w-6 h-6 text-red-500" />
            <h2 className="text-4xl md:text-5xl font-bold text-black">
              Our Delicious Menu
            </h2>
            <Sparkles className="w-6 h-6 text-orange-500" />
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Freshly prepared, always delicious, crafted with
            love
          </p>
        </motion.div>

        {/* Enhanced Category Tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.8 + index * 0.1,
                type: "spring",
                bounce: 0.4,
              }}
              viewport={{ once: true }}
            >
              <motion.div
                whileHover={{
                  scale: 1.05,
                  rotateZ:
                    activeCategory === category.id ? 0 : 2,
                }}
                whileTap={{ scale: 0.95 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 17,
                }}
              >
                <Button
                  onClick={() => setActiveCategory(category.id)}
                  data-category={category.id}
                  variant={
                    activeCategory === category.id
                      ? "default"
                      : "outline"
                  }
                  size="lg"
                  className={`relative overflow-hidden ${
                    activeCategory === category.id
                      ? "bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white shadow-xl shadow-red-600/25"
                      : "border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white bg-white/70 backdrop-blur-sm"
                  } px-8 py-4 font-bold transition-all duration-300 rounded-2xl`}
                >
                  {activeCategory === category.id && (
                    <motion.span
                      className="absolute inset-0 bg-white/20"
                      animate={{
                        x: ["-100%", "100%"],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  )}
                  <motion.span
                    className="mr-3 text-xl relative z-10"
                    animate={
                      activeCategory === category.id
                        ? {
                            scale: [1, 1.2, 1],
                            rotate: [0, 10, -10, 0],
                          }
                        : {}
                    }
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  >
                    {category.icon}
                  </motion.span>
                  <span className="relative z-10">
                    {category.name}
                  </span>
                </Button>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Menu Items Container */}
        <div className="relative">
          {/* Stylized Navigation Arrows */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotateZ: -5 }}
              whileTap={{ scale: 0.9 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 17,
              }}
            >
              <Button
                onClick={() => scrollToItem("left")}
                className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white shadow-xl border-0 rounded-full p-3 h-14 w-14 relative overflow-hidden"
                size="sm"
              >
                <motion.span
                  className="absolute inset-0 bg-white/20"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <ChevronLeft className="w-6 h-6 relative z-10" />
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotateZ: 5 }}
              whileTap={{ scale: 0.9 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 17,
              }}
            >
              <Button
                onClick={() => scrollToItem("right")}
                className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white shadow-xl border-0 rounded-full p-3 h-14 w-14 relative overflow-hidden"
                size="sm"
              >
                <motion.span
                  className="absolute inset-0 bg-white/20"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <ChevronRight className="w-6 h-6 relative z-10" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Animated Menu Items Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              id="menu-scroll-container"
              className="overflow-x-auto scrollbar-hide pb-6"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.6 }}
            >
              <div
                className="flex gap-8 px-12"
                style={{ width: "max-content" }}
              >
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{
                      opacity: 0,
                      y: 50,
                      scale: 0.8,
                      rotateY: -15,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      rotateY: 0,
                    }}
                    transition={{
                      delay: index * 0.1,
                      duration: 0.6,
                      type: "spring",
                      bounce: 0.4,
                    }}
                    className="flex-shrink-0"
                    whileHover={{
                      y: -8,
                      rotateY: 5,
                      transition: { duration: 0.3 },
                    }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    >
                      <Card className="w-80 overflow-hidden bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 relative group">
                        <div className="relative overflow-hidden">
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                          >
                            <ImageWithFallback
                              src={item.image}
                              alt={item.name}
                              className="w-full h-52 object-cover"
                            />
                          </motion.div>

                          {/* Animated Badges */}
                          <div className="absolute top-4 left-4 flex gap-2">
                            {item.isPopular && (
                              <motion.div
                                initial={{
                                  scale: 0,
                                  rotateZ: -180,
                                }}
                                animate={{
                                  scale: 1,
                                  rotateZ: 0,
                                }}
                                transition={{
                                  delay: index * 0.1 + 0.5,
                                  type: "spring",
                                  bounce: 0.6,
                                }}
                              >
                                <Badge className="bg-gradient-to-r from-red-600 to-red-500 text-white border-0 shadow-lg">
                                  <motion.div
                                    animate={{
                                      scale: [1, 1.2, 1],
                                      rotate: [0, 10, -10, 0],
                                    }}
                                    transition={{
                                      duration: 2,
                                      repeat: Infinity,
                                    }}
                                  >
                                    <Star className="w-3 h-3 mr-1 fill-current" />
                                  </motion.div>
                                  Popular
                                </Badge>
                              </motion.div>
                            )}
                            {item.isSpicy && (
                              <motion.div
                                initial={{
                                  scale: 0,
                                  rotateZ: 180,
                                }}
                                animate={{
                                  scale: 1,
                                  rotateZ: 0,
                                }}
                                transition={{
                                  delay: index * 0.1 + 0.7,
                                  type: "spring",
                                  bounce: 0.6,
                                }}
                              >
                                <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 shadow-lg">
                                  <motion.div
                                    animate={{
                                      scale: [1, 1.3, 1],
                                      rotate: [0, 15, -15, 0],
                                    }}
                                    transition={{
                                      duration: 1.5,
                                      repeat: Infinity,
                                    }}
                                  >
                                    <Flame className="w-3 h-3 mr-1" />
                                  </motion.div>
                                  Spicy
                                </Badge>
                              </motion.div>
                            )}
                          </div>

                          {/* Gradient Overlay */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>

                        <CardContent className="p-6 relative">
                          <motion.h3
                            className="font-bold text-xl text-black mb-3 line-clamp-1"
                            whileHover={{ scale: 1.02 }}
                          >
                            {item.name}
                          </motion.h3>
                          <motion.p
                            className="text-gray-600 mb-6 line-clamp-2 leading-relaxed"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                              delay: index * 0.1 + 0.3,
                            }}
                          >
                            {item.description}
                          </motion.p>

                          <div className="flex items-center justify-between">
                            <motion.span
                              className="text-3xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent"
                              animate={{
                                backgroundPosition: [
                                  "0% 50%",
                                  "100% 50%",
                                  "0% 50%",
                                ],
                              }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                              }}
                              style={{
                                backgroundSize: "200% 200%",
                              }}
                            >
                              ${item.price}
                            </motion.span>

                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 17,
                              }}
                            >
                              <Button
                                onClick={() =>
                                  onAddToCart(item)
                                }
                                className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white border-0 shadow-lg hover:shadow-xl relative overflow-hidden group"
                              >
                                <motion.span
                                  className="absolute inset-0 bg-white/20"
                                  initial={{ x: "-100%" }}
                                  whileHover={{ x: "100%" }}
                                  transition={{ duration: 0.6 }}
                                />
                                <div className="relative z-10">
                                  <Plus className="w-4 h-4 mr-2" />
                                </div>
                                <span className="relative z-10">
                                  Add to Cart
                                </span>
                              </Button>
                            </motion.div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}