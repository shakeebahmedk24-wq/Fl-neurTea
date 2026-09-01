import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Calendar,
  Clock,
  Users,
  Sparkles,
  Check,
  CheckCircle2,
  Phone,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Info,
  Heart
} from 'lucide-react';
import { BUSINESS_INFO, MENU_ITEMS } from '../data/cafeData';
import { useBooking } from '../context/BookingContext';
import { BookingRequest, BookingConfirmation } from '../types';

export const BookingSection: React.FC = () => {
  const { openBookingModal } = useBooking();

  const [activeSlide, setActiveSlide] = useState(0);
  const [experienceType, setExperienceType] = useState<'high-tea' | 'table-reserve' | 'tasting' | 'private-salon'>('high-tea');
  const [partySize, setPartySize] = useState(2);
  const [selectedDate, setSelectedDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [selectedTime, setSelectedTime] = useState('02:00 PM');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [submittedConf, setSubmittedConf] = useState<BookingConfirmation | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const packages = [
    {
      id: 'high-tea',
      title: 'Garden High Tea for Two',
      price: 680,
      priceLabel: '฿680 / pair (฿340 per guest)',
      badge: 'Most Loved',
      description: 'Tiered hand-crafted floral cakes, 2 hot craft tea glass kettles with candle warmers, warm mochi waffles, and savory smoked salmon bites.',
      features: [
        '2 Artisanal craft tea kettles of choice',
        '2 Signature pastry slices (Yuzu / Earl Grey)',
        'Norwegian smoked salmon mochi waffle',
        'Guaranteed fairy-tale garden seating table',
      ],
      popular: true,
    },
    {
      id: 'table-reserve',
      title: 'Garden Table Dine-In',
      price: 0,
      priceLabel: 'Pay on arrival (฿200–400 avg)',
      badge: 'A La Carte',
      description: 'Reserve priority garden or indoor botanical AC seating. Browse our artisanal teas, coconut coffees, and brunch menu on arrival.',
      features: [
        'Zero upfront reservation deposit',
        'Choice of outdoor garden or indoor AC seating',
        'Full access to all 20+ craft beverage items',
        'Table held for 15 minutes past booking time',
      ],
      popular: false,
    },
    {
      id: 'tasting',
      title: 'Artisanal Tea Flight & Dessert',
      price: 440,
      priceLabel: '฿440 / experience',
      badge: 'Craft Special',
      description: 'Curated single-estate hot tea ceremony paired with freshly baked seasonal yuzu cheesecake or Earl Grey chocolate mousse cake.',
      features: [
        '1 Single-estate whole-leaf tea kettle',
        '1 Artisanal pastry slice of your choice',
        'Detailed tea aroma & tasting notes guide',
        'Peaceful garden setting overlooking lush ferns',
      ],
      popular: false,
    },
    {
      id: 'private-salon',
      title: 'Private Garden Corner Celebration',
      price: 1200,
      priceLabel: '฿1,200 / 4 guests',
      badge: 'Special Events',
      description: 'Exclusive reserved glasshouse alcove or garden gazebo corner with custom flower settings, tea pairings, and dessert assortment.',
      features: [
        'Dedicated botanical gazebo or glasshouse corner',
        '4 Signature teas / iced mocktails of choice',
        'Selection of 4 specialty bakery items',
        'Personalized welcome card & flower centerpiece',
      ],
      popular: false,
    },
  ];

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? packages.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev === packages.length - 1 ? 0 : prev + 1));
  };

  const handleInlineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const refId = `FLN-${Math.floor(100000 + Math.random() * 900000)}`;
      const req: BookingRequest = {
        type: experienceType === 'high-tea' ? 'garden-afternoon-tea' : 'dine-in-table',
        customerName,
        phone,
        email: '',
        date: selectedDate,
        time: selectedTime,
        partySize,
        seatingPreference: 'garden-fairytale',
        specialRequests: '',
        preOrderItems: [],
        totalAmount: experienceType === 'high-tea' ? 680 * Math.ceil(partySize / 2) : 0,
      };

      const conf: BookingConfirmation = {
        referenceId: refId,
        booking: req,
        timestamp: new Date().toLocaleString('en-US', { timeZone: 'Asia/Bangkok' }),
      };

      setSubmittedConf(conf);
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <section id="booking" className="py-12 sm:py-20 lg:py-28 bg-[#F5EFEB] text-[#232B25] relative overflow-hidden">
      {/* Decorative botanical backdrop accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#2D4739]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#C79D60]/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-8 sm:mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#E2D6C3] text-[#2D4739] text-[11px] sm:text-xs font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C79D60]" />
            <span>Direct Reservations & Transparent Pricing</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-semibold text-[#1C261F] tracking-tight mb-2 sm:mb-3">
            Reserve Your Garden Table or Afternoon Tea
          </h2>
          <p className="text-xs sm:text-base text-[#556358] max-w-2xl mx-auto">
            Book directly through our website with zero booking fees. Slide through our curated garden packages or reserve à la carte.
          </p>
        </motion.div>

        {/* ========================================================================= */}
        {/* INTERACTIVE PRICING PACKAGES SLIDER */}
        {/* ========================================================================= */}
        <div className="relative mb-10 sm:mb-14">
          
          {/* Slider Navigation Bar Controls */}
          <div className="flex items-center justify-between gap-2 mb-4 px-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#2D4739] uppercase tracking-wider">
                Experience Packages ({activeSlide + 1}/{packages.length})
              </span>
              <span className="hidden sm:inline text-[11px] text-[#7E8E82]">• Swipe or use arrows</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrevSlide}
                aria-label="Previous package"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-[#DDD4C5] text-[#2D4739] flex items-center justify-center hover:bg-[#2D4739] hover:text-white transition-colors shadow-xs active:scale-95"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                type="button"
                onClick={handleNextSlide}
                aria-label="Next package"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-[#DDD4C5] text-[#2D4739] flex items-center justify-center hover:bg-[#2D4739] hover:text-white transition-colors shadow-xs active:scale-95"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          {/* Active Slider Card View */}
          <div className="overflow-hidden rounded-2xl sm:rounded-3xl">
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={packages[activeSlide].id}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  className={`rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 border transition-all ${
                    packages[activeSlide].popular
                      ? 'bg-[#2D4739] text-[#FAF7F2] border-[#3F6350] shadow-xl'
                      : 'bg-white text-[#232B25] border-[#E3D9C9] shadow-md'
                  }`}
                >
                  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                    
                    {/* Left: Package Info */}
                    <div className="flex-1 max-w-2xl">
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                            packages[activeSlide].popular
                              ? 'bg-[#C79D60] text-[#18261F]'
                              : 'bg-[#F0EAE1] text-[#2D4739]'
                          }`}
                        >
                          {packages[activeSlide].badge}
                        </span>
                        {packages[activeSlide].popular && (
                          <span className="text-[11px] text-[#C79D60] flex items-center gap-1 font-semibold">
                            <Sparkles className="w-3 h-3" />
                            <span>Staff Recommendation</span>
                          </span>
                        )}
                      </div>

                      <h3 className={`font-serif text-xl sm:text-3xl font-bold mb-2 ${
                        packages[activeSlide].popular ? 'text-white' : 'text-[#1C261F]'
                      }`}>
                        {packages[activeSlide].title}
                      </h3>

                      <p className={`text-xs sm:text-sm leading-relaxed mb-4 ${
                        packages[activeSlide].popular ? 'text-[#DDE6E0]' : 'text-[#56655A]'
                      }`}>
                        {packages[activeSlide].description}
                      </p>

                      {/* Feature Checklist */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                        {packages[activeSlide].features.map((feature, fIdx) => (
                          <div key={fIdx} className="flex items-start gap-2 text-xs sm:text-[13px]">
                            <Check className={`w-4 h-4 shrink-0 mt-0.5 ${
                              packages[activeSlide].popular ? 'text-[#C79D60]' : 'text-[#2D4739]'
                            }`} />
                            <span className={packages[activeSlide].popular ? 'text-[#FAF7F2]' : 'text-[#3E4C41]'}>
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right: Pricing Box & Action */}
                    <div className={`w-full lg:w-72 shrink-0 p-5 rounded-2xl border flex flex-col justify-between ${
                      packages[activeSlide].popular
                        ? 'bg-[#1F3328] border-[#3B5B49]'
                        : 'bg-[#FAF7F2] border-[#E5DCD0]'
                    }`}>
                      <div>
                        <span className={`text-[11px] uppercase tracking-wider font-semibold block mb-1 ${
                          packages[activeSlide].popular ? 'text-[#A8BDB0]' : 'text-[#7A8A7E]'
                        }`}>
                          Package Price
                        </span>
                        <div className="flex items-baseline gap-2 mb-1">
                          <span className={`text-2xl sm:text-3xl font-serif font-bold ${
                            packages[activeSlide].popular ? 'text-[#C79D60]' : 'text-[#2D4739]'
                          }`}>
                            {packages[activeSlide].price > 0 ? `฿${packages[activeSlide].price}` : '฿0 Deposit'}
                          </span>
                          {packages[activeSlide].price > 0 && (
                            <span className="text-xs text-[#8A9C8E]">THB</span>
                          )}
                        </div>
                        <p className={`text-xs mb-4 ${
                          packages[activeSlide].popular ? 'text-[#CAD8CF]' : 'text-[#6A786E]'
                        }`}>
                          {packages[activeSlide].priceLabel}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setExperienceType(packages[activeSlide].id as any);
                          openBookingModal('book-table');
                        }}
                        className={`w-full py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xs active:scale-95 ${
                          packages[activeSlide].popular
                            ? 'bg-[#C79D60] text-[#18261F] hover:bg-[#D8AF70]'
                            : 'bg-[#2D4739] text-white hover:bg-[#203429]'
                        }`}
                      >
                        <span>Select & Book Package</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Dots Indicator & Package Thumbnails */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {packages.map((pkg, idx) => (
              <button
                key={pkg.id}
                onClick={() => setActiveSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`transition-all rounded-full ${
                  activeSlide === idx
                    ? 'w-8 h-2.5 bg-[#2D4739]'
                    : 'w-2.5 h-2.5 bg-[#D6CCBD] hover:bg-[#A89D8C]'
                }`}
              />
            ))}
          </div>

        </div>

        {/* ========================================================================= */}
        {/* QUICK DIRECT TABLE RESERVATION (Optimized & Compact for Mobile) */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-7 lg:p-8 border border-[#E3D9C9] shadow-xs"
        >
          {submittedConf ? (
            <div className="text-center py-6 max-w-lg mx-auto">
              <div className="w-12 h-12 bg-[#EBF5EE] text-[#2D4739] border border-[#C6E4CD] rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-7 h-7 text-emerald-600" />
              </div>
              <span className="text-xs font-mono font-bold text-[#2D4739] bg-[#F0EAE1] px-3 py-1 rounded-full">
                REF: {submittedConf.referenceId}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1C261F] mt-2.5 mb-1.5">
                Table Reserved Successfully!
              </h3>
              <p className="text-xs sm:text-sm text-[#5D6B60] mb-5 leading-relaxed">
                Thank you, <strong>{submittedConf.booking.customerName}</strong>. We look forward to welcoming you on <strong>{submittedConf.booking.date}</strong> at <strong>{submittedConf.booking.time}</strong> for <strong>{submittedConf.booking.partySize} guests</strong>.
              </p>
              
              <div className="flex flex-wrap gap-2.5 justify-center">
                <a
                  href={`tel:${BUSINESS_INFO.phone}`}
                  className="px-4 py-2.5 rounded-full bg-[#2D4739] text-white text-xs font-bold flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call {BUSINESS_INFO.phoneDisplay}</span>
                </a>
                <button
                  onClick={() => setSubmittedConf(null)}
                  className="px-4 py-2.5 rounded-full border border-[#D5CABB] text-[#4A574E] text-xs font-bold hover:bg-[#FAF7F2]"
                >
                  Book Another Table
                </button>
              </div>
            </div>
          ) : (
            <div>
              {/* Card Header - Compact on mobile */}
              <div className="flex items-center justify-between gap-3 pb-3.5 border-b border-[#EFE8DC] mb-4">
                <div>
                  <h3 className="font-serif text-lg sm:text-2xl font-bold text-[#1C261F]">
                    Quick Direct Table Reservation
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[#6A786E]">
                    Instant Bangkok cafe table hold • No deposit required
                  </p>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-[#2D4739] bg-[#EBF3ED] px-3 py-1 rounded-full shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Instant Confirmation</span>
                </div>
              </div>

              {/* Compact Form */}
              <form onSubmit={handleInlineSubmit} className="space-y-3.5">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3.5">
                  <div>
                    <label className="text-[11px] font-bold text-[#4A594E] block mb-1 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#C79D60]" />
                      <span>Date</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full px-2.5 py-2 rounded-xl border border-[#D8CEBC] bg-[#FAF7F2] text-xs font-medium text-[#232B25] focus:bg-white focus:ring-1 focus:ring-[#2D4739] outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-[#4A594E] block mb-1 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#C79D60]" />
                      <span>Time</span>
                    </label>
                    <select
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="w-full px-2.5 py-2 rounded-xl border border-[#D8CEBC] bg-[#FAF7F2] text-xs font-medium text-[#232B25] focus:bg-white focus:ring-1 focus:ring-[#2D4739] outline-none"
                    >
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="11:30 AM">11:30 AM</option>
                      <option value="01:00 PM">01:00 PM</option>
                      <option value="02:00 PM">02:00 PM (Tea Time)</option>
                      <option value="03:30 PM">03:30 PM</option>
                      <option value="05:00 PM">05:00 PM</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-[#4A594E] block mb-1 flex items-center gap-1">
                      <Users className="w-3 h-3 text-[#C79D60]" />
                      <span>Party Size</span>
                    </label>
                    <select
                      value={partySize}
                      onChange={(e) => setPartySize(Number(e.target.value))}
                      className="w-full px-2.5 py-2 rounded-xl border border-[#D8CEBC] bg-[#FAF7F2] text-xs font-medium text-[#232B25] focus:bg-white focus:ring-1 focus:ring-[#2D4739] outline-none"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 10].map((n) => (
                        <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-[#4A594E] block mb-1 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#C79D60]" />
                      <span>Experience</span>
                    </label>
                    <select
                      value={experienceType}
                      onChange={(e) => setExperienceType(e.target.value as any)}
                      className="w-full px-2.5 py-2 rounded-xl border border-[#D8CEBC] bg-[#FAF7F2] text-xs font-medium text-[#232B25] focus:bg-white focus:ring-1 focus:ring-[#2D4739] outline-none truncate"
                    >
                      <option value="high-tea">Garden High Tea (฿680/pair)</option>
                      <option value="table-reserve">Table Dine-In (฿0 Fee)</option>
                      <option value="tasting">Tea Flight (฿440)</option>
                      <option value="private-salon">Private Celebration (฿1,200)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3.5 pt-1">
                  <div>
                    <label className="text-[11px] font-bold text-[#4A594E] block mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Nattaporn S."
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-[#D8CEBC] bg-[#FAF7F2] text-xs focus:bg-white focus:ring-1 focus:ring-[#2D4739] outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-[#4A594E] block mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +66 92 245 6165"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-[#D8CEBC] bg-[#FAF7F2] text-xs focus:bg-white focus:ring-1 focus:ring-[#2D4739] outline-none"
                    />
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-[11px] text-[#6A786E] text-center sm:text-left">
                    <span>Direct assistance: </span>
                    <a href={`tel:${BUSINESS_INFO.phone}`} className="font-bold text-[#2D4739] hover:underline">
                      {BUSINESS_INFO.phoneDisplay}
                    </a>
                  </div>

                  <div className="flex gap-2 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => openBookingModal('pre-order')}
                      className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-[#2D4739] text-[#2D4739] text-xs font-bold hover:bg-[#2D4739]/5 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Pre-Order</span>
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting || !customerName || !phone}
                      className="flex-1 sm:flex-none px-5 sm:px-6 py-2.5 rounded-xl bg-[#2D4739] text-[#FAF7F2] text-xs font-bold uppercase tracking-wider hover:bg-[#22362A] transition-colors shadow-xs disabled:opacity-50 flex items-center justify-center gap-1.5"
                    >
                      {isSubmitting ? 'Reserving...' : 'Instant Reserve'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
        </motion.div>

      </div>
    </section>
  );
};
