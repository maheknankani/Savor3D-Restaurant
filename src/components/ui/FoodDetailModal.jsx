import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Flame, Clock, Plus, Minus, ShoppingBag, RotateCcw, Check, Volume2, VolumeX } from 'lucide-react';
import { FoodCanvas } from '../3d/FoodCanvas';
import { playClickSound, playAddToCartSound, speakText, stopSpeech } from '../../utils/sound';

export function FoodDetailModal({ dish, isOpen, onClose, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [activeIngredientIndex, setActiveIngredientIndex] = useState(0);
  const [isSpeakingDish, setIsSpeakingDish] = useState(false);

  useEffect(() => {
    if (isOpen && dish) {
      speakText(`${dish.name}. ${dish.description}`);
      setIsSpeakingDish(true);
    } else {
      stopSpeech();
      setIsSpeakingDish(false);
    }
    return () => stopSpeech();
  }, [isOpen, dish]);

  if (!dish) return null;

  const handleToggleVoice = () => {
    playClickSound();
    if (isSpeakingDish) {
      stopSpeech();
      setIsSpeakingDish(false);
    } else {
      speakText(`${dish.name}. ${dish.longDescription || dish.description}`);
      setIsSpeakingDish(true);
    }
  };

  const handleCloseModal = () => {
    stopSpeech();
    setIsSpeakingDish(false);
    onClose();
  };

  const toggleAddon = (addon) => {
    playClickSound();
    if (selectedAddons.some(a => a.id === addon.id)) {
      setSelectedAddons(selectedAddons.filter(a => a.id !== addon.id));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  const addonsTotal = selectedAddons.reduce((sum, a) => sum + a.price, 0);
  const itemUnitPrice = dish.price + addonsTotal;
  const totalPrice = itemUnitPrice * quantity;

  const handleAddToCart = () => {
    stopSpeech();
    playAddToCartSound();
    onAddToCart({
      ...dish,
      price: itemUnitPrice,
      quantity,
      selectedAddons
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60] overflow-y-auto p-4 md:p-8 flex items-center justify-center"
          >
            {/* Modal Card */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl bg-[#0f0f17] border border-white/10 rounded-3xl overflow-hidden shadow-2xl text-white my-auto flex flex-col lg:flex-row"
            >
              {/* Close Button */}
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* 3D Interactive Canvas Column */}
              <div className="lg:w-1/2 h-[340px] lg:h-[580px] bg-gradient-to-b from-orange-500/10 via-transparent to-black/40 relative flex flex-col items-center justify-center p-4">
                <FoodCanvas
                  modelType={dish.modelType}
                  isHovered={true}
                  scale={1.25}
                  isInteractive={true}
                  enableFloatingParticles={true}
                  autoRotate={true}
                />

                {/* 360 Rotation Guidance Hint */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 backdrop-blur-md text-xs text-slate-300 flex items-center space-x-2 pointer-events-none">
                  <RotateCcw className="w-3.5 h-3.5 text-orange-400 animate-spin-slow" />
                  <span>360° Drag & Touch to Rotate</span>
                </div>
              </div>

              {/* Dish Details Column */}
              <div className="lg:w-1/2 p-6 lg:p-8 flex flex-col justify-between overflow-y-auto max-h-[600px]">
                <div className="space-y-5">
                  {/* Category & Badge Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-400 text-xs font-semibold uppercase tracking-wider">
                        {dish.badge || dish.category}
                      </span>
                      {/* Voice AI Audio Reader Button */}
                      <button
                        onClick={handleToggleVoice}
                        className={`px-3 py-1 rounded-full text-xs font-semibold border flex items-center space-x-1.5 transition-all ${
                          isSpeakingDish
                            ? 'bg-amber-500 border-amber-400 text-slate-950 shadow-md shadow-amber-500/30 animate-pulse'
                            : 'bg-white/5 border-white/15 text-slate-300 hover:bg-white/10 hover:text-white'
                        }`}
                        title="AI Voice Narration"
                      >
                        {isSpeakingDish ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5 text-slate-400" />}
                        <span>{isSpeakingDish ? 'Speaking Voice...' : 'Listen Voice'}</span>
                      </button>
                    </div>

                    <div className="flex items-center space-x-1 text-amber-400 text-xs font-bold">
                      <Star className="w-4 h-4 fill-amber-400" />
                      <span>{dish.rating} ({dish.reviewsCount} reviews)</span>
                    </div>
                  </div>

                  {/* Dish Title */}
                  <h2 className="text-2xl lg:text-3xl font-display font-extrabold text-white">
                    {dish.name}
                  </h2>

                  {/* Price & Nutrition quick bar */}
                  <div className="flex items-center space-x-6 text-sm text-slate-300">
                    <div className="text-2xl font-bold text-orange-400 font-display">
                      ${dish.price.toFixed(2)}
                    </div>
                    <div className="flex items-center space-x-1.5 text-slate-400">
                      <Flame className="w-4 h-4 text-rose-400" />
                      <span>{dish.calories} kcal</span>
                    </div>
                    <div className="flex items-center space-x-1.5 text-slate-400">
                      <Clock className="w-4 h-4 text-amber-400" />
                      <span>{dish.prepTime}</span>
                    </div>
                  </div>

                  {/* Long Description */}
                  <p className="text-xs lg:text-sm text-slate-300 leading-relaxed">
                    {dish.longDescription}
                  </p>

                  {/* Floating Ingredients Interactive Selector */}
                  {dish.ingredients && dish.ingredients.length > 0 && (
                    <div className="space-y-2 pt-2 border-t border-white/10">
                      <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Deconstructed Ingredients
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {dish.ingredients.map((ing, idx) => (
                          <button
                            key={idx}
                            onClick={() => { playClickSound(); setActiveIngredientIndex(idx); }}
                            className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                              activeIngredientIndex === idx
                                ? 'bg-orange-500/20 border-orange-500 text-white shadow-md'
                                : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                            }`}
                          >
                            {ing.name}
                          </button>
                        ))}
                      </div>
                      {/* Ingredient Detail box */}
                      <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-slate-300">
                        <p className="font-semibold text-orange-400">
                          {dish.ingredients[activeIngredientIndex]?.name}
                        </p>
                        <p className="text-slate-400 mt-1">
                          {dish.ingredients[activeIngredientIndex]?.desc}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Custom Add-ons Checklist */}
                  {dish.customAddons && dish.customAddons.length > 0 && (
                    <div className="space-y-2 pt-2 border-t border-white/10">
                      <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Custom Culinary Enhancements
                      </h4>
                      <div className="space-y-2">
                        {dish.customAddons.map((addon) => {
                          const isSelected = selectedAddons.some(a => a.id === addon.id);
                          return (
                            <button
                              key={addon.id}
                              onClick={() => toggleAddon(addon)}
                              className={`w-full p-2.5 rounded-xl border flex items-center justify-between text-xs transition-all ${
                                isSelected
                                  ? 'bg-orange-500/20 border-orange-500 text-white'
                                  : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                              }`}
                            >
                              <div className="flex items-center space-x-2">
                                <div className={`w-4 h-4 rounded-md border flex items-center justify-center ${isSelected ? 'bg-orange-500 border-orange-500 text-white' : 'border-slate-500'}`}>
                                  {isSelected && <Check className="w-3 h-3" />}
                                </div>
                                <span>{addon.name}</span>
                              </div>
                              <span className="text-orange-400 font-semibold">+${addon.price.toFixed(2)}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Action Footer */}
                <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between space-x-4">
                  {/* Quantity Controller */}
                  <div className="flex items-center bg-white/5 border border-white/10 rounded-2xl p-1">
                    <button
                      onClick={() => { playClickSound(); setQuantity(Math.max(1, quantity - 1)); }}
                      className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 font-bold text-base text-white">{quantity}</span>
                    <button
                      onClick={() => { playClickSound(); setQuantity(quantity + 1); }}
                      className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 font-extrabold text-sm flex items-center justify-center space-x-2 shadow-lg shadow-orange-500/25 transition-all transform active:scale-95"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Basket (${totalPrice.toFixed(2)})</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
