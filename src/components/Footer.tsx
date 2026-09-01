import React from 'react';
import { motion } from 'motion/react';
import { Phone, MapPin, Instagram, Facebook, ExternalLink, Heart, Sparkles, ArrowUp, Calendar, ShoppingBag } from 'lucide-react';
import { BUSINESS_INFO } from '../data/cafeData';
import { useBooking } from '../context/BookingContext';

export const Footer: React.FC = () => {
  const { openBookingModal } = useBooking();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact-footer" className="bg-[#141F18] text-[#E0EBE2] pt-16 pb-12 border-t border-[#233529] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-[#233529]"
        >
          
          {/* Col 1: Brand & Philosophy */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#FAF7F2] text-[#2D4739] flex items-center justify-center font-serif font-bold text-lg">
                F
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight text-white block">
                  Flâneur Tea
                </span>
                <span className="text-[11px] tracking-widest uppercase text-[#9CB3A3]">
                  Garden Tea House & Cafe Bangkok
                </span>
              </div>
            </div>

            <p className="text-sm text-[#A8BEB0] leading-relaxed max-w-md">
              A fairytale garden oasis on Pan Road, Sathorn. Dedicated to single-estate artisanal teas, floral celebration cakes, specialty cold brew coffees, and mindful brunch.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2D4739] text-xs text-[#E1EFE6] border border-[#40614E]">
                <Heart className="w-3.5 h-3.5 text-[#E8927C] fill-current" />
                <span>Women-Owned Independent</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs text-[#E1EFE6]">
                <span>Dine-in • Pre-Order Takeout</span>
              </div>
            </div>

            {/* Direct Booking Actions */}
            <div className="flex flex-wrap gap-2.5 pt-2">
              <button
                onClick={() => openBookingModal('book-table')}
                className="px-4 py-2 rounded-full bg-[#C79D60] text-[#18261F] text-xs font-bold hover:bg-[#DDAE68] transition-colors flex items-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Table / High Tea</span>
              </button>
              <button
                onClick={() => openBookingModal('pre-order')}
                className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Pre-Order Menu</span>
              </button>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-3 space-y-3 text-xs">
            <h4 className="font-serif text-base font-semibold text-white uppercase tracking-wider mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-[#B2C5B8]">
              <li>
                <a href="#story" className="hover:text-white transition-colors">Our Botanical Story</a>
              </li>
              <li>
                <a href="#menu" className="hover:text-white transition-colors">Artisanal Tea & Brunch Menu</a>
              </li>
              <li>
                <a href="#garden" className="hover:text-white transition-colors">Garden Lookbook & Atmosphere</a>
              </li>
              <li>
                <a href="#booking" className="hover:text-white transition-colors">Online Reservations & Pricing</a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white transition-colors">Google Maps Reviews (4.6★)</a>
              </li>
              <li>
                <a href="#visit" className="hover:text-white transition-colors">Operating Hours & BTS Guide</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Direct Actions */}
          <div className="lg:col-span-4 space-y-4 text-xs">
            <h4 className="font-serif text-base font-semibold text-white uppercase tracking-wider mb-4">
              Connect & Visit
            </h4>

            {/* Phone */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#2D4739] flex items-center justify-center text-[#C79D60] shrink-0 mt-0.5">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] text-[#869E8E] block">Telephone (Tap to call)</span>
                <a
                  href={`tel:${BUSINESS_INFO.phone}`}
                  className="text-sm font-semibold text-white hover:text-[#C79D60] transition-colors"
                >
                  {BUSINESS_INFO.phoneDisplay}
                </a>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#2D4739] flex items-center justify-center text-[#C79D60] shrink-0 mt-0.5">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] text-[#869E8E] block">Location (Pan Road, Silom)</span>
                <a
                  href={BUSINESS_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#D8E6DC] hover:text-white transition-colors block leading-relaxed"
                >
                  {BUSINESS_INFO.address}
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href={BUSINESS_INFO.linktreeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs transition-colors border border-white/15"
              >
                <span>Linktree</span>
                <ExternalLink className="w-3 h-3 text-[#9CB3A3]" />
              </a>

              <a
                href={BUSINESS_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs transition-colors border border-white/15"
              >
                <Instagram className="w-3.5 h-3.5 text-[#E0B778]" />
                <span>Instagram</span>
              </a>

              <a
                href={BUSINESS_INFO.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs transition-colors border border-white/15"
              >
                <Facebook className="w-3.5 h-3.5 text-[#86B9E8]" />
                <span>Facebook</span>
              </a>
            </div>
          </div>

        </motion.div>

        {/* Sub-Footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7A9182]">
          <p>
            © {new Date().getFullYear()} Flâneur Tea Cafe. All rights reserved. Pan Road, Silom, Bang Rak, Bangkok.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs text-[#A8BEB0] hover:text-white transition-colors px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
