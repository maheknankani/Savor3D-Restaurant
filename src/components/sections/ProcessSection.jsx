import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PROCESS_STEPS } from '../../data/foodData';
import { Leaf, Boxes, Flame, Truck, Sparkles, CheckCircle2 } from 'lucide-react';
import { playClickSound } from '../../utils/sound';

export function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0);

  const getStepIcon = (iconName) => {
    switch (iconName) {
      case 'Leaf': return <Leaf className="w-6 h-6" />;
      case 'Boxes': return <Boxes className="w-6 h-6" />;
      case 'Flame': return <Flame className="w-6 h-6" />;
      case 'Truck': return <Truck className="w-6 h-6" />;
      default: return <Sparkles className="w-6 h-6" />;
    }
  };

  return (
    <section id="process" className="py-24 relative z-10 border-t border-white/5 bg-[#0e0e16]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Artisanal Alchemy</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white">
            How We <span className="gradient-heading">Make It</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            From Michelin-certified sustainable farms to 3D flavor mapping and volcanic stone roasting.
          </p>
        </div>

        {/* 4-Step Interactive Timeline Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          {PROCESS_STEPS.map((step, idx) => {
            const isActive = activeStep === idx;
            return (
              <button
                key={step.number}
                onClick={() => { playClickSound(); setActiveStep(idx); }}
                className={`p-6 rounded-3xl border text-left transition-all duration-300 relative overflow-hidden ${
                  isActive
                    ? 'bg-gradient-to-b from-orange-500/20 to-amber-500/5 border-orange-500 text-white shadow-xl shadow-orange-500/10'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-2xl font-black font-display ${isActive ? 'text-orange-400' : 'text-slate-600'}`}>
                    {step.number}
                  </span>
                  <div className={`p-3 rounded-2xl ${isActive ? 'bg-orange-500 text-slate-950' : 'bg-white/5 text-slate-400'}`}>
                    {getStepIcon(step.icon)}
                  </div>
                </div>
                <h4 className="font-display font-bold text-base text-white mb-1">{step.title}</h4>
                <p className="text-xs text-orange-400 font-semibold">{step.subtitle}</p>
              </button>
            );
          })}
        </div>

        {/* Active Step Feature Banner */}
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="glass-panel rounded-3xl p-8 lg:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center space-x-2 text-xs font-bold text-orange-400 uppercase tracking-widest">
              <CheckCircle2 className="w-4 h-4" />
              <span>Step {PROCESS_STEPS[activeStep].number} Detail</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-display font-extrabold text-white">
              {PROCESS_STEPS[activeStep].title}
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              {PROCESS_STEPS[activeStep].desc}
            </p>
          </div>

          <div className="w-full md:w-72 h-48 rounded-2xl bg-gradient-to-tr from-orange-600/20 via-amber-500/10 to-transparent border border-orange-500/30 flex items-center justify-center p-6 text-center">
            <div className="space-y-2">
              <div className="w-16 h-16 rounded-2xl bg-orange-500/20 text-orange-400 mx-auto flex items-center justify-center">
                {getStepIcon(PROCESS_STEPS[activeStep].icon)}
              </div>
              <p className="text-xs font-bold text-white uppercase tracking-wider">
                Precision Quality Guaranteed
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
