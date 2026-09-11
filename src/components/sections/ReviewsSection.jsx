import React from 'react';
import { motion } from 'framer-motion';
import { REVIEWS } from '../../data/foodData';
import { Star, Quote, MessageSquareHeart } from 'lucide-react';

export function ReviewsSection() {
  return (
    <section id="reviews" className="py-24 relative z-10 border-t border-white/5 bg-[#0a0a0f]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-widest">
            <MessageSquareHeart className="w-3.5 h-3.5" />
            <span>Verified Gourmet Testimonials</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white">
            Loved By <span className="gradient-heading">Foodies Worldwide</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Read authentic reviews from top food critics, tech executives, and passionate home epicureans.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((rev, idx) => (
            <motion.div
              key={rev.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="glass-panel rounded-3xl p-8 relative flex flex-col justify-between hover:border-orange-500/30 transition-all duration-300 shadow-xl"
            >
              <Quote className="w-8 h-8 text-orange-500/30 mb-4" />

              <div className="space-y-4 flex-1">
                {/* Rating Stars */}
                <div className="flex items-center space-x-1 text-amber-400">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-slate-200 italic leading-relaxed">
                  "{rev.comment}"
                </p>

                <div className="pt-2">
                  <span className="text-[11px] font-semibold text-orange-400 bg-orange-500/10 px-2.5 py-1 rounded-md">
                    Favorite: {rev.dish}
                  </span>
                </div>
              </div>

              {/* Author */}
              <div className="flex items-center space-x-3 pt-6 mt-6 border-t border-white/10">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-orange-500/40"
                />
                <div>
                  <h4 className="font-display font-bold text-white text-sm">{rev.name}</h4>
                  <p className="text-xs text-slate-400">{rev.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
