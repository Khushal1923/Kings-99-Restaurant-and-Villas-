import React from 'react';
import { useSiteData } from '../context/SiteDataContext';
import { Instagram, Play } from 'lucide-react';

export default function ReelsSection() {
  const { siteData } = useSiteData();

  return (
    <section id="reels-section" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs uppercase tracking-[0.2em] font-semibold mb-4">
            <Instagram className="w-3.5 h-3.5" /> Live Ambiance
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight mb-4">
            Glimpse Of <span className="bg-gradient-to-r from-gold-metallic via-gold to-gold-light bg-clip-text text-transparent">King's 99</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base font-light">
            Watch the real vibes, dam views, and royal evenings captured live on our official Instagram feed.
          </p>
        </div>

        {/* Reels Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          {/* Villa Reel Card */}
          <div className="bg-[#121822] rounded-3xl border border-white/10 overflow-hidden group flex flex-col">
            <div className="relative h-80 w-full overflow-hidden bg-black">
              <img
                src="assets/villas/villa1.jpg"
                alt="Villa Reel"
                className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-500"
              />
              <a
                href={siteData.settings.villaReelUrl || "https://www.instagram.com/p/DdvLjn0CQ14/"}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex flex-col items-center justify-center gap-3 group/play"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 text-black flex items-center justify-center shadow-2xl shadow-emerald-400/50 group-hover/play:scale-110 transition-transform">
                  <Play className="w-7 h-7 fill-current ml-1" />
                </div>
                <span className="text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 bg-black/50 px-4 py-1.5 rounded-full border border-white/20">
                  <Instagram className="w-3.5 h-3.5 text-rose-400" /> Watch Villa Tour Reel
                </span>
              </a>
            </div>
            <div className="p-6">
              <h4 className="font-serif text-lg font-bold text-white mb-1">Scenic Villa & Nature Retreat</h4>
              <p className="text-gray-400 text-xs">Peaceful morning fog, green hills & private lawn gatherings.</p>
            </div>
          </div>

          {/* Restaurant Reel Card */}
          <div className="bg-[#121822] rounded-3xl border border-white/10 overflow-hidden group flex flex-col">
            <div className="relative h-80 w-full overflow-hidden bg-black">
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80"
                alt="Restaurant Reel"
                className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-500"
              />
              <a
                href={siteData.settings.restaurantReelUrl || "https://www.instagram.com/p/Dafg4qpAXRV/"}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex flex-col items-center justify-center gap-3 group/play"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-gold-metallic via-gold to-gold-dark text-black flex items-center justify-center shadow-2xl shadow-gold/50 group-hover/play:scale-110 transition-transform">
                  <Play className="w-7 h-7 fill-current ml-1" />
                </div>
                <span className="text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 bg-black/50 px-4 py-1.5 rounded-full border border-white/20">
                  <Instagram className="w-3.5 h-3.5 text-rose-400" /> Watch Dining Reel
                </span>
              </a>
            </div>
            <div className="p-6">
              <h4 className="font-serif text-lg font-bold text-white mb-1">Royal Dam-View Dining</h4>
              <p className="text-gray-400 text-xs">Evening sunset dinner with royal handi and sizzling tandoori starters.</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
