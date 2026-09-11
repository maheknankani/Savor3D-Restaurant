import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, Users, Sparkles, CheckCircle2, MapPin, Armchair } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playClickSound, playSuccessSound } from '../../utils/sound';
import { RestaurantFloorMap, RESTAURANT_TABLES } from '../3d/RestaurantFloorMap';

export function ReservationModal({ isOpen, onClose }) {
  const [selectedTable, setSelectedTable] = useState(RESTAURANT_TABLES[0]); // Table 1 default
  const [date, setDate] = useState('2026-09-10');
  const [time, setTime] = useState('19:30');
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    playSuccessSound();

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.5 },
      colors: ['#FF6B00', '#FFC72C', '#10B981', '#38BDF8']
    });

    setIsSubmitted(true);
  };

  const handleClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  const handleSelectTableFromMap = (table) => {
    setSelectedTable(table);
    setGuests(table.capacity);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md z-[60] flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl bg-[#0e0e16] border border-white/15 rounded-3xl p-6 md:p-8 text-white shadow-2xl my-auto overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {isSubmitted ? (
              <div className="text-center py-10 space-y-5 max-w-md mx-auto">
                <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-bold font-display">Reservation Confirmed!</h3>
                <p className="text-sm text-slate-300">
                  Your table <span className="text-orange-400 font-bold">{selectedTable.name}</span> in the <span className="text-orange-400 font-semibold">{selectedTable.zone}</span> is reserved for <span className="text-orange-400 font-semibold">{date} at {time}</span>.
                </p>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-300 text-left space-y-1.5">
                  <p><strong>Guest Name:</strong> {name || 'Valued Guest'}</p>
                  <p><strong>3D Table Selected:</strong> {selectedTable.name} ({selectedTable.capacity} Seats)</p>
                  <p><strong>Party Size:</strong> {guests} Guests</p>
                  <p><strong>Confirmation Code:</strong> #SAVOR-3D-{Math.floor(1000 + Math.random() * 9000)}</p>
                </div>
                <button
                  onClick={handleClose}
                  className="mt-4 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-extrabold text-sm shadow-lg shadow-orange-500/30"
                >
                  Return to Restaurant
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 rounded-2xl bg-orange-500/20 text-orange-400 border border-orange-500/30">
                    <Armchair className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold font-display text-white">3D Restaurant Floor Map & Seat Selector</h3>
                    <p className="text-xs text-slate-400">Click any available 3D table on the floor layout to pick your location</p>
                  </div>
                </div>

                {/* Two Column Layout: 3D Map + Booking Form */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* Left 3D Interactive Floor Map Column */}
                  <div className="lg:col-span-7 space-y-3">
                    <RestaurantFloorMap
                      selectedTable={selectedTable}
                      onSelectTable={handleSelectTableFromMap}
                    />

                    {/* Selected Table Quick Info Card */}
                    <div className="p-3.5 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-orange-400" />
                        <div>
                          <span className="font-bold text-white block">{selectedTable.name}</span>
                          <span className="text-[11px] text-slate-400">{selectedTable.zone} • {selectedTable.capacity} Person Seating</span>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-orange-500 text-slate-950 font-extrabold text-[10px]">
                        ✓ Selected
                      </span>
                    </div>
                  </div>

                  {/* Right Booking Specs Form Column */}
                  <form onSubmit={handleSubmit} className="lg:col-span-5 space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Guest Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Alex Morgan"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500/50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="alex@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500/50"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Date</label>
                        <input
                          type="date"
                          required
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500/50"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Time</label>
                        <select
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                          className="w-full bg-[#161622] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500/50"
                        >
                          <option value="18:00">6:00 PM</option>
                          <option value="19:30">7:30 PM (Prime)</option>
                          <option value="21:00">9:00 PM</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Party Size (Guests)</label>
                      <div className="flex items-center space-x-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2">
                        <Users className="w-4 h-4 text-slate-400" />
                        <input
                          type="number"
                          min="1"
                          max="12"
                          value={guests}
                          onChange={(e) => setGuests(Number(e.target.value))}
                          className="w-full bg-transparent text-xs text-white focus:outline-none"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 text-slate-950 font-extrabold text-sm shadow-lg shadow-orange-500/25 transition-all transform active:scale-95 flex items-center justify-center space-x-2 mt-2"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Confirm 3D Table Reservation</span>
                    </button>
                  </form>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

