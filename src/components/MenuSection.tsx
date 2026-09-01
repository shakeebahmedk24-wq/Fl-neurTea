import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Coffee, Leaf, Sparkles, UtensilsCrossed, ExternalLink, Search, Flame, Check, Plus, ShoppingBag, Calendar } from 'lucide-react';
import { MENU_ITEMS, BUSINESS_INFO } from '../data/cafeData';
import { ASSETS } from '../data/images';
import { MenuItem } from '../types';
import { useBooking } from '../context/BookingContext';

type CategoryFilter = 'all' | 'tea' | 'coffee' | 'pastry' | 'brunch' | 'vegan' | 'sets';

export const MenuSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDietary, setSelectedDietary] = useState<string | null>(null);
  const { addToCart, openBookingModal } = useBooking();
  const [addedItemNotice, setAddedItemNotice] = useState<string | null>(null);

  const categories: { id: CategoryFilter; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'All Items', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'tea', label: 'Artisanal Teas', icon: <Leaf className="w-4 h-4" /> },
    { id: 'coffee', label: 'Coffee & Brews', icon: <Coffee className="w-4 h-4" /> },
    { id: 'pastry', label: 'Floral Cakes & Pastries', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'brunch', label: 'Savory Brunch & Waffles', icon: <UtensilsCrossed className="w-4 h-4" /> },
    { id: 'vegan', label: 'Vegan Garden Bowls', icon: <Leaf className="w-4 h-4" /> },
  ];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory =
        activeCategory === 'all'
          ? true
          : activeCategory === 'vegan'
          ? item.dietary?.includes('Vegan') || item.category === 'vegan'
          : item.category === activeCategory;

      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDietary = selectedDietary
        ? item.dietary?.includes(selectedDietary as any)
        : true;

      return matchesCategory && matchesSearch && matchesDietary;
    });
  }, [activeCategory, searchQuery, selectedDietary]);

  const getItemVisual = (item: MenuItem) => {
    if (item.id.includes('tea')) return ASSETS.teaCeremony;
    if (item.id.includes('cake') || item.id.includes('tart') || item.id.includes('tiramisu') || item.id.includes('croissant')) return ASSETS.cakesPastry;
    if (item.id.includes('coffee') || item.id.includes('matcha') || item.id.includes('pineapple') || item.id.includes('chocolate')) return ASSETS.icedSpecialty;
    if (item.id.includes('salmon') || item.id.includes('duck') || item.id.includes('waffle') || item.id.includes('benedict') || item.id.includes('bowl')) return ASSETS.brunchDish;
    return ASSETS.gardenFairytale;
  };

  const handleQuickAdd = (item: MenuItem) => {
    addToCart(item, 1);
    setAddedItemNotice(`Added ${item.name} (฿${item.price}) to cart!`);
    setTimeout(() => {
      setAddedItemNotice(null);
    }, 2500);
  };

  return (
    <section id="menu" className="py-20 lg:py-28 bg-[#F4EFE6] text-[#232B25] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E4DAC8] text-[#2D4739] text-xs font-semibold uppercase tracking-widest mb-4">
            <UtensilsCrossed className="w-3.5 h-3.5" />
            <span>Craft Menu with Live Pricing</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-[#1C261F] tracking-tight mb-4">
            Artisanal Blends, Floral Cakes & Savory Delights
          </h2>
          <p className="text-base sm:text-lg text-[#556358] max-w-2xl mx-auto">
            From single-estate loose leaves and signature coconut cold brews to crispy mochi waffles and botanical bowls.
          </p>
          
          <div className="mt-4 inline-flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-[#58675C] bg-[#FAF7F2] px-4 py-2 rounded-full border border-[#E3D8C6]">
            <span>Average Spending: <strong>{BUSINESS_INFO.priceRange}</strong></span>
            <span>•</span>
            <span>All Prices in Thai Baht (฿)</span>
            <span>•</span>
            <button
              onClick={() => openBookingModal('pre-order')}
              className="text-[#2D4739] font-bold underline hover:text-[#C79D60] ml-1"
            >
              Open Pre-Order Cart
            </button>
          </div>
        </motion.div>

        {/* Notice Toast */}
        {addedItemNotice && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#2D4739] text-[#FAF7F2] px-4 py-3 rounded-2xl shadow-xl border border-[#486B56] flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <Check className="w-4 h-4 text-[#C79D60]" />
            <span className="text-xs font-bold">{addedItemNotice}</span>
            <button
              onClick={() => openBookingModal('pre-order')}
              className="text-[11px] bg-[#C79D60] text-[#18261F] font-bold px-2.5 py-1 rounded-lg hover:bg-[#E0B778]"
            >
              View Cart
            </button>
          </div>
        )}

        {/* Category Tabs & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none no-scrollbar">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-[#2D4739] text-[#FAF7F2] shadow-sm'
                      : 'bg-white text-[#4A574E] hover:bg-[#EAE2D2] border border-[#E3D9C9]'
                  }`}
                >
                  {cat.icon}
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#8A9B8F] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search tea, cake, waffle..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-full bg-white border border-[#E3D9C9] focus:outline-none focus:ring-2 focus:ring-[#2D4739] text-[#232B25] placeholder:text-[#9EAFA3]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8A9B8F] hover:text-[#232B25]"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Menu Grid with Motion */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredItems.map((item, idx) => {
            const visualImg = getItemVisual(item);
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.4, delay: (idx % 6) * 0.05 }}
                className="group bg-white rounded-3xl p-5 border border-[#E6DDD0] shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Item Image Preview & Badges */}
                  <div className="relative h-44 rounded-2xl overflow-hidden mb-4 bg-[#FAF7F2]">
                    <img
                      src={visualImg}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      {item.dietary?.map((tag) => (
                        <span
                          key={tag}
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase shadow-xs ${
                            tag === 'Signature'
                              ? 'bg-[#2D4739] text-white'
                              : tag === 'Vegan'
                              ? 'bg-[#15803D] text-white'
                              : tag === 'Popular'
                              ? 'bg-[#C79D60] text-white'
                              : 'bg-white/90 text-[#2D4739] backdrop-blur-xs'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Prominent Price Tag in ฿ THB */}
                    <div className="absolute bottom-3 right-3 bg-[#1C261F]/90 backdrop-blur-md text-[#FAF7F2] font-serif font-bold text-sm px-3 py-1 rounded-full shadow-md border border-white/20">
                      ฿{item.price}
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="flex justify-between items-start mb-1.5">
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1F2B22] group-hover:text-[#2D4739] transition-colors">
                      {item.name}
                    </h3>
                  </div>
                  <p className="text-xs text-[#5C6E61] leading-relaxed line-clamp-3 mb-4">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#F0EBE1] flex items-center justify-between gap-2">
                  <span className="text-xs font-serif font-bold text-[#2D4739]">
                    ฿{item.price} THB
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleQuickAdd(item)}
                      className="px-3 py-1.5 rounded-full bg-[#EBF3ED] hover:bg-[#2D4739] text-[#2D4739] hover:text-[#FAF7F2] text-xs font-bold transition-all flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add to Pre-Order</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Banner: View Full Google Drive Menu & Direct Booking */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
          className="bg-[#2D4739] rounded-3xl p-8 sm:p-10 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl"
        >
          <div className="space-y-2 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#C79D60]" />
              <span>Full Seasonal Selection & Teas</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-semibold">
              Ready to experience our botanical sanctuary?
            </h3>
            <p className="text-sm text-[#D1E0D6] max-w-xl">
              Book a table or high tea set directly through our site, or view our complete Google Drive seasonal PDF menu.
            </p>
          </div>

          <div className="flex flex-col xs:flex-row gap-3 shrink-0">
            <button
              onClick={() => openBookingModal('book-table')}
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#C79D60] text-[#18261F] font-bold text-xs tracking-wide hover:bg-[#E0B778] transition-all shadow-md"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Table Now</span>
            </button>

            <a
              id="view-drive-menu-button"
              href={BUSINESS_INFO.menuPdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/15 hover:bg-white/25 text-white font-semibold text-xs tracking-wide border border-white/20 transition-all"
            >
              <span>View PDF Menu</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#FAF7F2]" />
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

