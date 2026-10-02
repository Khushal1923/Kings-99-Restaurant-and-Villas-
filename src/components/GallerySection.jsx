import React, { useState } from 'react';
import { useSiteData } from '../context/SiteDataContext';
import { Camera, Image } from 'lucide-react';

export default function GallerySection() {
  const { siteData } = useSiteData();
  const [filter, setFilter] = useState("all"); // 'all', 'villas', 'restaurant'

  const filteredItems = siteData.gallery.filter(item => {
    if (filter === "all") return true;
    return item.category === filter;
  });

  return (
    <section id="gallery-section" className="py-24 bg-[#090D13] relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs uppercase tracking-[0.2em] font-semibold mb-4">
            <Camera className="w-3.5 h-3.5" /> Visual Showcase
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight mb-4">
            The Royal <span className="bg-gradient-to-r from-gold-metallic via-gold to-gold-light bg-clip-text text-transparent">Gallery</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base font-light">
            Moments of elegance, lush mountains, delicious dishes, and serene stays.
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-center gap-2 mb-12">
          <button
            onClick={() => setFilter('all')}
            className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
              filter === 'all' ? 'bg-gold text-black font-bold' : 'bg-[#121822] text-gray-400 hover:text-white border border-white/5'
            }`}
          >
            All Moments
          </button>
          <button
            onClick={() => setFilter('villas')}
            className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
              filter === 'villas' ? 'bg-emerald-accent text-white font-bold' : 'bg-[#121822] text-gray-400 hover:text-white border border-white/5'
            }`}
          >
            🏡 Villas & Nature
          </button>
          <button
            onClick={() => setFilter('restaurant')}
            className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
              filter === 'restaurant' ? 'bg-gold text-black font-bold' : 'bg-[#121822] text-gray-400 hover:text-white border border-white/5'
            }`}
          >
            🍽️ Dining & Food
          </button>
        </div>

        {/* Gallery Masonry / Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="relative h-64 rounded-2xl overflow-hidden group bg-slate-900 border border-white/5"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                <p className="text-white text-xs font-semibold leading-tight">{item.title}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
