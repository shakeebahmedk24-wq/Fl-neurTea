import React from 'react';
import { BookingProvider } from './context/BookingContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { MenuSection } from './components/MenuSection';
import { BookingSection } from './components/BookingSection';
import { GallerySection } from './components/GallerySection';
import { ReviewsSection } from './components/ReviewsSection';
import { HoursLocationSection } from './components/HoursLocationSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { MobileCartStickyBar } from './components/MobileCartStickyBar';

export default function App() {
  return (
    <BookingProvider>
      <div className="min-h-screen bg-[#FAF7F2] text-[#232B25] flex flex-col selection:bg-[#2D4739] selection:text-[#FAF7F2]">
        {/* Top Fixed Header with Live Timings & Tap-to-Call */}
        <Navbar />

        {/* Main Content Sections */}
        <main className="flex-grow">
          {/* 1. Hero with 1080p Bespoke Cinematic Video & Multi-Depth Parallax */}
          <Hero />

          {/* 2. Botanical Story & Garden Oasis */}
          <AboutSection />

          {/* 3. Interactive Craft Menu & Pricing */}
          <MenuSection />

          {/* 4. Direct Online Booking & Pre-Order Section with Pricing */}
          <BookingSection />

          {/* 5. Garden Lookbook & Atmosphere Gallery */}
          <GallerySection />

          {/* 6. Verbatim Google Maps Reviews & 4.6 Rating */}
          <ReviewsSection />

          {/* 7. Operating Hours, Live Bangkok Status, BTS & Location */}
          <HoursLocationSection />
        </main>

        {/* 8. Contact, Direct Tap-to-Call, Social & Footer */}
        <Footer />

        {/* Mobile-Only Sticky Floating Cart Bar */}
        <MobileCartStickyBar />

        {/* Global Booking / Ordering Modal Overlay */}
        <BookingModal />
      </div>
    </BookingProvider>
  );
}
