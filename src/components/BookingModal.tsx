import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Calendar,
  Clock,
  Users,
  Utensils,
  ShoppingBag,
  Sparkles,
  CheckCircle2,
  Phone,
  MessageCircle,
  Plus,
  Minus,
  Trash2,
  MapPin,
  Coffee,
  Leaf,
  ChevronRight,
  Info
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { BUSINESS_INFO, MENU_ITEMS } from '../data/cafeData';
import { BookingRequest, BookingConfirmation } from '../types';

export const BookingModal: React.FC = () => {
  const {
    isBookingModalOpen,
    closeBookingModal,
    activeBookingTab,
    setActiveBookingTab,
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    lastConfirmation,
    setLastConfirmation,
  } = useBooking();

  // Booking Form State
  const [bookingType, setBookingType] = useState<'dine-in-table' | 'garden-afternoon-tea' | 'takeout-pickup'>('garden-afternoon-tea');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState(() => {
    const d = new Date();
    // Default to tomorrow or today
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [time, setTime] = useState('14:00');
  const [partySize, setPartySize] = useState(2);
  const [seatingPreference, setSeatingPreference] = useState<'garden-fairytale' | 'indoor-botanical-ac' | 'any'>('garden-fairytale');
  const [specialRequests, setSpecialRequests] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmationData, setConfirmationData] = useState<BookingConfirmation | null>(null);

  // Pricing calculation
  const getExperienceBasePrice = () => {
    if (bookingType === 'garden-afternoon-tea') {
      // ฿680 per set for 2 people
      const setsNeeded = Math.ceil(partySize / 2);
      return setsNeeded * 680;
    }
    return 0; // standard table reservation has no upfront deposit or free seating
  };

  const experiencePrice = getExperienceBasePrice();
  const subtotal = activeBookingTab === 'book-table' ? experiencePrice + cartTotal : cartTotal;
  const vat = Math.round(subtotal * 0.07);
  const grandTotal = subtotal; // VAT is inclusive in Thai cafe menus

  const timeSlots = [
    '09:30 AM', '10:30 AM', '11:30 AM', '12:30 PM',
    '01:30 PM', '02:30 PM', '03:30 PM', '04:30 PM', '05:00 PM'
  ];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const refCode = `FLN-${Math.floor(100000 + Math.random() * 900000)}`;
      const request: BookingRequest = {
        type: bookingType,
        customerName,
        phone,
        email,
        date,
        time,
        partySize,
        seatingPreference,
        specialRequests,
        preOrderItems: [...cart],
        totalAmount: grandTotal,
      };

      const confirmation: BookingConfirmation = {
        referenceId: refCode,
        booking: request,
        timestamp: new Date().toLocaleString('en-US', { timeZone: 'Asia/Bangkok' }),
      };

      setConfirmationData(confirmation);
      setLastConfirmation(confirmation);
      setIsSubmitting(false);
    }, 600);
  };

  const handleNewBooking = () => {
    setConfirmationData(null);
    clearCart();
    setCustomerName('');
    setPhone('');
    setEmail('');
    setSpecialRequests('');
  };

  if (!isBookingModalOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-4 md:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeBookingModal}
          className="fixed inset-0 bg-[#121B15]/70 backdrop-blur-sm transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-[#FAF7F2] text-[#232B25] rounded-3xl shadow-2xl border border-[#E6DEC9] w-full max-w-3xl overflow-hidden z-10 max-h-[92vh] flex flex-col"
        >
          {/* Header */}
          <div className="bg-[#2D4739] text-[#FAF7F2] px-4 py-3.5 sm:px-6 sm:py-5 flex items-center justify-between border-b border-[#3B5B49] shrink-0">
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#FAF7F2]/10 border border-[#FAF7F2]/20 flex items-center justify-center text-[#C79D60] shrink-0">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="truncate">
                <h3 className="font-serif text-base sm:text-2xl font-bold tracking-tight text-[#FAF7F2] truncate">
                  Flâneur Tea • Booking & Cart
                </h3>
                <p className="text-[10px] sm:text-xs text-[#D1DDD5] flex items-center gap-1.5 truncate">
                  <span>Garden Oasis</span>
                  <span>•</span>
                  <span>Avg ฿200–400 / person</span>
                </p>
              </div>
            </div>
            <button
              onClick={closeBookingModal}
              className="p-1.5 sm:p-2 rounded-full text-[#D1DDD5] hover:text-white hover:bg-white/10 transition-colors shrink-0"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs (if not confirmed yet) */}
          {!confirmationData && (
            <div className="bg-[#F0EAE1] px-3 sm:px-6 py-2 border-b border-[#E3D8C6] flex items-center gap-1.5 sm:gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setActiveBookingTab('book-table')}
                className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-bold transition-all ${
                  activeBookingTab === 'book-table'
                    ? 'bg-[#2D4739] text-[#FAF7F2] shadow-xs'
                    : 'bg-white/70 text-[#4C5B50] hover:bg-white border border-[#DDD3C2]'
                }`}
              >
                <Calendar className="w-3.5 h-3.5 shrink-0" />
                <span>Reserve Table</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveBookingTab('pre-order')}
                className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-bold transition-all relative ${
                  activeBookingTab === 'pre-order'
                    ? 'bg-[#2D4739] text-[#FAF7F2] shadow-xs'
                    : 'bg-white/70 text-[#4C5B50] hover:bg-white border border-[#DDD3C2]'
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
                <span>Pre-Order Cart</span>
                {cart.length > 0 && (
                  <span className="bg-[#C79D60] text-[#1C261F] text-[10px] font-extrabold px-1.5 py-0.2 rounded-full">
                    {cart.reduce((a, b) => a + b.quantity, 0)}
                  </span>
                )}
              </button>
            </div>
          )}

          {/* Content Scrollable Body */}
          <div className="p-6 overflow-y-auto flex-grow">
            {confirmationData ? (
              /* Confirmation Screen */
              <div className="text-center py-6 max-w-lg mx-auto">
                <div className="w-16 h-16 bg-[#EBF5EE] text-[#2D4739] border border-[#C6E4CD] rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                </div>
                <div className="inline-block px-3 py-1 bg-[#EAE2D3] rounded-full text-xs font-mono font-bold text-[#2D4739] tracking-wider mb-2">
                  BOOKING REFERENCE: {confirmationData.referenceId}
                </div>
                <h4 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C261F] mb-2">
                  Your Reservation is Confirmed!
                </h4>
                <p className="text-sm text-[#5D6B60] mb-6">
                  Thank you, <strong className="text-[#1C261F]">{confirmationData.booking.customerName}</strong>. We have reserved your table in our garden sanctuary. A confirmation has been logged with Flâneur Tea staff.
                </p>

                {/* Booking Summary Card */}
                <div className="bg-white rounded-2xl p-5 border border-[#E3D9C9] text-left mb-6 shadow-xs space-y-3">
                  <div className="flex justify-between items-center pb-3 border-b border-[#EFE8DC]">
                    <span className="text-xs text-[#7A8A7E] uppercase font-semibold">Experience</span>
                    <span className="text-xs font-bold text-[#2D4739]">
                      {confirmationData.booking.type === 'garden-afternoon-tea'
                        ? '🌿 Garden Afternoon High Tea'
                        : confirmationData.booking.type === 'dine-in-table'
                        ? '🍵 Dine-In Table Reservation'
                        : '🛍️ Takeout Pickup Order'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-[#7A8A7E] block">Date & Time</span>
                      <strong className="text-[#232B25] text-sm">
                        {confirmationData.booking.date} at {confirmationData.booking.time}
                      </strong>
                    </div>
                    <div>
                      <span className="text-[#7A8A7E] block">Guests & Seating</span>
                      <strong className="text-[#232B25] text-sm">
                        {confirmationData.booking.partySize} Guests • {confirmationData.booking.seatingPreference === 'garden-fairytale' ? 'Garden' : 'Indoor AC'}
                      </strong>
                    </div>
                  </div>

                  {confirmationData.booking.preOrderItems.length > 0 && (
                    <div className="pt-2 border-t border-[#EFE8DC]">
                      <span className="text-xs text-[#7A8A7E] block mb-1">Pre-ordered Items:</span>
                      <div className="space-y-1 max-h-32 overflow-y-auto pr-1">
                        {confirmationData.booking.preOrderItems.map((item, idx) => (
                          <div key={idx} className="flex justify-between text-xs text-[#3D4940]">
                            <span>{item.quantity}x {item.menuItem.name}</span>
                            <span className="font-semibold">฿{item.menuItem.price * item.quantity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-3 border-t border-[#EFE8DC] flex justify-between items-center">
                    <span className="font-bold text-sm text-[#1C261F]">Total Estimated:</span>
                    <span className="font-bold text-lg text-[#2D4739]">฿{confirmationData.booking.totalAmount} THB</span>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href={`https://wa.me/66922456165?text=Hello%20Flâneur%20Tea%2C%20I%20have%20booked%20reference%20${confirmationData.referenceId}%20for%20${confirmationData.booking.customerName}%20on%20${confirmationData.booking.date}%20at%20${confirmationData.booking.time}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#25D366] text-white text-xs font-bold hover:bg-[#1EBE5B] transition-colors shadow-xs"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Staff Support</span>
                  </a>

                  <a
                    href={`tel:${BUSINESS_INFO.phone}`}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#2D4739] text-white text-xs font-bold hover:bg-[#23372C] transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Direct Call Cafe ({BUSINESS_INFO.phoneDisplay})</span>
                  </a>
                </div>

                <div className="mt-6">
                  <button
                    onClick={handleNewBooking}
                    className="text-xs text-[#6A7B6E] hover:text-[#2D4739] underline font-medium"
                  >
                    Make another booking or modify
                  </button>
                </div>
              </div>
            ) : activeBookingTab === 'book-table' ? (
              /* Tab 1: Book Table / High Tea */
              <form onSubmit={handleBookingSubmit} className="space-y-6">
                
                {/* Experience Selector */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4A594E] mb-2">
                    1. Select Experience & Pricing
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setBookingType('garden-afternoon-tea')}
                      className={`p-3.5 rounded-2xl border text-left transition-all relative ${
                        bookingType === 'garden-afternoon-tea'
                          ? 'border-[#2D4739] bg-[#EBF3ED] ring-1 ring-[#2D4739]'
                          : 'border-[#E3D8C6] bg-white hover:bg-[#FAF7F2]'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-xs font-bold text-[#1C261F]">High Tea for Two</span>
                        <span className="text-xs font-bold text-[#2D4739] bg-[#E1EDD9] px-2 py-0.5 rounded-md">฿680</span>
                      </div>
                      <p className="text-[11px] text-[#556358] leading-tight">
                        Tiered pastries, 2 craft tea pots & mochi waffle.
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setBookingType('dine-in-table')}
                      className={`p-3.5 rounded-2xl border text-left transition-all relative ${
                        bookingType === 'dine-in-table'
                          ? 'border-[#2D4739] bg-[#EBF3ED] ring-1 ring-[#2D4739]'
                          : 'border-[#E3D8C6] bg-white hover:bg-[#FAF7F2]'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-xs font-bold text-[#1C261F]">Table Reservation</span>
                        <span className="text-xs font-bold text-[#6A786E] bg-[#EFE9DE] px-2 py-0.5 rounded-md">No Fee</span>
                      </div>
                      <p className="text-[11px] text-[#556358] leading-tight">
                        Standard cafe seating for coffee, matcha & brunch.
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setBookingType('takeout-pickup')}
                      className={`p-3.5 rounded-2xl border text-left transition-all relative ${
                        bookingType === 'takeout-pickup'
                          ? 'border-[#2D4739] bg-[#EBF3ED] ring-1 ring-[#2D4739]'
                          : 'border-[#E3D8C6] bg-white hover:bg-[#FAF7F2]'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-xs font-bold text-[#1C261F]">Takeout Pickup</span>
                        <span className="text-xs font-bold text-[#6A786E] bg-[#EFE9DE] px-2 py-0.5 rounded-md">A La Carte</span>
                      </div>
                      <p className="text-[11px] text-[#556358] leading-tight">
                        Pre-order drinks & whole celebration cake slices.
                      </p>
                    </button>
                  </div>
                </div>

                {/* Date & Time & Guests */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#4A594E] mb-1.5 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#C79D60]" />
                      <span>Date (Tue–Sun)</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8CEBC] bg-white text-xs font-medium text-[#232B25] focus:ring-2 focus:ring-[#2D4739] outline-none"
                    />
                    <span className="text-[10px] text-[#869588] mt-1 block">Closed on Mondays</span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#4A594E] mb-1.5 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#C79D60]" />
                      <span>Time Slot</span>
                    </label>
                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8CEBC] bg-white text-xs font-medium text-[#232B25] focus:ring-2 focus:ring-[#2D4739] outline-none"
                    >
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>{slot}</option>
                      ))}
                    </select>
                    <span className="text-[10px] text-[#869588] mt-1 block">Open 9:00 AM – 6:00 PM</span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#4A594E] mb-1.5 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#C79D60]" />
                      <span>Guests</span>
                    </label>
                    <div className="flex items-center border border-[#D8CEBC] bg-white rounded-xl overflow-hidden h-[38px]">
                      <button
                        type="button"
                        onClick={() => setPartySize(Math.max(1, partySize - 1))}
                        className="px-3 py-2 text-[#4A574E] hover:bg-[#F2ECE1]"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="flex-1 text-center font-bold text-xs">{partySize} {partySize === 1 ? 'Guest' : 'Guests'}</span>
                      <button
                        type="button"
                        onClick={() => setPartySize(Math.min(12, partySize + 1))}
                        className="px-3 py-2 text-[#4A574E] hover:bg-[#F2ECE1]"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Seating Preference */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4A594E] mb-2">
                    2. Seating Atmosphere
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setSeatingPreference('garden-fairytale')}
                      className={`py-2 px-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                        seatingPreference === 'garden-fairytale'
                          ? 'bg-[#2D4739] text-white border-[#2D4739]'
                          : 'bg-white text-[#4A594E] border-[#D8CEBC] hover:bg-[#FAF7F2]'
                      }`}
                    >
                      🌿 Fairy-tale Garden
                    </button>
                    <button
                      type="button"
                      onClick={() => setSeatingPreference('indoor-botanical-ac')}
                      className={`py-2 px-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                        seatingPreference === 'indoor-botanical-ac'
                          ? 'bg-[#2D4739] text-white border-[#2D4739]'
                          : 'bg-white text-[#4A594E] border-[#D8CEBC] hover:bg-[#FAF7F2]'
                      }`}
                    >
                      ❄️ Glasshouse AC
                    </button>
                    <button
                      type="button"
                      onClick={() => setSeatingPreference('any')}
                      className={`py-2 px-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                        seatingPreference === 'any'
                          ? 'bg-[#2D4739] text-white border-[#2D4739]'
                          : 'bg-white text-[#4A594E] border-[#D8CEBC] hover:bg-[#FAF7F2]'
                      }`}
                    >
                      ✨ First Available
                    </button>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="bg-[#F4EEE4] p-4 rounded-2xl border border-[#E3D9C9] space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#2D4739] block">
                    3. Contact Details
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-semibold text-[#5A695E] block mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Siriporn or Alex"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-white border border-[#D5CABB] text-xs focus:ring-1 focus:ring-[#2D4739] outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-[#5A695E] block mb-1">Phone Number (Thai or Intl) *</label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 092-245-6165"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-white border border-[#D5CABB] text-xs focus:ring-1 focus:ring-[#2D4739] outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-[#5A695E] block mb-1">Special Occasion or Dietary Notes (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. Birthday celebration, vegan options, quiet corner"
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-[#D5CABB] text-xs focus:ring-1 focus:ring-[#2D4739] outline-none"
                    />
                  </div>
                </div>

                {/* Summary & Submit */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#E3D8C6]">
                  <div>
                    <span className="text-xs text-[#7A8A7E] block">Estimated Total</span>
                    <span className="text-xl font-bold font-serif text-[#2D4739]">
                      ฿{grandTotal} THB
                    </span>
                    {bookingType === 'garden-afternoon-tea' && (
                      <span className="text-[10px] text-[#6A7B6E] block">
                        Includes tiered high tea set for {partySize} guests
                      </span>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !customerName || !phone}
                    className="w-full sm:w-auto px-8 py-3 rounded-full bg-[#2D4739] text-[#FAF7F2] text-xs font-bold tracking-wider uppercase hover:bg-[#22362B] transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span>Reserving Table...</span>
                    ) : (
                      <>
                        <span>Confirm Direct Reservation</span>
                        <ChevronRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              /* Tab 2: Pre-Order Menu & Cart */
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-serif text-lg font-bold text-[#1C261F]">Craft Cart & Pre-Order</h4>
                    <p className="text-xs text-[#6A786E]">Add items directly to enjoy upon arrival or pickup</p>
                  </div>
                  {cart.length > 0 && (
                    <button
                      onClick={clearCart}
                      className="text-xs text-rose-700 hover:text-rose-900 font-semibold flex items-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Clear cart</span>
                    </button>
                  )}
                </div>

                {/* Cart Items List */}
                {cart.length === 0 ? (
                  <div className="text-center py-8 bg-[#F4EFE6] rounded-2xl border border-dashed border-[#D6CBB9]">
                    <Coffee className="w-8 h-8 text-[#8C9C8F] mx-auto mb-2" />
                    <p className="text-xs font-semibold text-[#4A574D]">Your pre-order cart is currently empty</p>
                    <p className="text-[11px] text-[#7A8A7E] mt-1">Select items below to add to your order</p>
                  </div>
                ) : (
                  <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                    {cart.map((c) => (
                      <div
                        key={c.menuItem.id}
                        className="bg-white p-3 rounded-xl border border-[#E3D9C9] flex items-center justify-between gap-3 shadow-2xs"
                      >
                        <div className="flex-1 min-w-0">
                          <h5 className="text-xs font-bold text-[#1C261F] truncate">{c.menuItem.name}</h5>
                          <span className="text-[11px] text-[#2D4739] font-semibold">฿{c.menuItem.price} each</span>
                        </div>

                        {/* Quantity controls */}
                        <div className="flex items-center gap-2">
                          <div className="flex items-center border border-[#D5CABB] rounded-lg bg-[#FAF7F2]">
                            <button
                              onClick={() => updateQuantity(c.menuItem.id, -1)}
                              className="p-1 hover:bg-[#EAE2D2] text-[#4A574E]"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2.5 text-xs font-bold text-[#232B25]">{c.quantity}</span>
                            <button
                              onClick={() => updateQuantity(c.menuItem.id, 1)}
                              className="p-1 hover:bg-[#EAE2D2] text-[#4A574E]"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <span className="text-xs font-bold text-[#1C261F] min-w-[50px] text-right">
                            ฿{c.menuItem.price * c.quantity}
                          </span>
                          <button
                            onClick={() => removeFromCart(c.menuItem.id)}
                            className="text-[#9CA99E] hover:text-rose-600 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Popular Add-on Highlights */}
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#4A594E] block mb-2">
                    Quick Add Recommendations
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {MENU_ITEMS.slice(0, 4).map((item) => (
                      <div
                        key={item.id}
                        className="p-2.5 rounded-xl bg-white border border-[#E3D9C9] flex items-center justify-between gap-2"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-semibold text-[#1C261F] truncate">{item.name}</p>
                          <span className="text-[11px] font-bold text-[#2D4739]">฿{item.price}</span>
                        </div>
                        <button
                          onClick={() => addToCart(item, 1)}
                          className="px-2.5 py-1 rounded-lg bg-[#EBF3ED] text-[#2D4739] text-xs font-bold hover:bg-[#2D4739] hover:text-white transition-colors"
                        >
                          + Add
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cart Subtotal & Proceed */}
                <div className="pt-3 border-t border-[#E3D8C6] flex items-center justify-between">
                  <div>
                    <span className="text-xs text-[#7A8A7E] block">Items Total ({cart.reduce((a, b) => a + b.quantity, 0)} items)</span>
                    <span className="text-xl font-bold font-serif text-[#2D4739]">฿{cartTotal} THB</span>
                  </div>
                  <button
                    onClick={() => setActiveBookingTab('book-table')}
                    className="px-6 py-2.5 rounded-full bg-[#2D4739] text-[#FAF7F2] text-xs font-bold hover:bg-[#23372B] transition-colors flex items-center gap-2"
                  >
                    <span>Attach to Table Reservation</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer note */}
          <div className="bg-[#EFE8DC] px-4 sm:px-6 py-2.5 sm:py-3 border-t border-[#E3D8C6] text-[10px] sm:text-[11px] text-[#6A786E] flex flex-col sm:flex-row items-center justify-between gap-1.5 shrink-0">
            <div className="flex items-center gap-1.5 text-center sm:text-left">
              <Info className="w-3.5 h-3.5 text-[#C79D60] shrink-0" />
              <span>Bangkok garden cafe • No upfront deposit needed</span>
            </div>
            <a href={`tel:${BUSINESS_INFO.phone}`} className="font-bold text-[#2D4739] hover:underline shrink-0">
              Tel: {BUSINESS_INFO.phoneDisplay}
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
