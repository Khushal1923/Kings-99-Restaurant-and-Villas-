import React from 'react';
import { useSiteData } from '../context/SiteDataContext';
import { Home, Bed, Users, Bath, Check, MessageCircle, Calendar } from 'lucide-react';

export default function VillasSection() {
  const { siteData, openReservation } = useSiteData();

  return (
    <section id="villas-section" className="py-24 bg-gradient-to-b from-[#0B0F15] via-[#0E1520] to-[#0B0F15] relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-accent/15 border border-emerald-accent/30 text-emerald-400 text-xs uppercase tracking-[0.2em] font-semibold mb-4">
            <Home className="w-3.5 h-3.5" /> Mountain Staycations
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight mb-4">
            Luxury Private <span className="bg-gradient-to-r from-emerald-300 via-emerald-400 to-teal-200 bg-clip-text text-transparent">Villas & Cottages</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base font-light">
            Surrounded by majestic green hills, terracotta tile roofs, and cool dam breezes. Perfect for family weekends and celebrations.
          </p>
        </div>

        {/* Villas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {siteData.villas.map((villa) => (
            <div
              key={villa.id}
              className="bg-[#121822] rounded-3xl border border-white/5 hover:border-emerald-accent/40 overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-accent/10"
            >
              {/* Main Photo Box */}
              <div className="relative h-64 w-full overflow-hidden bg-slate-900">
                <img
                  src={villa.image}
                  alt={villa.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = "assets/villas/villa1.jpg";
                  }}
                />
                {villa.tag && (
                  <span className="absolute top-4 left-4 bg-emerald-accent/90 border border-white/20 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full backdrop-blur-md">
                    {villa.tag}
                  </span>
                )}
                <div className="absolute bottom-4 right-4 bg-[#0B0F15]/90 border border-gold/30 text-gold-light px-3.5 py-1.5 rounded-xl font-bold text-base backdrop-blur-md">
                  ₹{villa.price.toLocaleString()} <span className="text-xs font-normal text-gray-400">{villa.priceUnit}</span>
                </div>
              </div>

              {/* Villa Information */}
              <div className="p-6 sm:p-8 flex flex-col flex-grow">
                <h3 className="font-serif font-bold text-xl text-white mb-3">
                  {villa.name}
                </h3>

                {/* Specs Bar */}
                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-300 mb-4 pb-4 border-b border-white/5">
                  <div className="flex items-center gap-1.5">
                    <Bed className="w-4 h-4 text-gold" /> {villa.bedrooms}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-gold" /> {villa.guests}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Bath className="w-4 h-4 text-gold" /> {villa.bathrooms}
                  </div>
                </div>

                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-6">
                  {villa.description}
                </p>

                {/* Amenities List */}
                <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                  {(villa.amenities || []).map((am, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 bg-white/[0.04] border border-white/10 text-gray-300 text-[11px] px-2.5 py-1 rounded-lg"
                    >
                      <Check className="w-3 h-3 text-emerald-400" />
                      {am}
                    </span>
                  ))}
                </div>

                {/* Buttons */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={() => openReservation('villa', villa.name)}
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-accent to-emerald-dark hover:from-emerald-600 hover:to-emerald-800 text-white font-bold text-xs uppercase tracking-wider py-3 rounded-xl shadow-lg shadow-emerald-accent/20 transition-all"
                  >
                    <MessageCircle className="w-4 h-4" /> Book Stay
                  </button>

                  <a
                    href={`https://wa.me/${siteData.settings.whatsappNumber}?text=${encodeURIComponent(`Hello King's 99, I would like to inquire about availability for ${villa.name}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white font-semibold text-xs py-3 rounded-xl transition-all"
                  >
                    <Calendar className="w-4 h-4 text-gold" /> Inquire
                  </a>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
