import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CustomCursor } from './components/ui/CustomCursor';
import { ScrollProgress } from './components/ui/ScrollProgress';
import { Navbar } from './components/sections/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { FeaturedSection } from './components/sections/FeaturedSection';
import { MenuSection } from './components/sections/MenuSection';
import { ProcessSection } from './components/sections/ProcessSection';
import { StorySection } from './components/sections/StorySection';
import { ReviewsSection } from './components/sections/ReviewsSection';
import { SpecialOfferSection } from './components/sections/SpecialOfferSection';
import { ContactSection } from './components/sections/ContactSection';
import { Footer } from './components/sections/Footer';

import { FoodDetailModal } from './components/ui/FoodDetailModal';
import { CartDrawer } from './components/ui/CartDrawer';
import { ReservationModal } from './components/ui/ReservationModal';
import { OrderTrackerModal } from './components/ui/OrderTrackerModal';
import { UtensilsCrossed, Sparkles } from 'lucide-react';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [selectedDishForDetail, setSelectedDishForDetail] = useState(null);
  const [activeOrderData, setActiveOrderData] = useState(null);
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);

  // App Initial Loading Screen Simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 300);
          return 100;
        }
        return prev + 20;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  const handleAddToCart = (dishItem) => {
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(i => i.id === dishItem.id);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += (dishItem.quantity || 1);
        return updated;
      }
      return [...prevItems, { ...dishItem, quantity: dishItem.quantity || 1 }];
    });
  };

  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(id);
    } else {
      setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity: newQuantity } : item));
    }
  };

  const handleRemoveItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleOrderSuccess = (orderPayload) => {
    setActiveOrderData(orderPayload);
    setIsTrackerOpen(true);
  };

  const handleToggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className={`custom-cursor-active min-h-screen ${isDarkMode ? 'bg-[#0a0a0f] text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      {/* Interactive Custom Cursor */}
      <CustomCursor />

      {/* Top Scroll Indicator */}
      <ScrollProgress />

      {/* Initial 3D Splash Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#0a0a0f] flex flex-col items-center justify-center space-y-6 text-white"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-400 p-[2px] shadow-[0_0_40px_rgba(255,107,0,0.5)]"
            >
              <div className="w-full h-full bg-[#0a0a0f] rounded-2xl flex items-center justify-center">
                <UtensilsCrossed className="w-8 h-8 text-orange-400" />
              </div>
            </motion.div>

            <div className="text-center space-y-2">
              <h2 className="text-2xl font-display font-extrabold tracking-tight">SAVOR 3D</h2>
              <p className="text-xs text-slate-400 flex items-center space-x-1.5 justify-center">
                <Sparkles className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
                <span>Loading 3D WebGL Engine & Shaders...</span>
              </p>
            </div>

            <div className="w-48 h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-orange-500 to-amber-400 transition-all duration-200"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Primary Layout */}
      {!isLoading && (
        <>
          <Navbar
            cartCount={totalCartCount}
            onOpenCart={() => setIsCartOpen(true)}
            onOpenReservation={() => setIsReservationOpen(true)}
            isDarkMode={isDarkMode}
            onToggleTheme={handleToggleTheme}
          />

          <main>
            <HeroSection
              onOpenDishDetail={(dish) => setSelectedDishForDetail(dish)}
              onOpenCart={() => setIsCartOpen(true)}
            />

            <FeaturedSection
              onOpenDishDetail={(dish) => setSelectedDishForDetail(dish)}
              onAddToCart={handleAddToCart}
            />

            <MenuSection
              onOpenDishDetail={(dish) => setSelectedDishForDetail(dish)}
              onAddToCart={handleAddToCart}
            />

            <ProcessSection />

            <StorySection />

            <ReviewsSection />

            <SpecialOfferSection />

            <ContactSection
              onOpenReservation={() => setIsReservationOpen(true)}
            />
          </main>

          <Footer />

          {/* Interactive Modals & Overlays */}
          <FoodDetailModal
            dish={selectedDishForDetail}
            isOpen={Boolean(selectedDishForDetail)}
            onClose={() => setSelectedDishForDetail(null)}
            onAddToCart={handleAddToCart}
          />

          <CartDrawer
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onClearCart={handleClearCart}
            onOrderSuccess={handleOrderSuccess}
          />

          <ReservationModal
            isOpen={isReservationOpen}
            onClose={() => setIsReservationOpen(false)}
          />

          <OrderTrackerModal
            isOpen={isTrackerOpen}
            onClose={() => setIsTrackerOpen(false)}
            orderData={activeOrderData}
          />
        </>
      )}
    </div>
  );
}
