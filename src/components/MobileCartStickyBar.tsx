import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, ArrowRight, X } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export const MobileCartStickyBar: React.FC = () => {
  const { cart, cartTotal, cartCount, openBookingModal, isBookingModalOpen } = useBooking();

  // Only show when cart has items and modal is not currently open
  if (cartCount === 0 || isBookingModalOpen) {
    return null;
  }

  // Preview of latest items
  const latestItemName = cart[cart.length - 1]?.menuItem.name || 'Selected Items';

  return (
    <AnimatePresence>
      <motion.div
        id="mobile-sticky-cart-bar"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="fixed bottom-3 left-3 right-3 z-40 md:hidden"
      >
        <div className="bg-[#1C261F] text-[#FAF7F2] rounded-2xl p-3 sm:p-3.5 shadow-2xl border border-[#3A4D40] flex items-center justify-between gap-3">
          
          {/* Left: Cart items count & live total */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative shrink-0">
              <div className="w-10 h-10 rounded-xl bg-[#2D4739] text-[#C79D60] flex items-center justify-center border border-[#3E5C4B]">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <span className="absolute -top-1.5 -right-1.5 bg-[#C79D60] text-[#1C261F] text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                {cartCount}
              </span>
            </div>

            <div className="truncate">
              <div className="flex items-baseline gap-1.5">
                <span className="text-xs text-[#9DAFA2] font-medium">Cart Total:</span>
                <span className="font-serif font-bold text-sm text-[#FAF7F2]">฿{cartTotal} THB</span>
              </div>
              <p className="text-[10px] text-[#A6B7AB] truncate max-w-[140px] xs:max-w-[180px]">
                {cart.length === 1 ? latestItemName : `${cartCount} items selected`}
              </p>
            </div>
          </div>

          {/* Right: Checkout / View Cart Action */}
          <button
            onClick={() => openBookingModal('pre-order')}
            className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#C79D60] text-[#141E17] text-xs font-bold uppercase tracking-wider hover:bg-[#D4AC72] active:scale-95 transition-all shadow-md"
          >
            <span>View Order</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
