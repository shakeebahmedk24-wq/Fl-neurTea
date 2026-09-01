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
  mobileSpan?: string;
  desktopSpan?: string;
  heightClass?: string;
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
      mobileSpan: 'col-span-2',
      desktopSpan: 'lg:col-span-2',
      heightClass: 'h-48 sm:h-72 lg:h-80'
    },
    {
      id: 'g2',
      url: ASSETS.teaCeremony,
      title: 'Artisanal Loose-Leaf Tea (฿220)',
      subtitle: 'Single-estate brews with candle warmer',
      mobileSpan: 'col-span-1',
      desktopSpan: 'lg:col-span-1',
      heightClass: 'h-36 sm:h-64 lg:h-80'
    },
    {
      id: 'g3',
      url: ASSETS.cakesPastry,
      title: 'Handcrafted Flower Cakes (฿195–225)',
      subtitle: 'Yuzu cheesecake & Earl grey mousse',
      mobileSpan: 'col-span-1',
      desktopSpan: 'lg:col-span-1',
      heightClass: 'h-36 sm:h-64 lg:h-80'
    },
    {
      id: 'g4',
      url: ASSETS.brunchDish,
      title: 'Smoked Salmon Mochi Waffle (฿285)',
      subtitle: 'Savory crispy-chewy brunch with herbs',
      mobileSpan: 'col-span-1',
      desktopSpan: 'lg:col-span-1',
      heightClass: 'h-36 sm:h-64 lg:h-80'
    },
    {
      id: 'g5',
      url: ASSETS.icedSpecialty,
      title: 'Signature Iced Creations (฿165–185)',
      subtitle: 'Layered coconut coffee & matcha',
      mobileSpan: 'col-span-1',
      desktopSpan: 'lg:col-span-2',
      heightClass: 'h-36 sm:h-64 lg:h-80'
    },
    {
      id: 'g6',
      url: ASSETS.heroPoster,
      title: 'Greenhouse Atmosphere',
      subtitle: 'Dappled tropical light on Pan Road',
      mobileSpan: 'col-span-2 sm:col-span-1',
      desktopSpan: 'lg:col-span-1',
      heightClass: 'h-44 sm:h-64 lg:h-80'
    }
  ];

  return (
    <section id="garden" className="py-12 sm:py-20 lg:py-28 bg-[#FAF7F2] text-[#232B25] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Motion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-6 sm:mb-10"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#EAE3D6] text-[#2D4739] text-[11px] sm:text-xs font-semibold uppercase tracking-widest mb-2 sm:mb-3">
              <Camera className="w-3.5 h-3.5 text-[#C79D60]" />
              <span>Atmosphere & Lookbook</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-semibold text-[#1C261F] tracking-tight">
              Moments in the Garden
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button
              onClick={() => openBookingModal('book-table')}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-[#2D4739] text-white text-[11px] sm:text-xs font-bold hover:bg-[#21352A] transition-all shadow-xs"
            >
              <Calendar className="w-3.5 h-3.5 text-[#C79D60]" />
              <span>Reserve Garden Spot</span>
            </button>

            <a
              href={BUSINESS_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white border border-[#E0D7C9] text-[11px] sm:text-xs font-semibold text-[#2D4739] hover:bg-[#FAF7F2] transition-all shadow-xs"
            >
              <Instagram className="w-3.5 h-3.5 text-[#C79D60]" />
              <span>@flaneur.tea</span>
            </a>
          </div>
        </motion.div>

        {/* Gallery Grid - Responsive 2-column Lookbook on Mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 lg:gap-6">
          {photos.map((photo, idx) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              onClick={() => setSelectedPhoto(photo)}
              className={`group relative rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer shadow-2xs hover:shadow-lg transition-all ${
                photo.mobileSpan || ''
              } ${photo.desktopSpan || ''} ${photo.heightClass || 'h-36 sm:h-64 lg:h-80'}`}
            >
              <img
                src={photo.url}
                alt={photo.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              
              {/* Soft Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Caption Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5 lg:p-6 text-white flex items-end justify-between gap-2">
                <div className="min-w-0">
                  <h3 className="font-serif text-xs sm:text-base lg:text-lg font-bold tracking-tight text-white line-clamp-1 mb-0.5">
                    {photo.title}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-[#D8E6DC] font-light line-clamp-1">
                    {photo.subtitle}
                  </p>
                </div>

                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0 opacity-80 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedPhoto && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
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
                className="relative max-w-4xl w-full max-h-[90vh] bg-[#141F18] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl z-10 border border-white/20 flex flex-col"
              >
                <div className="relative flex-grow flex items-center justify-center bg-black/50 overflow-hidden min-h-[240px] sm:min-h-[300px]">
                  <img
                    src={selectedPhoto.url}
                    alt={selectedPhoto.title}
                    referrerPolicy="no-referrer"
                    className="max-h-[65vh] w-auto object-contain"
                  />
                  <button
                    onClick={() => setSelectedPhoto(null)}
                    className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-full bg-black/60 hover:bg-black text-white transition-colors"
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>

                <div className="p-4 sm:p-6 bg-[#18261F] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                  <div>
                    <h3 className="font-serif text-base sm:text-xl font-bold">{selectedPhoto.title}</h3>
                    <p className="text-[11px] sm:text-xs text-[#B2C5B8]">{selectedPhoto.subtitle}</p>
                  </div>
                  
                  <button
                    onClick={() => {
                      setSelectedPhoto(null);
                      openBookingModal('book-table');
                    }}
                    className="px-5 py-2 sm:px-6 sm:py-2.5 rounded-full bg-[#C79D60] text-[#18261F] text-xs font-bold hover:bg-[#DBAE6E] transition-colors self-start sm:self-auto"
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
