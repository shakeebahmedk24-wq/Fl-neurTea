import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Sparkles, X, Maximize2, Instagram, Calendar } from 'lucide-react';
import { ASSETS } from '../data/images';
import { BUSINESS_INFO } from '../data/cafeData';
import { useBooking } from '../context/BookingContext';

interface GalleryPhoto {
  id: string;
  url: string;
  title: string;
  subtitle: string;
  spanCol?: string;
}

export const GallerySection: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);
  const { openBookingModal } = useBooking();

  const photos: GalleryPhoto[] = [
    {
      id: 'g1',
      url: ASSETS.gardenFairytale,
      title: 'The Fairytale Garden Oasis',
      subtitle: 'Tranquil seating surrounded by lush foliage & flowers',
      spanCol: 'lg:col-span-2'
    },
    {
      id: 'g2',
      url: ASSETS.teaCeremony,
      title: 'Artisanal Loose-Leaf Tea (฿220)',
      subtitle: 'Single-estate brews in glass kettle with candle warmer'
    },
    {
      id: 'g3',
      url: ASSETS.cakesPastry,
      title: 'Handcrafted Flower Cakes (฿195–225)',
      subtitle: 'Yuzu cheesecake & Earl grey mousse with fresh blossoms'
    },
    {
      id: 'g4',
      url: ASSETS.brunchDish,
      title: 'Smoked Salmon Mochi Waffle (฿285)',
      subtitle: 'Savory crispy-chewy brunch with fresh garden herbs'
    },
    {
      id: 'g5',
      url: ASSETS.icedSpecialty,
      title: 'Signature Iced Creations (฿165–185)',
      subtitle: 'Layered coconut coffee & vanilla strawberry matcha',
      spanCol: 'lg:col-span-2'
    },
    {
      id: 'g6',
      url: ASSETS.heroPoster,
      title: 'Greenhouse Atmosphere',
      subtitle: 'Dappled tropical light on Pan Road, Sathorn'
    }
  ];

  return (
    <section id="garden" className="py-20 lg:py-28 bg-[#FAF7F2] text-[#232B25] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Motion */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAE3D6] text-[#2D4739] text-xs font-semibold uppercase tracking-widest mb-3">
              <Camera className="w-3.5 h-3.5" />
              <span>Atmosphere & Lookbook</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-[#1C261F] tracking-tight">
              Moments in the Garden
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => openBookingModal('book-table')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#2D4739] text-white text-xs font-bold hover:bg-[#21352A] transition-all shadow-xs"
            >
              <Calendar className="w-4 h-4 text-[#C79D60]" />
              <span>Reserve Garden Spot</span>
            </button>

            <a
              href={BUSINESS_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-[#E0D7C9] text-xs font-semibold text-[#2D4739] hover:bg-[#FAF7F2] transition-all shadow-xs"
            >
              <Instagram className="w-4 h-4 text-[#C79D60]" />
              <span>@flaneur.tea Instagram</span>
            </a>
          </div>
        </motion.div>

        {/* Gallery Grid with Motion */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo, idx) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              onClick={() => setSelectedPhoto(photo)}
              className={`group relative rounded-3xl overflow-hidden cursor-pointer shadow-xs hover:shadow-xl transition-all h-80 ${
                photo.spanCol || ''
              }`}
            >
              <img
                src={photo.url}
                alt={photo.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              
              {/* Hover Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white flex items-end justify-between">
                <div>
                  <h3 className="font-serif text-lg sm:text-xl font-bold tracking-tight text-white mb-1">
                    {photo.title}
                  </h3>
                  <p className="text-xs text-[#D8E6DC] font-light">
                    {photo.subtitle}
                  </p>
                </div>

                <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedPhoto && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedPhoto(null)}
                className="fixed inset-0 bg-black/90 backdrop-blur-md"
              />
              
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="relative max-w-4xl w-full max-h-[90vh] bg-[#141F18] rounded-3xl overflow-hidden shadow-2xl z-10 border border-white/20 flex flex-col"
              >
                <div className="relative flex-grow flex items-center justify-center bg-black/50 overflow-hidden min-h-[300px]">
                  <img
                    src={selectedPhoto.url}
                    alt={selectedPhoto.title}
                    referrerPolicy="no-referrer"
                    className="max-h-[70vh] w-auto object-contain"
                  />
                  <button
                    onClick={() => setSelectedPhoto(null)}
                    className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 hover:bg-black text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-6 bg-[#18261F] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-xl font-bold">{selectedPhoto.title}</h3>
                    <p className="text-xs text-[#B2C5B8]">{selectedPhoto.subtitle}</p>
                  </div>
                  
                  <button
                    onClick={() => {
                      setSelectedPhoto(null);
                      openBookingModal('book-table');
                    }}
                    className="px-6 py-2.5 rounded-full bg-[#C79D60] text-[#18261F] text-xs font-bold hover:bg-[#DBAE6E] transition-colors self-start sm:self-auto"
                  >
                    Reserve Table for this Spot
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
