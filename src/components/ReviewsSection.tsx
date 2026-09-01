import React from 'react';
import { motion } from 'motion/react';
import { Star, MessageSquareQuote, CheckCircle, ExternalLink, Calendar, Sparkles } from 'lucide-react';
import { REVIEWS, BUSINESS_INFO } from '../data/cafeData';
import { useBooking } from '../context/BookingContext';

export const ReviewsSection: React.FC = () => {
  const { openBookingModal } = useBooking();

  const mapTopics = [
    { name: 'Fairytale Garden', count: 94 },
    { name: 'Calm Atmosphere', count: 90 },
    { name: 'Earl Grey Cake', count: 28 },
    { name: 'Coconut Coffee', count: 'Top Pick' },
    { name: 'Mochi Waffles', count: 'Loved' },
    { name: 'Vegan Options', count: 'Fresh' },
  ];

  // Duplicate for smooth continuous marquee
  const marqueeReviews = [...REVIEWS, ...REVIEWS];

  return (
    <section id="reviews" className="py-14 sm:py-20 lg:py-28 bg-[#F4EFE6] text-[#232B25] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Motion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-8 sm:mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#E4DAC8] text-[#2D4739] text-[11px] sm:text-xs font-semibold uppercase tracking-widest mb-3">
            <MessageSquareQuote className="w-3.5 h-3.5" />
            <span>Google Maps Verified Reviews</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-semibold text-[#1C261F] tracking-tight mb-2 sm:mb-3">
            Loved by Travelers, Locals & Guides
          </h2>
          <p className="text-xs sm:text-base text-[#556358] max-w-xl mx-auto">
            Rated <span className="font-bold text-[#2D4739]">4.6 / 5.0</span> across <span className="font-bold text-[#2D4739]">401+ Google reviews</span> on Pan Road, Bangkok.
          </p>
        </motion.div>

        {/* Rating Overview Card - Highly Compact & Optimized for Mobile */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-[#E6DDD0] shadow-xs mb-8 sm:mb-12 flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-8"
        >
          
          {/* Big Score Box */}
          <div className="flex items-center gap-4 sm:gap-6 w-full md:w-auto justify-between sm:justify-start">
            <div className="text-left">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#2D4739]">4.6</span>
                <span className="text-xs text-[#7A8A7E] font-medium">/ 5.0</span>
              </div>
              <div className="flex items-center text-amber-400 mt-0.5 gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
                ))}
              </div>
              <p className="text-[11px] sm:text-xs text-[#7A8A7E] mt-0.5 font-medium">401+ Verified Google Reviews</p>
            </div>

            <div className="hidden sm:block h-14 w-px bg-[#E8E1D5]" />

            <div className="hidden sm:flex flex-col gap-1 text-xs text-[#556358]">
              <div className="flex items-center gap-2">
                <span className="w-3">5★</span>
                <div className="w-28 sm:w-40 h-2 bg-[#EBE4D8] rounded-full overflow-hidden">
                  <div className="w-[82%] h-full bg-[#2D4739] rounded-full" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3">4★</span>
                <div className="w-28 sm:w-40 h-2 bg-[#EBE4D8] rounded-full overflow-hidden">
                  <div className="w-[12%] h-full bg-[#2D4739]/70 rounded-full" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3">3★</span>
                <div className="w-28 sm:w-40 h-2 bg-[#EBE4D8] rounded-full overflow-hidden">
                  <div className="w-[4%] h-full bg-[#2D4739]/40 rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Popular Tag Mentions */}
          <div className="flex-1 w-full max-w-lg">
            <p className="text-[10px] sm:text-xs font-semibold text-[#7A8A7E] uppercase tracking-wider mb-2">
              Guest Highlights:
            </p>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {mapTopics.map((topic) => (
                <span
                  key={topic.name}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FAF7F2] border border-[#E0D7C8] text-[11px] sm:text-xs text-[#3E4C41] font-medium"
                >
                  <span>{topic.name}</span>
                  <span className="text-[9px] sm:text-[10px] text-[#8C9C90] font-bold">({topic.count})</span>
                </span>
              ))}
            </div>
          </div>

          {/* External Google Review CTA */}
          <a
            href={BUSINESS_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-full bg-[#2D4739] text-[#FAF7F2] text-xs font-semibold hover:bg-[#203328] transition-colors shadow-xs"
          >
            <span>Read 401+ Reviews</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#C79D60]" />
          </a>
        </motion.div>

        {/* ========================================================================= */}
        {/* MOBILE CONTINUOUS MARQUEE (Zero Scrollbar, Auto-Scrolling Loop) */}
        {/* ========================================================================= */}
        <div className="md:hidden relative w-full overflow-hidden py-2 mb-8">
          {/* Gradient Edge Masks for soft fade */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#F4EFE6] to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#F4EFE6] to-transparent z-10" />

          <div className="animate-marquee-track flex gap-4 no-scrollbar">
            {marqueeReviews.map((rev, idx) => (
              <div
                key={`${rev.id}-marquee-${idx}`}
                className="w-[280px] shrink-0 bg-white rounded-2xl p-4 border border-[#E6DCD0] shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#2D4739]/10 text-[#2D4739] font-serif font-bold text-xs flex items-center justify-center shrink-0">
                        {rev.avatarText}
                      </div>
                      <div className="truncate">
                        <h4 className="font-serif font-bold text-xs text-[#1C261F] truncate">{rev.author}</h4>
                        <p className="text-[10px] text-[#7A8A7E] truncate">{rev.badge.split('•')[0]}</p>
                      </div>
                    </div>
                    <div className="flex text-amber-400 shrink-0">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-[#46544A] leading-relaxed italic line-clamp-4 mb-3">
                    "{rev.content}"
                  </p>
                </div>

                <div className="pt-2 border-t border-[#F0EBE1] flex items-center justify-between text-[10px] text-[#8A9B8E]">
                  <span className="flex items-center gap-1 text-[#2D4739] font-medium">
                    <CheckCircle className="w-2.5 h-2.5 text-emerald-600" />
                    <span>Verified</span>
                  </span>
                  <span>{rev.dateAgo}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-3">
            <span className="text-[11px] text-[#8C9C90] italic">
              ← Continuous guest feedback (pause on touch) →
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* DESKTOP & TABLET GRID VIEW */}
        {/* ========================================================================= */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {REVIEWS.map((rev, idx) => (
            <motion.div
              key={rev.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="bg-white rounded-3xl p-6 border border-[#E6DCD0] shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                {/* Author Info & Badge */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#2D4739]/10 text-[#2D4739] font-serif font-bold text-sm flex items-center justify-center">
                      {rev.avatarText}
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-sm text-[#1C261F]">{rev.author}</h4>
                      <p className="text-[11px] text-[#7A8A7E]">{rev.badge}</p>
                    </div>
                  </div>
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-[#46544A] leading-relaxed italic mb-4">
                  "{rev.content}"
                </p>
              </div>

              {/* Card Footer */}
              <div className="pt-3 border-t border-[#F0EBE1] flex items-center justify-between text-[11px] text-[#8A9B8E]">
                <span className="flex items-center gap-1 text-[#2D4739] font-medium">
                  <CheckCircle className="w-3 h-3 text-emerald-600" />
                  <span>Google Maps Verified</span>
                </span>
                <span>{rev.dateAgo}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to book based on stellar reviews */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <button
            onClick={() => openBookingModal('book-table')}
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-[#2D4739] text-[#FAF7F2] text-xs font-bold uppercase tracking-wider hover:bg-[#20352A] transition-all shadow-md"
          >
            <Calendar className="w-4 h-4 text-[#C79D60]" />
            <span>Join Our Happy Guests • Reserve a Table</span>
          </button>
        </motion.div>

      </div>
    </section>
  );
};
