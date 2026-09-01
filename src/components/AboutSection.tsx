import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Leaf, Coffee, Award, Heart, CheckCircle2 } from 'lucide-react';
import { BUSINESS_INFO, HIGHLIGHT_QUOTES } from '../data/cafeData';
import { ASSETS } from '../data/images';

export const AboutSection: React.FC = () => {
  return (
    <section id="story" className="py-20 lg:py-28 bg-[#FAF7F2] text-[#232B25] relative overflow-hidden">
      {/* Decorative botanical backdrop elements */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#2D4739]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-[#C79D60]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAE3D6] text-[#2D4739] text-xs font-semibold uppercase tracking-widest mb-4">
            <Leaf className="w-3.5 h-3.5 text-[#2D4739]" />
            <span>The Botanical Story</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-[#1C261F] tracking-tight leading-tight mb-6">
            An Urban Sanctuary Designed for the Art of Slow Living
          </h2>
          <p className="text-base sm:text-lg text-[#556358] font-normal leading-relaxed">
            In French, a <em className="italic text-[#2D4739] font-serif">flâneur</em> is one who strolls leisurely, observing and appreciating the beauty around them. At Flâneur Tea, we brought this philosophy to life on Pan Road—a lush botanical oasis in the heart of bustling Sathorn.
          </p>
        </motion.div>

        {/* 2-Column Content + Visual Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20">
          
          {/* Left Column: Visual Storytelling */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-[#E3DCC8]/60 bg-white">
              <img
                src={ASSETS.gardenFairytale}
                alt="Flâneur Tea fairytale garden in Sathorn"
                referrerPolicy="no-referrer"
                className="w-full h-[360px] sm:h-[420px] object-cover hover:scale-103 transition-transform duration-700"
              />
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-white/60 shadow-md">
                <p className="font-serif text-base text-[#1F2B22] italic leading-snug">
                  “The garden feels like a fairytale, full of flowers and butterflies, and the interior is also beautifully designed.”
                </p>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#E8E1D5] text-xs text-[#5C6E61]">
                  <span className="font-semibold text-[#2D4739]">Verified Google Review</span>
                  <span>Local Guide</span>
                </div>
              </div>
            </div>

            {/* Small supporting image row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden shadow-md border border-[#E2DBD0]">
                <img
                  src={ASSETS.teaCeremony}
                  alt="Hot craft tea ceremony at Flâneur Tea"
                  referrerPolicy="no-referrer"
                  className="w-full h-44 object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="p-3 bg-white text-center">
                  <p className="text-xs font-semibold text-[#2D4739]">Single-Estate Teas</p>
                  <p className="text-[11px] text-[#7A8A7E]">Served with Glass Warmer</p>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden shadow-md border border-[#E2DBD0]">
                <img
                  src={ASSETS.cakesPastry}
                  alt="Handcrafted floral cakes and desserts"
                  referrerPolicy="no-referrer"
                  className="w-full h-44 object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="p-3 bg-white text-center">
                  <p className="text-xs font-semibold text-[#2D4739]">Edible Flower Cakes</p>
                  <p className="text-[11px] text-[#7A8A7E]">Yuzu, Earl Grey & Sesame</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Values & Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-8"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#2D4739]/10 text-[#2D4739] text-xs font-semibold">
                <Heart className="w-3.5 h-3.5 fill-current text-[#C79D60]" />
                <span>Proudly Women-Owned & Independent</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-4xl text-[#1E2820] font-semibold tracking-tight">
                Where Botanical Tranquility Meets Thoughtful Craft
              </h3>
              <p className="text-[#556358] text-base sm:text-lg leading-relaxed">
                Whether you seek a quiet garden bench to read and reflect, an inspiring corner to work with high-speed WiFi, or a vibrant sunlit table to share artisan brunch with friends, Flâneur Tea provides an escape from Bangkok’s urban pulse.
              </p>
            </div>

            {/* Feature Pillars */}
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-[#E8E1D5] shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-[#2D4739] text-white flex items-center justify-center shrink-0">
                  <Leaf className="w-5 h-5 text-[#C79D60]" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#1F2B22] text-sm sm:text-base">Lush Fairytale Garden</h4>
                  <p className="text-xs sm:text-sm text-[#5B6B5E] mt-0.5 leading-relaxed">
                    Surrounded by flowering shrubs, lavender blooms, and tranquil outdoor seating beneath tropical foliage.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-[#E8E1D5] shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-[#C79D60] text-white flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#1F2B22] text-sm sm:text-base">Artisanal Teas & Specialty Drinks</h4>
                  <p className="text-xs sm:text-sm text-[#5B6B5E] mt-0.5 leading-relaxed">
                    Signature Black Tea Pineapple Summer, Vanilla Strawberry Matcha, Dirty Coffee, and Cold Brew Coconut Coffee.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-[#E8E1D5] shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-[#2D4739] text-white flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-[#86EFAC]" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#1F2B22] text-sm sm:text-base">Vegan-Friendly & Fresh Ingredients</h4>
                  <p className="text-xs sm:text-sm text-[#5B6B5E] mt-0.5 leading-relaxed">
                    Wholesome plant-based bowls, sourdough options, dairy-free drinks, and freshly prepared savory brunch.
                  </p>
                </div>
              </div>
            </div>

            {/* Verbatim quote tags */}
            <div className="pt-2">
              <p className="text-xs font-semibold text-[#7A8A7E] uppercase tracking-wider mb-2">Guest Highlight Summary:</p>
              <div className="flex flex-wrap gap-2">
                {HIGHLIGHT_QUOTES.map((quote, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full bg-white border border-[#E2DAD0] text-xs text-[#3F4D42] font-medium shadow-2xs"
                  >
                    “{quote}”
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
