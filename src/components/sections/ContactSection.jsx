import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Calendar, Sparkles } from 'lucide-react';
import { playClickSound } from '../../utils/sound';

export function ContactSection({ onOpenReservation }) {
  return (
    <section id="contact" className="py-24 relative z-10 border-t border-white/5 bg-[#0a0a0f]/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Contact Info */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-widest">
              <MapPin className="w-3.5 h-3.5" />
              <span>Location & Hours</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white">
              Visit The <span className="gradient-heading">3D Culinary Studio</span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Whether dining in our multisensory immersive theater or ordering home delivery, we are ready to serve you.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start space-x-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="p-3 rounded-xl bg-orange-500/20 text-orange-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Flagship Address</h4>
                  <p className="text-xs text-slate-400 mt-0.5">742 Gourmet Boulevard, Culinary District, CA 90210</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="p-3 rounded-xl bg-amber-500/20 text-amber-400">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Operating Hours</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Mon - Sun: 11:30 AM – 11:00 PM (Late Night Delivery)</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Direct Concierge</h4>
                  <p className="text-xs text-slate-400 mt-0.5">+1 (800) 728-6733 | concierge@savor3d.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Reservation Trigger Card */}
          <div className="lg:col-span-6">
            <div className="glass-panel rounded-3xl p-8 sm:p-10 text-center space-y-6 border border-orange-500/30 shadow-2xl relative overflow-hidden">
              <div className="w-16 h-16 rounded-2xl bg-orange-500/20 text-orange-400 mx-auto flex items-center justify-center">
                <Calendar className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-display font-extrabold text-white">
                  Reserve Your Immersive Dining Table
                </h3>
                <p className="text-xs text-slate-300 max-w-sm mx-auto">
                  Experience interactive projection mapping and live table 3D flame searing.
                </p>
              </div>

              <button
                onClick={() => { playClickSound(); onOpenReservation(); }}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 text-slate-950 font-extrabold text-sm shadow-xl shadow-orange-500/25 transition-all transform active:scale-95 flex items-center justify-center space-x-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Book 3D Table Reservation Now</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
