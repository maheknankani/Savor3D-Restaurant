import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Gift, Clock, Sparkles, Check, Copy } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playClickSound, playSuccessSound } from '../../utils/sound';

export function SpecialOfferSection() {
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 28, seconds: 45 });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyCode = () => {
    playSuccessSound();
    navigator.clipboard.writeText('SAVOR3D');
    setCopied(true);

    confetti({
      particleCount: 70,
      spread: 50,
      origin: { y: 0.7 },
      colors: ['#FF6B00', '#FFC72C', '#FFFFFF']
    });

    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section id="offer" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-8 sm:p-12 relative overflow-hidden bg-gradient-to-r from-orange-600/20 via-amber-500/10 to-purple-900/20 border border-orange-500/30 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/20 rounded-full blur-[100px] pointer-events-none" />

          {/* Left Details */}
          <div className="space-y-4 max-w-xl text-center lg:text-left z-10">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-300 text-xs font-bold uppercase tracking-wider">
              <Gift className="w-4 h-4 text-orange-400" />
              <span>Limited Edition Chef Vault</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-display font-black text-white leading-tight">
              Get <span className="gradient-gold">20% Off</span> Your First 3D Feast.
            </h2>

            <p className="text-xs sm:text-sm text-slate-300">
              Claim our exclusive culinary promotional passcode to unlock 20% off all orders containing 3D Wagyu or Truffle Pizza dishes.
            </p>

            {/* Countdown Timer */}
            <div className="flex items-center justify-center lg:justify-start space-x-4 pt-2">
              <div className="flex items-center space-x-1.5 text-slate-400 text-xs font-semibold">
                <Clock className="w-4 h-4 text-orange-400 animate-pulse" />
                <span>Offer expires in:</span>
              </div>
              <div className="flex items-center space-x-2 text-white font-mono font-bold text-base bg-black/40 border border-white/10 px-4 py-2 rounded-xl">
                <span>{String(timeLeft.hours).padStart(2, '0')}h</span>
                <span>:</span>
                <span>{String(timeLeft.minutes).padStart(2, '0')}m</span>
                <span>:</span>
                <span>{String(timeLeft.seconds).padStart(2, '0')}s</span>
              </div>
            </div>
          </div>

          {/* Right Coupon Card */}
          <div className="z-10 w-full sm:w-auto text-center">
            <div className="p-6 rounded-2xl bg-black/60 border border-white/15 backdrop-blur-xl space-y-3 min-w-[280px]">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block">
                Promo Passcode
              </span>
              <div className="text-2xl font-black font-mono tracking-widest text-orange-400 py-1">
                SAVOR3D
              </div>
              <button
                onClick={handleCopyCode}
                className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 font-bold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-orange-500/25 transition-all transform active:scale-95"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Passcode Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Promo Code</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
