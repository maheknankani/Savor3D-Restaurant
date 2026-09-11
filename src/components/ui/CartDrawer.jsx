import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, Trash2, Tag, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playClickSound, playSuccessSound } from '../../utils/sound';

export function CartDrawer({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onClearCart, onOrderSuccess }) {
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.085;
  const delivery = subtotal > 50 ? 0 : subtotal > 0 ? 4.99 : 0;
  const discountAmount = subtotal * discount;
  const total = Math.max(0, subtotal + tax + delivery - discountAmount);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    playClickSound();
    if (promoCode.trim().toUpperCase() === 'SAVOR3D') {
      setDiscount(0.2); // 20% discount
      setPromoApplied(true);
      setPromoError('');
    } else {
      setPromoError('Invalid code. Try "SAVOR3D" for 20% off!');
    }
  };

  const handleCheckout = () => {
    playSuccessSound();
    setIsCheckingOut(true);

    const orderPayload = {
      orderId: Math.floor(1000 + Math.random() * 9000).toString(),
      items: [...cartItems],
      subtotal,
      tax,
      delivery,
      discount,
      discountAmount,
      total,
      date: new Date().toISOString(),
    };

    // Launch celebration confetti
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF6B00', '#FFC72C', '#10B981', '#F43F5E']
    });

    setTimeout(() => {
      setIsCheckingOut(false);
      onClearCart();
      onClose();
      if (onOrderSuccess) onOrderSuccess(orderPayload);
    }, 1200);
  };

  const closeAndReset = () => {
    setCheckoutComplete(false);
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
            onClick={closeAndReset}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60]"
          />

          {/* Slide-over Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0e0e15] border-l border-white/10 text-white z-[60] flex flex-col shadow-2xl overflow-hidden"
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-400">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-white">Your Culinary Basket</h3>
                  <p className="text-xs text-slate-400">{cartItems.length} unique items</p>
                </div>
              </div>
              <button
                onClick={closeAndReset}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {checkoutComplete ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 15 }}
                    className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center"
                  >
                    <CheckCircle2 className="w-10 h-10" />
                  </motion.div>
                  <h3 className="text-2xl font-bold font-display text-white">Order Confirmed!</h3>
                  <p className="text-sm text-slate-400 max-w-xs">
                    Your 3D gourmet meal is being crafted in our volcanic flame kitchen. Estimated delivery in <span className="text-orange-400 font-semibold">25 minutes</span>.
                  </p>
                  <button
                    onClick={closeAndReset}
                    className="mt-6 px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold shadow-lg hover:shadow-orange-500/30 transition-all"
                  >
                    Back to Menu
                  </button>
                </div>
              ) : cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-slate-400 py-16">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-slate-500">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <p className="text-base font-medium">Your basket is currently empty.</p>
                  <p className="text-xs text-slate-500 max-w-xs">Explore our 3D menu and add your favorite creations!</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center space-x-4"
                  >
                    {/* Item Icon Badge */}
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-orange-500/10 to-amber-500/10 border border-orange-500/20 flex items-center justify-center text-3xl">
                      {item.category === 'burgers' ? '🍔' : item.category === 'pizza' ? '🍕' : item.category === 'pasta' ? '🍝' : item.category === 'desserts' ? '🍨' : '🍹'}
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-white text-sm truncate">{item.name}</h4>
                      <p className="text-xs text-orange-400 font-bold">${item.price.toFixed(2)}</p>

                      {/* Add-ons list if any */}
                      {item.selectedAddons && item.selectedAddons.length > 0 && (
                        <p className="text-[10px] text-slate-400 mt-1 truncate">
                          + {item.selectedAddons.map(a => a.name).join(', ')}
                        </p>
                      )}

                      {/* Quantity Modifier */}
                      <div className="flex items-center space-x-3 mt-2">
                        <div className="flex items-center bg-white/5 border border-white/10 rounded-lg">
                          <button
                            onClick={() => { playClickSound(); onUpdateQuantity(item.id, item.quantity - 1); }}
                            className="p-1 text-slate-400 hover:text-white hover:bg-white/10 transition-colors rounded-l-lg"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-2.5 text-xs font-semibold text-white">{item.quantity}</span>
                          <button
                            onClick={() => { playClickSound(); onUpdateQuantity(item.id, item.quantity + 1); }}
                            className="p-1 text-slate-400 hover:text-white hover:bg-white/10 transition-colors rounded-r-lg"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          onClick={() => { playClickSound(); onRemoveItem(item.id); }}
                          className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Item Total */}
                    <div className="text-right">
                      <p className="text-sm font-bold text-white">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Drawer Footer with Price Summary */}
            {cartItems.length > 0 && !checkoutComplete && (
              <div className="p-6 border-t border-white/10 bg-white/[0.02] space-y-4">
                {/* Promo Code Form */}
                <form onSubmit={handleApplyPromo} className="flex space-x-2">
                  <div className="relative flex-1">
                    <Tag className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="text"
                      placeholder="Promo Code (SAVOR3D)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500/50"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-xs font-semibold rounded-xl text-white transition-colors"
                  >
                    Apply
                  </button>
                </form>

                {promoApplied && (
                  <p className="text-xs text-emerald-400 flex items-center space-x-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>20% Promo discount applied!</span>
                  </p>
                )}
                {promoError && (
                  <p className="text-xs text-rose-400">{promoError}</p>
                )}

                {/* Calculation breakdown */}
                <div className="space-y-1.5 text-xs text-slate-400 pt-2 border-t border-white/5">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-white">${subtotal.toFixed(2)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Promo Discount (20%)</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Estimated Tax (8.5%)</span>
                    <span className="text-white">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery</span>
                    <span className="text-white">{delivery === 0 ? 'FREE' : `$${delivery.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between pt-2 text-base font-bold text-white border-t border-white/10">
                    <span>Total Amount</span>
                    <span className="text-orange-400">${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 font-bold text-sm flex items-center justify-center space-x-2 shadow-lg shadow-orange-500/25 transition-all transform active:scale-95 disabled:opacity-50"
                >
                  <span>{isCheckingOut ? 'Securing Kitchen Order...' : 'Proceed to Checkout'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
