import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Phone,
  MapPin,
  Menu as MenuIcon,
  X,
  Clock,
  Calendar,
  ShoppingBag,
  Sparkles,
  ChevronRight,
  ExternalLink,
  Info
} from 'lucide-react';
import { BUSINESS_INFO, SCHEDULE } from '../data/cafeData';
import { useBangkokTime } from '../hooks/useBangkokTime';
import { useBooking } from '../context/BookingContext';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const bangkokStatus = useBangkokTime();
  const { openBookingModal, cartCount } = useBooking();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile off-canvas is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Story', href: '#story' },
    { label: 'Craft Menu', href: '#menu' },
    { label: 'Book & Pricing', href: '#booking' },
    { label: 'Garden Sanctuary', href: '#garden' },
    { label: 'Reviews (4.6★)', href: '#reviews' },
    { label: 'Hours & BTS', href: '#visit' },
  ];

  return (
    <>
      <header
        id="main-navbar"
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
      >
        {/* Top Info & Announcement Bar */}
        <div
          id="top-announcement-bar"
          className="bg-[#18261F] text-[#FAF7F2] text-[11px] sm:text-xs py-1.5 px-4 sm:px-6 border-b border-[#2D4739]/60"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
            {/* Live Bangkok Status */}
            <div className="flex items-center gap-2 sm:gap-3 truncate">
              <div className="flex items-center gap-1.5 shrink-0">
                <span
                  className={`w-2 h-2 rounded-full ${
                    bangkokStatus.isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                  }`}
                />
                <span className="font-semibold text-white">{bangkokStatus.statusText}</span>
              </div>
            </div>

            {/* Direct Tap-To-Call & Quick Reserve */}
            <div className="flex items-center gap-3 shrink-0">
              <a
                id="topbar-call-link"
                href={`tel:${BUSINESS_INFO.phone}`}
                className="flex items-center gap-1.5 text-[#E6EFE9] hover:text-[#C79D60] transition-colors font-medium"
                title={`Call ${BUSINESS_INFO.phoneDisplay}`}
              >
                <Phone className="w-3 h-3 text-[#C79D60]" />
                <span className="font-semibold">{BUSINESS_INFO.phoneDisplay}</span>
              </a>

              <span className="text-[#3D5545] hidden sm:inline">|</span>

              <button
                onClick={() => openBookingModal('book-table')}
                className="hidden sm:inline-flex items-center gap-1 text-[#C79D60] hover:text-white font-semibold text-[11px] transition-colors"
              >
                <Sparkles className="w-3 h-3" />
                <span>Book Direct</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Sticky Navigation Bar */}
        <div
          className={`transition-all duration-300 ${
            isScrolled
              ? 'bg-[#FAF7F2]/95 backdrop-blur-md shadow-xs border-b border-[#E6E0D4] py-3'
              : 'bg-gradient-to-b from-[#18261F]/90 via-[#18261F]/60 to-transparent py-4 text-white'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            {/* Brand Identity */}
            <a
              id="brand-logo-link"
              href="#"
              className="flex items-center gap-3 group text-left"
            >
              <div
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-transform group-hover:scale-105 ${
                  isScrolled
                    ? 'bg-[#2D4739] text-[#FAF7F2]'
                    : 'bg-[#FAF7F2] text-[#2D4739] shadow-md'
                }`}
              >
                <span className="font-serif font-bold text-base sm:text-lg leading-none">F</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span
                    className={`font-serif text-xl sm:text-2xl font-bold tracking-tight ${
                      isScrolled ? 'text-[#232B25]' : 'text-white'
                    }`}
                  >
                    Flâneur Tea
                  </span>
                </div>
                <p
                  className={`text-[10px] tracking-widest uppercase font-medium -mt-1 ${
                    isScrolled ? 'text-[#6A786E]' : 'text-[#DCE5DE]'
                  }`}
                >
                  Garden Cafe • Bangkok
                </p>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav id="desktop-nav-links" className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={`text-xs font-semibold tracking-wide transition-colors relative py-1 hover:text-[#C79D60] ${
                    isScrolled ? 'text-[#3B473E]' : 'text-[#F3F6F4]'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Desktop Action Buttons */}
            <div className="hidden sm:flex items-center gap-2.5">
              {/* Order Cart button */}
              <button
                id="nav-cart-button"
                onClick={() => openBookingModal('pre-order')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold tracking-wide transition-all border ${
                  isScrolled
                    ? 'border-[#D5CABB] text-[#3B473E] hover:bg-[#EAE2D2]'
                    : 'border-white/30 text-white hover:bg-white/10'
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5 text-[#C79D60]" />
                <span>Pre-Order</span>
                {cartCount > 0 && (
                  <span className="bg-[#2D4739] text-[#FAF7F2] text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Book Table Primary Button */}
              <button
                id="nav-book-button"
                onClick={() => openBookingModal('book-table')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all ${
                  isScrolled
                    ? 'bg-[#2D4739] text-[#FAF7F2] hover:bg-[#20352A] shadow-xs'
                    : 'bg-[#C79D60] text-[#18261F] hover:bg-[#D4AC72] shadow-sm'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book a Table</span>
              </button>

              {/* Direct Maps */}
              <a
                id="nav-directions-button"
                href={BUSINESS_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-full transition-all border ${
                  isScrolled
                    ? 'border-[#D5CABB] text-[#2D4739] hover:bg-[#EAE2D2]'
                    : 'border-white/30 text-white hover:bg-white/10'
                }`}
                title="Open Google Maps Directions"
              >
                <MapPin className="w-3.5 h-3.5 text-[#C79D60]" />
              </a>
            </div>

            {/* Mobile Actions & Hamburger Toggle */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={() => openBookingModal('book-table')}
                className="px-3 py-1.5 rounded-full bg-[#C79D60] text-[#18261F] text-xs font-bold sm:hidden"
              >
                Book
              </button>

              <button
                id="mobile-menu-toggle"
                onClick={() => setMobileMenuOpen(true)}
                className={`p-2 rounded-xl transition-colors ${
                  isScrolled ? 'text-[#232B25] hover:bg-[#EAE4D9]' : 'text-white hover:bg-white/10'
                }`}
                aria-label="Open off-canvas menu"
              >
                <MenuIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Off-Canvas Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-[#121B15]/60 backdrop-blur-xs"
            />

            {/* Slide-in Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-xs sm:max-w-sm bg-[#FAF7F2] text-[#232B25] shadow-2xl border-l border-[#E2D8C6] flex flex-col justify-between p-6 z-10"
            >
              {/* Drawer Top Header */}
              <div>
                <div className="flex items-center justify-between pb-5 border-b border-[#E8E1D4]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#2D4739] text-[#FAF7F2] flex items-center justify-center font-serif font-bold text-sm">
                      F
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-lg text-[#1C261F]">Flâneur Tea</h4>
                      <p className="text-[10px] text-[#6A786E] uppercase tracking-wider">Garden Sanctuary</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-full text-[#4A574E] hover:bg-[#EAE2D2] transition-colors"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Status Indicator */}
                <div className="my-4 p-3 rounded-2xl bg-[#EFE9DF] border border-[#E3D8C7] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        bangkokStatus.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'
                      }`}
                    />
                    <span className="font-semibold text-[#2D4739]">{bangkokStatus.statusText}</span>
                  </div>
                  <span className="text-[11px] text-[#7A8A7E] font-mono">{bangkokStatus.currentTimeString}</span>
                </div>

                {/* Navigation Links */}
                <nav className="space-y-1 my-6">
                  {navLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between py-2.5 px-3 rounded-xl text-sm font-semibold text-[#2B352D] hover:bg-[#EFE9DF] hover:text-[#2D4739] transition-colors"
                    >
                      <span>{link.label}</span>
                      <ChevronRight className="w-4 h-4 text-[#A1B0A4]" />
                    </a>
                  ))}
                </nav>
              </div>

              {/* Bottom CTAs */}
              <div className="space-y-3 pt-4 border-t border-[#E8E1D4]">
                {/* Book Table Button */}
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openBookingModal('book-table');
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-[#2D4739] text-[#FAF7F2] text-xs font-bold tracking-wider uppercase hover:bg-[#20352A] transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  <Calendar className="w-4 h-4 text-[#C79D60]" />
                  <span>Book Table / High Tea (฿680)</span>
                </button>

                {/* Pre-order Button */}
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openBookingModal('pre-order');
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-white border border-[#D5CABB] text-[#2D4739] text-xs font-bold tracking-wider uppercase hover:bg-[#FAF7F2] transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4 text-[#C79D60]" />
                  <span>Pre-Order Menu Items {cartCount > 0 ? `(${cartCount})` : ''}</span>
                </button>

                {/* Contact & Map links */}
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <a
                    href={`tel:${BUSINESS_INFO.phone}`}
                    className="py-2.5 px-3 rounded-xl bg-[#EBE4D8] text-[#2D4739] text-xs font-semibold flex items-center justify-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Staff</span>
                  </a>
                  <a
                    href={BUSINESS_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-[#EBE4D8] text-[#2D4739] text-xs font-semibold flex items-center justify-center gap-1.5"
                  >
                    <MapPin className="w-3.5 h-3.5 text-[#C79D60]" />
                    <span>Directions</span>
                  </a>
                </div>

                <p className="text-[10px] text-center text-[#7F8F82] pt-2">
                  Tue–Sun 9:00 AM – 6:00 PM • Closed Mon
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
