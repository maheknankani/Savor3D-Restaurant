import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Flame, Sparkles, Truck, Printer, Download, Clock, ShieldCheck, ShoppingBag } from 'lucide-react';
import { playClickSound, playSuccessSound } from '../../utils/sound';

export function OrderTrackerModal({ isOpen, onClose, orderData }) {
  const [currentStep, setCurrentStep] = useState(1); // 0: Placed, 1: Grilling, 2: Quality Check, 3: Delivering
  const [secondsRemaining, setSecondsRemaining] = useState(1500); // 25 min countdown

  useEffect(() => {
    if (!isOpen) return;

    // Simulate step progression over time
    const stepTimer = setTimeout(() => setCurrentStep(1), 1000);
    const step2Timer = setTimeout(() => setCurrentStep(2), 12000);
    const step3Timer = setTimeout(() => setCurrentStep(3), 25000);

    // Live countdown timer
    const countdown = setInterval(() => {
      setSecondsRemaining((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => {
      clearTimeout(stepTimer);
      clearTimeout(step2Timer);
      clearTimeout(step3Timer);
      clearInterval(countdown);
    };
  }, [isOpen]);

  if (!orderData) return null;

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  const steps = [
    {
      id: 0,
      title: 'Order Placed & Received',
      desc: 'Kitchen received 3D culinary order',
      icon: CheckCircle2,
    },
    {
      id: 1,
      title: 'Flame Grilling & Searing',
      desc: 'Oakwood wood-fired oven cooking in progress',
      icon: Flame,
    },
    {
      id: 2,
      title: 'Chef Quality Check',
      desc: 'Plating artistry & temperature validation',
      icon: Sparkles,
    },
    {
      id: 3,
      title: 'Thermal Express Delivery',
      desc: 'Driver en route with 165°F insulated container',
      icon: Truck,
    },
  ];

  const handlePrintReceipt = () => {
    playSuccessSound();

    const receiptHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Savor 3D - Order Receipt ${orderData.orderId}</title>
        <style>
          body { font-family: monospace; padding: 20px; background: #fff; color: #000; max-width: 400px; margin: 0 auto; }
          .header { text-align: center; border-bottom: 2px dashed #000; padding-bottom: 12px; margin-bottom: 12px; }
          .title { font-size: 22px; font-weight: bold; }
          .subtitle { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; }
          .info { font-size: 12px; margin-bottom: 12px; border-bottom: 1px solid #ddd; padding-bottom: 8px; }
          .item { display: flex; justify-content: space-between; font-size: 13px; margin: 6px 0; }
          .addons { font-size: 10px; color: #555; padding-left: 10px; }
          .totals { border-top: 2px dashed #000; margin-top: 12px; padding-top: 8px; font-size: 13px; }
          .total-row { display: flex; justify-content: space-between; margin: 4px 0; }
          .grand-total { font-size: 16px; font-weight: bold; border-top: 1px solid #000; padding-top: 6px; margin-top: 6px; }
          .footer { text-align: center; margin-top: 20px; font-size: 11px; border-top: 1px solid #000; padding-top: 10px; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="title">🍔 SAVOR 3D</div>
          <div class="subtitle">Taste Beyond Reality</div>
          <div>Luxury 3D Dining Experience</div>
        </div>
        <div class="info">
          <div><strong>Order ID:</strong> ${orderData.orderId}</div>
          <div><strong>Date:</strong> ${new Date().toLocaleString()}</div>
          <div><strong>Status:</strong> Kitchen Preparing</div>
        </div>
        <div style="font-weight: bold; margin-bottom: 6px;">ITEMS ORDERED:</div>
        ${orderData.items.map(item => `
          <div class="item">
            <span>${item.quantity}x ${item.name}</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
          </div>
          ${item.selectedAddons && item.selectedAddons.length > 0 ? `
            <div class="addons">+ ${item.selectedAddons.map(a => a.name).join(', ')}</div>
          ` : ''}
        `).join('')}
        <div class="totals">
          <div class="total-row"><span>Subtotal:</span> <span>$${orderData.subtotal.toFixed(2)}</span></div>
          ${orderData.discount > 0 ? `<div class="total-row"><span>Promo Discount:</span> <span>-$${orderData.discountAmount.toFixed(2)}</span></div>` : ''}
          <div class="total-row"><span>Estimated Tax:</span> <span>$${orderData.tax.toFixed(2)}</span></div>
          <div class="total-row"><span>Thermal Delivery:</span> <span>${orderData.delivery === 0 ? 'FREE' : `$${orderData.delivery.toFixed(2)}`}</span></div>
          <div class="total-row grand-total"><span>TOTAL:</span> <span>$${orderData.total.toFixed(2)}</span></div>
        </div>
        <div class="footer">
          <p>Thank you for dining with Savor 3D!</p>
          <p>www.savor3d.com</p>
        </div>
        <script>window.print();</script>
      </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(receiptHtml);
      printWindow.document.close();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md z-[70] flex items-center justify-center p-4 overflow-y-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl bg-[#0e0e16] border border-white/15 rounded-3xl p-6 md:p-8 text-white shadow-2xl my-auto overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-6">
              {/* Header Title & Countdown */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
                <div>
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Order Confirmed #{orderData.orderId}</span>
                  </div>
                  <h3 className="text-2xl font-bold font-display text-white">Live Culinary Progress Tracker</h3>
                </div>

                {/* Remaining Time Countdown Card */}
                <div className="flex items-center space-x-3 bg-white/5 border border-white/10 px-4 py-2.5 rounded-2xl">
                  <Clock className="w-5 h-5 text-orange-400 animate-pulse" />
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-semibold">Estimated Delivery</span>
                    <span className="text-lg font-mono font-extrabold text-orange-400">
                      {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')} min
                    </span>
                  </div>
                </div>
              </div>

              {/* Step-by-Step Interactive Timeline */}
              <div className="py-4">
                <div className="relative flex flex-col md:flex-row items-start justify-between gap-6 md:gap-2">
                  {/* Background Progress Bar Line */}
                  <div className="hidden md:block absolute top-7 left-8 right-8 h-1 bg-white/10 -z-0">
                    <div
                      className="h-full bg-gradient-to-r from-orange-500 via-amber-500 to-emerald-500 transition-all duration-500"
                      style={{ width: `${(currentStep / 3) * 100}%` }}
                    />
                  </div>

                  {steps.map((step) => {
                    const isCompleted = currentStep > step.id;
                    const isCurrent = currentStep === step.id;
                    const IconComponent = step.icon;

                    return (
                      <div key={step.id} className="relative z-10 flex md:flex-col items-center md:text-center gap-4 md:gap-2 flex-1">
                        {/* Step Circle Indicator */}
                        <div
                          className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                            isCompleted
                              ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/30 scale-105'
                              : isCurrent
                              ? 'bg-gradient-to-tr from-orange-500 to-amber-500 text-slate-950 shadow-lg shadow-orange-500/40 animate-pulse scale-110'
                              : 'bg-white/5 border border-white/10 text-slate-500'
                          }`}
                        >
                          <IconComponent className="w-6 h-6" />
                        </div>

                        {/* Step Text */}
                        <div>
                          <h4 className={`text-sm font-bold ${isCurrent ? 'text-orange-400' : isCompleted ? 'text-emerald-400' : 'text-slate-400'}`}>
                            {step.title}
                          </h4>
                          <p className="text-[11px] text-slate-400 max-w-[140px] mt-0.5">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Order Summary & Digital Receipt Action Box */}
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center space-x-2">
                    <ShoppingBag className="w-4 h-4 text-orange-400" />
                    <span className="font-bold text-sm text-white">Digital Receipt & Order Items</span>
                  </div>
                  <button
                    onClick={handlePrintReceipt}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 font-bold text-xs flex items-center space-x-1.5 shadow-md shadow-orange-500/20 transition-all transform active:scale-95"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print / Save Receipt PDF</span>
                  </button>
                </div>

                {/* Itemized Receipt Table */}
                <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                  {orderData.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs text-slate-300">
                      <div>
                        <span className="font-semibold text-white">{item.quantity}x {item.name}</span>
                        {item.selectedAddons && item.selectedAddons.length > 0 && (
                          <span className="text-[10px] text-slate-400 block">+ {item.selectedAddons.map(a => a.name).join(', ')}</span>
                        )}
                      </div>
                      <span className="font-bold text-orange-400">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                {/* Receipt Calculation Footer */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
                  <div className="space-x-4">
                    <span>Subtotal: <strong>${orderData.subtotal.toFixed(2)}</strong></span>
                    <span>Tax: <strong>${orderData.tax.toFixed(2)}</strong></span>
                  </div>
                  <div className="text-base font-extrabold text-white">
                    Total Paid: <span className="text-orange-400">${orderData.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Action Footer */}
              <div className="flex justify-end pt-2">
                <button
                  onClick={onClose}
                  className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors"
                >
                  Close & Back to Dining
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
