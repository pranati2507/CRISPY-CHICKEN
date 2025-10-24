import React, { useState } from 'react';
import { Header } from './components/header';
import { FeaturedDishesCarousel } from './components/featured-dishes-carousel';
import { MenuSection, type MenuItem } from './components/menu-section';
import { OffersSection } from './components/offers-section';
import { AboutSection } from './components/about-section';
import CustomerTestimonials from './components/customer-testimonials';
import MembershipCard from './components/membership-card';
import StoreLocator from './components/store-locator';
import { Footer } from './components/footer';
import { Cart, type CartItem } from './components/cart';
import { LiveOrderTracker } from './components/live-order-tracker';
import { ChatbotSupport } from './components/chatbot-support';
import { ErrorBoundary } from './components/error-boundary';
import { toast } from 'sonner@2.0.3';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showOrderTracker, setShowOrderTracker] = useState(false);

  const addToCart = (item: MenuItem) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(cartItem => cartItem.id === item.id);
      
      if (existingItem) {
        toast.success(`Updated ${item.name} quantity in cart!`);
        return prevItems.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        toast.success(`Added ${item.name} to cart!`);
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const updateCartItemQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(id);
      return;
    }
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (id: string) => {
    setCartItems(prevItems => {
      const item = prevItems.find(item => item.id === id);
      if (item) {
        toast.success(`Removed ${item.name} from cart!`);
      }
      return prevItems.filter(item => item.id !== id);
    });
  };

  const handleCheckout = () => {
    toast.success('Redirecting to checkout...');
    setTimeout(() => {
      setIsCartOpen(false);
      setShowOrderTracker(true);
      toast.success('Order placed successfully! 🎉');
    }, 2000);
  };

  const handleOrderNowClick = () => {
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
  };

  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-white">
        <Header 
          cartItems={totalCartItems} 
          onCartClick={() => setIsCartOpen(true)} 
        />
        
        <main>
          {/* Hero Section */}
          <FeaturedDishesCarousel onOrderNowClick={handleOrderNowClick} />
          
          {/* Content Sections */}
          <div className="space-y-0">
            {/* Menu Section */}
            <section id="menu" className="bg-gray-50 py-20">
              <MenuSection onAddToCart={addToCart} />
            </section>
            
            {/* Offers Section */}
            <section id="offers" className="bg-white py-20">
              <OffersSection />
            </section>
            
            {/* About Section */}
            <section id="about" className="bg-gray-50 py-20">
              <AboutSection />
            </section>
            
            {/* Customer Testimonials */}
            <section id="reviews">
              <CustomerTestimonials />
            </section>
            
            {/* Membership Section */}
            <section id="membership">
              <MembershipCard />
            </section>
            
            {/* Store Locator */}
            <section id="locations" className="bg-gray-100 py-20">
              <StoreLocator />
            </section>
          </div>
        </main>
        
        <Footer />
        
        {/* Modals and Overlays */}
        <Cart
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          onUpdateQuantity={updateCartItemQuantity}
          onRemoveItem={removeFromCart}
          onCheckout={handleCheckout}
        />
        
        <LiveOrderTracker
          isVisible={showOrderTracker}
          cartItemsCount={totalCartItems}
          onClose={() => {
            setShowOrderTracker(false);
            setCartItems([]);
          }}
        />
        
        <Toaster 
          position="top-right"
          toastOptions={{
            style: {
              background: '#DC2626',
              color: 'white',
              border: 'none',
            },
          }}
        />
        
        {/* Chatbot Support */}
        <ChatbotSupport />
      </div>
    </ErrorBoundary>
  );
}