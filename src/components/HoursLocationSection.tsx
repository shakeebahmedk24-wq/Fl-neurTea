import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Clock, MapPin, Phone, Navigation, Train, Car, Copy, Check, ExternalLink, Calendar } from 'lucide-react';
import { BUSINESS_INFO, SCHEDULE } from '../data/cafeData';
import { useBangkokTime } from '../hooks/useBangkokTime';
import { useBooking } from '../context/BookingContext';

export const HoursLocationSection: React.FC = () => {
  const bangkokStatus = useBangkokTime();
  const [copied, setCopied] = useState(false);
  const { openBookingModal } = useBooking();

  const copyAddress = () => {
    navigator.clipboard.writeText(BUSINESS_INFO.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Determine current day for highlighting in schedule table
  const now = new Date();
  const bkkDate = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Bangkok' }));
  const currentDayIndex = bkkDate.getDay();

  return (
    <section id="visit" className="py-20 lg:py-28 bg-[#FAF7F2] text-[#232B25] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Motion */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAE3D6] text-[#2D4739] text-xs font-semibold uppercase tracking-widest mb-4">
            <Clock className="w-3.5 h-3.5" />
            <span>Plan Your Visit</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-[#1C261F] tracking-tight mb-4">
            Hours, Location & Getting Here
          </h2>
          <p className="text-base sm:text-lg text-[#556358]">
            Nestled on Pan Road between Silom and Sathorn. Open Tuesday through Sunday for peaceful mornings and afternoon tea.
          </p>
        </motion.div>

        {/* 2-Column Grid: Hours Table on Left, Location & Map on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-12">
          
          {/* Left Column: Hours & Live Status */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-[#E6DDD0] shadow-sm space-y-6"
          >
            
            {/* Live Status Header */}
            <div className="p-4 rounded-2xl bg-[#F5EFEB] border border-[#E5D7D0] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className={`w-3 h-3 rounded-full ${bangkokStatus.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'}`} />
                <div>
                  <h4 className="font-semibold text-sm text-[#1F2B22]">{bangkokStatus.statusText}</h4>
                  <p className="text-xs text-[#6A7B6E]">{bangkokStatus.subText}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[11px] font-medium text-[#8A9B8F] block">Local Time</span>
                <span className="text-xs font-bold text-[#2D4739]">{bangkokStatus.currentTimeString.split(' ')[0]} {bangkokStatus.currentTimeString.split(' ')[1]}</span>
              </div>
            </div>

            {/* Weekly Hours Table */}
            <div>
              <h3 className="font-serif text-xl font-semibold text-[#1F2B22] mb-3 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#C79D60]" />
                <span>Operating Hours</span>
              </h3>

              <div className="divide-y divide-[#F0EAE1] text-xs">
                {SCHEDULE.map((item) => {
                  const isToday = item.dayIndex === currentDayIndex;
                  return (
                    <div
                      key={item.day}
                      className={`py-3 flex items-center justify-between transition-colors px-2 rounded-lg ${
                        isToday ? 'bg-[#2D4739]/5 font-semibold text-[#2D4739]' : 'text-[#4A594E]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span>{item.day}</span>
                        {isToday && (
                          <span className="text-[10px] uppercase tracking-wider bg-[#2D4739] text-white px-2 py-0.5 rounded-full">
                            Today
                          </span>
                        )}
                      </div>
                      <span className={!item.isOpenDay ? 'text-[#A05C5C] font-semibold' : 'text-[#1F2B22]'}>
                        {item.hours}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Action: Direct Table Reservation */}
            <div className="p-4 rounded-2xl bg-[#2D4739] text-white space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-serif text-sm font-semibold">Reserve in Advance</h4>
                <span className="text-[10px] bg-[#C79D60] text-[#18261F] font-bold px-2 py-0.5 rounded-full">Guaranteed Spot</span>
              </div>
              <p className="text-xs text-[#D5E3DA]">
                Weekend afternoons fill up quickly. Guarantee your garden or indoor seating with our direct online booking tool.
              </p>
              <button
                onClick={() => openBookingModal('book-table')}
                className="w-full mt-2 py-2.5 rounded-xl bg-[#C79D60] text-[#18261F] text-xs font-bold hover:bg-[#E0B778] transition-colors"
              >
                Book Table Online
              </button>
            </div>

            {/* Direct Tap-to-Call */}
            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8E1D5] flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#2D4739]/10 flex items-center justify-center text-[#2D4739]">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] text-[#7A8A7E] font-medium">Telephone Reservations</p>
                  <a
                    href={`tel:${BUSINESS_INFO.phone}`}
                    className="text-sm font-bold text-[#1F2B22] hover:text-[#2D4739] transition-colors"
                  >
                    {BUSINESS_INFO.phoneDisplay}
                  </a>
                </div>
              </div>

              <a
                id="hours-call-button"
                href={`tel:${BUSINESS_INFO.phone}`}
                className="px-4 py-2 rounded-full bg-[#2D4739] text-white text-xs font-semibold hover:bg-[#203328] transition-colors shrink-0"
              >
                Tap to Call
              </a>
            </div>

          </motion.div>

          {/* Right Column: Address, Navigation & Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#E6DDD0] shadow-sm space-y-6"
          >
            
            {/* Address Banner */}
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#C79D60]/20 flex items-center justify-center text-[#C79D60] shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5 text-[#2D4739]" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#1F2B22]">Flâneur Tea Cafe</h3>
                    <p className="text-xs text-[#526356] leading-relaxed mt-0.5 max-w-md">
                      {BUSINESS_INFO.address}
                    </p>
                    <p className="text-[11px] text-[#8A9B8F] mt-1">
                      Located on Pan Road (near Sri Maha Mariamman Temple & Surasak BTS)
                    </p>
                  </div>
                </div>

                {/* Copy address button */}
                <button
                  onClick={copyAddress}
                  className="p-2.5 rounded-xl border border-[#E4DBCB] hover:bg-[#FAF7F2] text-[#4A594E] transition-colors shrink-0 flex items-center gap-1.5 text-xs font-medium"
                  title="Copy address"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-700 hidden sm:inline">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span className="hidden sm:inline">Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Action Buttons: Get Directions & Open Map */}
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  id="directions-button"
                  href={BUSINESS_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[160px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#2D4739] text-[#FAF7F2] text-xs font-bold hover:bg-[#203328] transition-all shadow-sm"
                >
                  <Navigation className="w-4 h-4 text-[#C79D60]" />
                  <span>Google Maps Directions</span>
                </a>

                <a
                  href={BUSINESS_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#FAF7F2] border border-[#E2DAD0] text-xs font-semibold text-[#2D4739] hover:bg-[#EAE4D8] transition-colors"
                >
                  <span>Open in Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="relative rounded-2xl overflow-hidden border border-[#E2DAD0] h-64 sm:h-72 w-full bg-[#EAE4D8]">
              <iframe
                title="Flâneur Tea Cafe Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.7656910682194!2d100.5222513!3d13.7223405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e2996d9dfbb687%3A0xe543e06263595f93!2sFl%C3%A2neur%20Tea!5e0!3m2!1sen!2sth!4v1700000000000!5m2!1sen!2sth"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full grayscale-[15%] contrast-105"
              />
            </div>

            {/* Transit & Parking Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D6] flex items-start gap-3">
                <Train className="w-5 h-5 text-[#2D4739] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#1F2B22]">By BTS Skytrain</h4>
                  <p className="text-[11px] text-[#556358] mt-0.5 leading-snug">
                    BTS Surasak (Exit 3) or BTS Saint Louis. 7–9 min leisurely walk via Pan Road.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D6] flex items-start gap-3">
                <Car className="w-5 h-5 text-[#2D4739] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#1F2B22]">By Car & Taxi</h4>
                  <p className="text-[11px] text-[#556358] mt-0.5 leading-snug">
                    Turn into Pan Road from North Sathorn or Silom Road. Street parking / nearby spots available.
                  </p>
                </div>
              </div>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
};
