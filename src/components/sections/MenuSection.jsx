import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Flame, Eye, ShoppingBag, Utensils, Sparkles } from 'lucide-react';
import { FOOD_CATEGORIES, FOOD_ITEMS } from '../../data/foodData';
import { FoodCanvas } from '../3d/FoodCanvas';
import { playClickSound, playAddToCartSound } from '../../utils/sound';

export function MenuSection({ onOpenDishDetail, onAddToCart }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredDishId, setHoveredDishId] = useState(null);

  const filteredDishes = activeCategory === 'all'
    ? FOOD_ITEMS
    : FOOD_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section id="menu" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-widest">
            <Utensils className="w-3.5 h-3.5" />
            <span>Interactive Catalog</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white">
            Explore The <span className="gradient-heading">3D Menu</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Hover over any creation to preview in real-time 3D or click to inspect floating ingredient callouts and flavor profiles.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {FOOD_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => { playClickSound(); setActiveCategory(cat.id); }}
              className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all duration-300 flex items-center space-x-2 border ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 border-orange-400 text-slate-950 shadow-lg shadow-orange-500/25 scale-105'
                  : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Food Items Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredDishes.map((dish) => {
              const isHovered = hoveredDishId === dish.id;
              return (
                <motion.div
                  key={dish.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  onMouseEnter={() => setHoveredDishId(dish.id)}
                  onMouseLeave={() => setHoveredDishId(null)}
                  className="glass-panel rounded-3xl p-5 flex flex-col justify-between group hover:border-orange-500/40 transition-all duration-300 shadow-xl"
                >
                  {/* Top Bar */}
                  <div className="flex items-center justify-between z-10 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
                      {dish.category}
                    </span>
                    <div className="flex items-center space-x-1 text-amber-400 text-xs font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{dish.rating}</span>
                    </div>
                  </div>

                  {/* 3D Canvas Preview Container */}
                  <div
                    onClick={() => { playClickSound(); onOpenDishDetail(dish); }}
                    className="h-48 relative my-2 rounded-2xl overflow-hidden cursor-pointer bg-gradient-to-b from-orange-500/5 via-transparent to-transparent flex items-center justify-center group-hover:scale-105 transition-transform duration-300"
                  >
                    <FoodCanvas
                      modelType={dish.modelType}
                      isHovered={isHovered}
                      scale={1.1}
                      isInteractive={false}
                      enableFloatingParticles={false}
                      autoRotate={isHovered}
                    />

                    {/* Inspect overlay icon on hover */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold text-white flex items-center space-x-1">
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect 3D</span>
                      </span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2 pt-2">
                    <h3 className="font-display font-bold text-lg text-white group-hover:text-orange-400 transition-colors">
                      {dish.name}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {dish.description}
                    </p>

                    {/* Footer Actions */}
                    <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                      <div>
                        <span className="text-xs text-slate-500 block">Price</span>
                        <span className="text-lg font-bold text-orange-400 font-display">
                          ${dish.price.toFixed(2)}
                        </span>
                      </div>

                      <button
                        onClick={() => { playAddToCartSound(); onAddToCart({ ...dish, quantity: 1 }); }}
                        className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 font-bold text-xs flex items-center space-x-1.5 shadow-md shadow-orange-500/20 transition-all transform active:scale-95"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
