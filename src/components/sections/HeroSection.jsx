import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, RotateCcw, ShieldCheck, Flame, Star } from 'lucide-react';
import { FoodCanvas } from '../3d/FoodCanvas';
import { playClickSound } from '../../utils/sound';

export function HeroSection({ onOpenDishDetail, onOpenCart }) {
  const [activeModel, setActiveModel] = useState('burger');

  const heroDishes = [
    { id: 'burger', label: '3D Burger', icon: '🍔' },
    { id: 'pizza', label: 'Wood Pizza', icon: '🍕' },
    { id: 'donut', label: 'Berry Donut', icon: '🍩' },
    { id: 'sandwich', label: 'Wagyu Club', icon: '🥪' },
    { id: 'fries', label: 'Truffle Fries', icon: '🍟' },
    { id: 'coffee', label: 'Gold Coffee', icon: '☕' },
    { id: 'pasta', label: 'Tagliatelle', icon: '🍝' },
    { id: 'dessert', label: 'Gold Lava', icon: '🍨' },
    { id: 'drink', label: 'Ember Drink', icon: '🍹' },
  ];

  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden">
      {/* Cinematic Background Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-orange-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Column: Typography & CTAs */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="lg:col-span-6 space-y-6 text-center lg:text-left"
        >
          {/* Top Pill Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-orange-400 animate-pulse" />
            <span className="text-xs font-semibold text-slate-200 tracking-wide uppercase">
              Award-Winning 3D Culinary Experience
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black tracking-tight leading-[1.08] text-white">
            Taste Beyond <br />
            <span className="gradient-heading glow-text-orange">Reality.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base lg:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
            Step into a multisensory gastronomy world. Rotate, deconstruct, and inspect artisanal dishes in interactive 3D before savoring oven-fresh delivery to your doorstep.
          </p>

          {/* Interactive Model Selector Buttons */}
          <div className="space-y-2 pt-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block">
              Choose 3D Dish Preview:
            </span>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
              {heroDishes.map((dish) => (
                <button
                  key={dish.id}
                  onClick={() => { playClickSound(); setActiveModel(dish.id); }}
                  className={`px-3 py-1 rounded-xl text-xs font-semibold border transition-all flex items-center space-x-1.5 ${
                    activeModel === dish.id
                      ? 'bg-gradient-to-r from-orange-500 to-amber-500 border-orange-400 text-slate-950 shadow-lg shadow-orange-500/25 scale-105'
                      : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span>{dish.icon}</span>
                  <span>{dish.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <a
              href="#menu"
              onClick={playClickSound}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 font-extrabold text-sm shadow-xl shadow-orange-500/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center space-x-2 group"
            >
              <span>Explore Menu</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <button
              onClick={() => { playClickSound(); onOpenCart(); }}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/5 border border-white/15 hover:bg-white/10 text-white font-bold text-sm backdrop-blur-md transition-all flex items-center justify-center space-x-2"
            >
              <Flame className="w-4 h-4 text-orange-400" />
              <span>Order Now</span>
            </button>
          </div>

          {/* Trust Metrics Pill Bar */}
          <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 text-center lg:text-left">
            <div>
              <div className="flex items-center justify-center lg:justify-start space-x-1 text-amber-400 font-extrabold text-base">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>4.98 / 5</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">340+ Gourmet Reviews</p>
            </div>
            <div>
              <div className="text-white font-extrabold text-base">25 Min</div>
              <p className="text-[11px] text-slate-400 mt-0.5">Volcanic Thermal Delivery</p>
            </div>
            <div>
              <div className="text-emerald-400 font-extrabold text-base flex items-center justify-center lg:justify-start space-x-1">
                <ShieldCheck className="w-4 h-4" />
                <span>100% Organic</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">Michelin Sourced</p>
            </div>
          </div>
        </motion.div>

        {/* Right Column: 3D Interactive Hero Canvas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="lg:col-span-6 h-[420px] sm:h-[500px] lg:h-[600px] relative flex items-center justify-center"
        >
          {/* Glass Card Container */}
          <div className="w-full h-full glass-panel rounded-3xl relative overflow-hidden flex items-center justify-center p-4">
            <FoodCanvas
              modelType={activeModel}
              isHovered={true}
              scale={1.3}
              isInteractive={true}
              enableFloatingParticles={true}
              autoRotate={true}
            />

            {/* Interactive rotation guide overlay */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-slate-950/70 border border-white/10 backdrop-blur-md text-xs text-slate-200 flex items-center space-x-2 pointer-events-none shadow-xl">
              <RotateCcw className="w-4 h-4 text-orange-400 animate-spin-slow" />
              <span className="font-medium">360° Mouse / Touch Drag Control</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
