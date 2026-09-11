import React, { useState } from 'react';
import { UtensilsCrossed, ArrowUp, Send, Check } from 'lucide-react';
import { playClickSound, playSuccessSound } from '../../utils/sound';

export function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const scrollToTop = () => {
    playClickSound();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      playSuccessSound();
      setSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-[#07070b] border-t border-white/10 pt-16 pb-12 text-slate-400 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand Column */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-orange-500 text-slate-950 flex items-center justify-center font-bold">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <span className="font-display font-black text-xl text-white">SAVOR 3D</span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400 max-w-sm">
              The world's premier 3D interactive culinary experience. Savoring the future of gastronomy through real-time graphics, artisanal farm sourcing, and flame crafting.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-white">Experience</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#hero" className="hover:text-orange-400 transition-colors">3D Hero Showcase</a></li>
              <li><a href="#featured" className="hover:text-orange-400 transition-colors">Chef Spotlight</a></li>
              <li><a href="#menu" className="hover:text-orange-400 transition-colors">Interactive Menu</a></li>
              <li><a href="#process" className="hover:text-orange-400 transition-colors">Craft Process</a></li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-white">Brand Story</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#story" className="hover:text-orange-400 transition-colors">About Executive Chef</a></li>
              <li><a href="#reviews" className="hover:text-orange-400 transition-colors">Critics & Reviews</a></li>
              <li><a href="#offer" className="hover:text-orange-400 transition-colors">Secret Passcode</a></li>
              <li><a href="#contact" className="hover:text-orange-400 transition-colors">Studio Location</a></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-white">VIP Gastronomy Club</h4>
            <p className="text-xs text-slate-400">Subscribe for secret off-menu 3D releases & seasonal chef invitations.</p>

            <form onSubmit={handleSubscribe} className="flex space-x-2">
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-slate-950 font-bold text-xs flex items-center justify-center transition-colors"
              >
                {subscribed ? <Check className="w-4 h-4" /> : <Send className="w-4 h-4" />}
              </button>
            </form>
            {subscribed && (
              <p className="text-[11px] text-emerald-400">Welcome to the Savor 3D VIP Club!</p>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 space-y-4 sm:space-y-0">
          <p>© 2026 Savor 3D Inc. All rights reserved. Taste Beyond Reality.</p>

          <button
            onClick={scrollToTop}
            className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors flex items-center space-x-2"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
