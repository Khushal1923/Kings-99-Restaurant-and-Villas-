import React, { useState, useMemo } from 'react';
import { useSiteData } from '../context/SiteDataContext';
import { Camera, Utensils, Home, Sparkles, Image as ImageIcon } from 'lucide-react';

export default function GallerySection() {
  const { siteData, activeHub } = useSiteData();
  const isRestaurant = activeHub === 'restaurant';

  const [subFilter, setSubFilter] = useState('all');

  // Filter gallery items strictly according to current active hub (Restaurant vs Villas)
  const hubGalleryItems = useMemo(() => {
    return (siteData.gallery || []).filter(item => {
      const cat = (item.category || '').toLowerCase();
      if (isRestaurant) {
        return cat === 'restaurant' || cat === 'dining' || cat === 'food';
      } else {
        return cat === 'villas' || cat === 'villa' || cat === 'stay';
      }
    });
  }, [siteData.gallery, isRestaurant]);

  // Sub-filter inside the active hub
  const displayedItems = useMemo(() => {
    if (subFilter === 'all') return hubGalleryItems;
    return hubGalleryItems.filter(item => {
      const tag = (item.tag || item.subCategory || '').toLowerCase();
      const title = (item.title || '').toLowerCase();
      return tag.includes(subFilter.toLowerCase()) || title.includes(subFilter.toLowerCase());
    });
  }, [hubGalleryItems, subFilter]);

  // Dynamic filter buttons per hub
  const restaurantFilters = [
    { id: 'all', label: 'All Dining Moments' },
    { id: 'food', label: '🍽️ Chef Specials & Dishes' },
    { id: 'ambiance', label: '🌅 Dam View & Ambiance' },
    { id: 'drinks', label: '🍹 Mocktails & Drinks' }
  ];

  const villaFilters = [
    { id: 'all', label: 'All Villa Stays' },
    { id: 'exterior', label: '🏡 Villa Lawns & Exterior' },
    { id: 'interior', label: '🛏️ Suites & Interiors' },
    { id: 'scenery', label: '⛰️ Mountain & Dam Views' }
  ];

  const activeFilters = isRestaurant ? restaurantFilters : villaFilters;

  return (
    <section id="gallery-section" className="py-24 bg-[#090D13] relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Context-Aware Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs uppercase tracking-[0.2em] font-semibold mb-4 ${
            isRestaurant 
              ? 'bg-gold/10 border border-gold/20 text-gold'
              : 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
          }`}>
            {isRestaurant ? (
              <>
                <Utensils className="w-3.5 h-3.5" /> Culinary & Dining Gallery
              </>
            ) : (
              <>
                <Home className="w-3.5 h-3.5" /> Luxury Villas & Nature Gallery
              </>
            )}
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight mb-4">
            The Royal{' '}
            {isRestaurant ? (
              <span className="bg-gradient-to-r from-gold-metallic via-gold to-gold-light bg-clip-text text-transparent">
                Dining Gallery
              </span>
            ) : (
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200 bg-clip-text text-transparent">
                Villa Gallery
              </span>
            )}
          </h2>

          <p className="text-gray-400 text-sm sm:text-base font-light">
            {isRestaurant 
              ? "A glimpse into our exquisite handi specialties, open-air dam-view tables, and unforgettable royal dining moments."
              : "Immerse yourself in our serene hillside villas, private lawns, luxurious duplex suites, and misty Pahine mountain landscapes."
            }
          </p>
        </div>

        {/* Category Specific Sub-Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
          {activeFilters.map((btn) => (
            <button
              key={btn.id}
              onClick={() => setSubFilter(btn.id)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
                subFilter === btn.id
                  ? isRestaurant
                    ? 'bg-gold text-black font-bold shadow-lg shadow-gold/20 scale-105'
                    : 'bg-emerald-500 text-black font-bold shadow-lg shadow-emerald-500/20 scale-105'
                  : 'bg-[#121822] text-gray-400 hover:text-white border border-white/5'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {displayedItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {displayedItems.map((item, index) => (
              <div
                key={item.id || index}
                className="relative h-64 sm:h-72 rounded-2xl overflow-hidden group bg-slate-900 border border-white/5 hover:border-gold/30 transition-all duration-500 shadow-lg"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  loading="lazy"
                  onError={(e) => {
                    // Fallback to villa1 or high-res food fallback on error
                    e.target.src = isRestaurant 
                      ? 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80'
                      : 'assets/villas/villa1.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded w-fit mb-1.5 ${
                    isRestaurant ? 'bg-gold/20 text-gold border border-gold/30' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  }`}>
                    {item.tag || (isRestaurant ? 'Dining Moment' : 'Villa Stay')}
                  </span>
                  <p className="text-white text-sm font-semibold leading-snug">{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-[#121822] rounded-3xl border border-white/5">
            <ImageIcon className="w-10 h-10 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400 text-sm">No photos found in this category.</p>
          </div>
        )}

      </div>
    </section>
  );
}
