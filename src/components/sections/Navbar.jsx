import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Volume2, VolumeX, Sun, Moon, Menu as MenuIcon, X, Sparkles, UtensilsCrossed } from 'lucide-react';
import { playClickSound, setSoundEnabled, isSoundEnabled } from '../../utils/sound';

export function Navbar({
  cartCount,
  onOpenCart,
  onOpenReservation,
  isDarkMode,
  onToggleTheme
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleSound = () => {
    const nextState = !soundOn;
    setSoundOn(nextState);
    setSoundEnabled(nextState);
    if (nextState) playClickSound();
  };

  const navLinks = [
    { label: 'Hero', href: '#hero' },
    { label: 'Highlights', href: '#featured' },
    { label: 'Interactive Menu', href: '#menu' },
    { label: 'Craft Process', href: '#process' },
    { label: 'Chef Story', href: '#story' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Secret Offer', href: '#offer' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/10 shadow-2xl'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#hero"
          onClick={playClickSound}
          className="flex items-center space-x-3 group"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-600 via-amber-500 to-yellow-400 p-[1.5px] shadow-[0_0_20px_rgba(255,107,0,0.4)] group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#0a0a0f] rounded-[14px] flex items-center justify-center">
              <UtensilsCrossed className="w-5 h-5 text-orange-400 group-hover:rotate-12 transition-transform" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-xl tracking-tight text-white flex items-center gap-1">
              SAVOR <span className="text-orange-500 glow-text-orange">3D</span>
            </span>
            <span className="text-[9px] uppercase tracking-widest text-slate-400 font-semibold">
              Taste Beyond Reality
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center space-x-6 text-xs font-semibold text-slate-300">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={playClickSound}
              className="hover:text-orange-400 transition-colors py-1 relative group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-orange-500 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Header Right Actions */}
        <div className="flex items-center space-x-3">
          {/* Sound FX Toggle */}
          <button
            onClick={handleToggleSound}
            className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
            title={soundOn ? 'Mute Audio FX' : 'Enable Audio FX'}
          >
            {soundOn ? <Volume2 className="w-4 h-4 text-orange-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={() => { playClickSound(); onToggleTheme(); }}
            className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
            title="Toggle Theme Mode"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
          </button>

          {/* Cart Icon Drawer Trigger */}
          <button
            onClick={() => { playClickSound(); onOpenCart(); }}
            className="relative p-2.5 rounded-xl bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-500/30 hover:border-orange-500/60 text-orange-400 transition-all group"
          >
            <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-bold text-[10px] flex items-center justify-center shadow-md animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          {/* Book Table Reservation CTA */}
          <button
            onClick={() => { playClickSound(); onOpenReservation(); }}
            className="hidden sm:flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 font-bold text-xs shadow-lg shadow-orange-500/20 transition-all transform active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Book Table</span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-[#0a0a0f]/95 border-b border-white/10 overflow-hidden backdrop-blur-xl"
          >
            <div className="px-6 py-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => { playClickSound(); setMobileMenuOpen(false); }}
                  className="block text-sm font-semibold text-slate-300 hover:text-orange-400 py-1"
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => { playClickSound(); setMobileMenuOpen(false); onOpenReservation(); }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-bold text-xs"
              >
                Book 3D Table Reservation
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
