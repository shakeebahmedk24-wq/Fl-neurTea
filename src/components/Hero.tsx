import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Star, MapPin, ChevronDown, ArrowRight, Heart, Calendar } from 'lucide-react';
import { BUSINESS_INFO } from '../data/cafeData';
import { ASSETS } from '../data/images';
import { useBangkokTime } from '../hooks/useBangkokTime';
import { useBooking } from '../context/BookingContext';

export const Hero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const bangkokStatus = useBangkokTime();
  const { openBookingModal } = useBooking();

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        setIsPlaying(false);
      });
    }
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <section
      id="hero-section"
      className="relative min-h-[94vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-[#141F18] text-white pt-24 pb-16"
    >
      {/* Background Video & Poster Layer */}
      <div
        id="hero-video-layer"
        className="absolute inset-0 w-full h-full pointer-events-none scale-100"
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster={ASSETS.heroPoster}
          onLoadedData={() => setVideoLoaded(true)}
          className="w-full h-full object-cover object-center opacity-85 transition-opacity duration-1000"
        >
          <source src={ASSETS.heroVideo1080p} type="video/mp4" />
          <source src={ASSETS.heroVideoFallback} type="video/mp4" />
        </video>

        {/* Fallback image if video is not rendered or during initial frame */}
        <img
          src={ASSETS.heroPoster}
          alt="Flâneur Tea Greenhouse Garden in Bangkok"
          referrerPolicy="no-referrer"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            videoLoaded ? 'opacity-0' : 'opacity-100'
          }`}
        />

        {/* Multi-gradient botanical tint for maximum legibility and elegance */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141F18] via-[#141F18]/50 to-[#141F18]/60" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#141F18]/30 to-[#141F18]/80" />
      </div>

      {/* Atmospheric Ambient Glow Layer */}
      <div
        id="hero-atmosphere-layer"
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#C79D60]/15 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-10 w-80 h-80 bg-[#3F6B50]/20 rounded-full blur-3xl" />
      </div>

      {/* Hero Foreground Content */}
      <div
        id="hero-content-layer"
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-8 sm:py-16"
      >
        {/* Top Badges & Ratings with Motion */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-6"
        >
          {/* Google Maps Verified 4.6 Badge */}
          <a
            href={BUSINESS_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 transition-all text-xs font-semibold tracking-wide text-[#F3EFE6]"
          >
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <span className="font-bold text-white">4.6</span>
            <span className="text-[#C5D0C8]">({BUSINESS_INFO.reviewCount} Reviews on Maps)</span>
          </a>

          {/* Women-Owned Badge */}
          <div className="hidden xs:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#2D4739]/80 backdrop-blur-md border border-[#4B6B58] text-xs font-medium text-[#D8E6DC]">
            <Heart className="w-3 h-3 text-[#E8927C] fill-current" />
            <span>Women-Owned</span>
          </div>

          {/* Sathorn Bangkok Location Pill */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs text-[#FAF7F2]">
            <MapPin className="w-3 h-3 text-[#C79D60]" />
            <span>Sathorn, Pan Road</span>
          </div>
        </motion.div>

        {/* Main Display Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-[#FAF7F2] leading-[1.08] max-w-4xl mx-auto mb-6"
        >
          A Fairytale Garden Tea House in the Heart of Bangkok
        </motion.h1>

        {/* Subtitle / Poetic Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-base sm:text-xl text-[#D3DDD5] font-light max-w-2xl mx-auto leading-relaxed mb-10"
        >
          Handcrafted artisanal loose-leaf teas, signature coconut cold brews, 
          botanical brunch, and edible flower cakes tucked in a lush green sanctuary.
        </motion.p>

        {/* Primary Call-to-Actions with Direct Booking */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full mx-auto"
        >
          {/* Direct Reserve Button */}
          <button
            id="hero-book-cta"
            onClick={() => openBookingModal('book-table')}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#C79D60] hover:bg-[#D6AC71] text-[#18261F] font-bold text-sm tracking-wide shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 whitespace-nowrap active:scale-95"
          >
            <Calendar className="w-4 h-4 shrink-0" />
            <span className="whitespace-nowrap">Book Table / High Tea (฿680)</span>
          </button>

          {/* Scroll to Menu CTA */}
          <a
            id="hero-menu-cta"
            href="#menu"
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 sm:py-4 rounded-full bg-white/15 hover:bg-white/25 text-[#FAF7F2] font-semibold text-sm tracking-wide border border-white/30 backdrop-blur-md transition-all shadow-md whitespace-nowrap active:scale-95"
          >
            <span className="whitespace-nowrap">Explore Menu & Pricing</span>
            <ArrowRight className="w-4 h-4 text-[#FAF7F2] shrink-0" />
          </a>
        </motion.div>

        {/* Real-time Status Card below CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-10 inline-flex flex-wrap items-center justify-center gap-3 px-4 py-2 rounded-2xl bg-black/40 backdrop-blur-md border border-white/15 text-xs text-[#E1EADF]"
        >
          <span className={`w-2.5 h-2.5 rounded-full ${bangkokStatus.isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
          <span className="font-semibold text-white">{bangkokStatus.statusText}</span>
          <span className="text-white/40">•</span>
          <span>{bangkokStatus.subText}</span>
          <span className="text-white/40">•</span>
          <span className="text-[#C5D2C8] font-medium">Average ฿200–400 / person</span>
        </motion.div>
      </div>

      {/* Bottom Floating Scroll Indicator & Video Controls */}
      <div className="absolute bottom-4 left-0 right-0 z-20 px-6 flex items-center justify-between pointer-events-auto max-w-7xl mx-auto">
        <button
          onClick={togglePlay}
          className="text-xs flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 hover:bg-black/60 border border-white/15 text-[#E0E8E2] backdrop-blur-xs transition-colors"
          title={isPlaying ? 'Pause Background Video' : 'Play Background Video'}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>{isPlaying ? 'Live 1080p Video' : 'Video Paused'}</span>
        </button>

        <a
          href="#story"
          className="hidden md:flex flex-col items-center gap-1 text-[#C4D0C7] hover:text-white transition-colors text-xs font-medium"
        >
          <span>Scroll to explore</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </a>

        <div className="text-right text-[11px] text-[#A6B8AC] tracking-wider uppercase">
          BTS Saint Louis / Surasak
        </div>
      </div>
    </section>
  );
};

