import React from 'react';
import { motion } from 'framer-motion';
import { Award, Sparkles, UtensilsCrossed, HeartHandshake } from 'lucide-react';

export function StorySection() {
  return (
    <section id="story" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Visual Column */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-6 relative"
        >
          <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl glass-panel p-2">
            <img
              src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=800"
              alt="Executive Chef Crafting 3D Food"
              className="w-full h-[450px] object-cover rounded-2xl brightness-90 hover:brightness-100 transition-all duration-500"
            />
            {/* Overlay Chef Floating Badge */}
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold font-display text-xl">
                3D
              </div>
              <div>
                <h4 className="font-display font-bold text-white text-sm">Chef Antoine Laurent</h4>
                <p className="text-xs text-slate-400">Executive Culinary Technologist & 3 Michelin Star Veteran</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Story Text Column */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-6 space-y-6"
        >
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-widest">
            <Award className="w-3.5 h-3.5" />
            <span>Our Origin Story</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white leading-tight">
            Where <span className="gradient-heading">High-Tech Innovation</span> Meets Culinary Mastery.
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed">
            Founded in 2024, **Savor 3D** was born from a radical vision: why should ordering gourmet food online feel flat and uninspiring?
          </p>

          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
            We combined 3 Michelin-star culinary artistry with cutting-edge real-time 3D web technology. Our guests interact with every ingredient, explore layer-by-layer nutritional breakdowns, and enjoy thermal-preserved flame delivery that tastes exactly as the chef intended.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <h4 className="text-2xl font-bold font-display text-orange-400">50,000+</h4>
              <p className="text-xs text-slate-400 mt-1">3D Orders Served</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <h4 className="text-2xl font-bold font-display text-emerald-400">100%</h4>
              <p className="text-xs text-slate-400 mt-1">Zero Plastic Packaging</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
