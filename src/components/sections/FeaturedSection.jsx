import React from 'react';
import { motion } from 'framer-motion';
import { Star, Flame, Eye, ShoppingBag, Sparkles } from 'lucide-react';
import { FoodCanvas } from '../3d/FoodCanvas';
import { FOOD_ITEMS } from '../../data/foodData';
import { playClickSound, playAddToCartSound } from '../../utils/sound';

export function FeaturedSection({ onOpenDishDetail, onAddToCart }) {
  const featuredDishes = FOOD_ITEMS.slice(0, 3);

  return (
    <section id="featured" className="py-20 relative z-10 border-t border-white/5 bg-[#0a0a0f]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Chef's Spotlight</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white">
            Featured <span className="gradient-heading">3D Masterpieces</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Our most celebrated creations crafted with rare ingredients, precision temperature control, and award-winning presentation.
          </p>
        </div>

        {/* Featured Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredDishes.map((dish, index) => (
            <motion.div
              key={dish.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="glass-panel rounded-3xl p-6 relative flex flex-col justify-between group hover:border-orange-500/40 transition-all duration-300 shadow-xl"
            >
              {/* Badge */}
              <div className="flex items-center justify-between z-10">
                <span className="px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-400 text-xs font-bold uppercase tracking-wider">
                  {dish.badge}
                </span>
                <div className="flex items-center space-x-1 text-amber-400 text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{dish.rating}</span>
                </div>
              </div>

              {/* 3D Mini View Canvas */}
              <div className="h-56 relative my-2 overflow-hidden rounded-2xl bg-gradient-to-b from-white/5 to-transparent">
                <FoodCanvas
                  modelType={dish.modelType}
                  isHovered={false}
                  scale={1.1}
                  isInteractive={true}
                  enableFloatingParticles={false}
                  autoRotate={true}
                />
              </div>

              {/* Dish Info */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xl font-bold font-display text-white group-hover:text-orange-400 transition-colors">
                  {dish.name}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {dish.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {dish.tags.slice(0, 3).map((tag, tIdx) => (
                    <span key={tIdx} className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] text-slate-300">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Footer Action Bar */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="text-xl font-bold text-orange-400 font-display">
                    ${dish.price.toFixed(2)}
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => { playClickSound(); onOpenDishDetail(dish); }}
                      className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                      title="Inspect 3D Detail"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => { playAddToCartSound(); onAddToCart({ ...dish, quantity: 1 }); }}
                      className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 font-bold text-xs flex items-center space-x-1.5 shadow-md shadow-orange-500/20 transition-all transform active:scale-95"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
