import React from 'react';
import { useSiteData } from '../context/SiteDataContext';
import { Star } from 'lucide-react';

export default function ReviewsSection() {
  const { siteData } = useSiteData();

  return (
    <section className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs uppercase tracking-[0.2em] font-semibold mb-4">
            <Star className="w-3.5 h-3.5 fill-current" /> Verified Google Reviews
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight mb-4">
            Loved By <span className="bg-gradient-to-r from-gold-metallic via-gold to-gold-light bg-clip-text text-transparent">Our Guests</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base font-light">
            Read what travelers, families, and food enthusiasts say about King's 99.
          </p>
        </div>

        {/* Reviews Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {siteData.reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-[#121822] rounded-2xl border border-white/5 p-6 sm:p-8 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 text-sm italic leading-relaxed mb-6">
                  "{rev.text}"
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div>
                  <h4 className="text-white text-xs font-bold">{rev.name}</h4>
                  <span className="text-gray-500 text-[11px]">{rev.date}</span>
                </div>
                <span className="text-gold text-[11px] font-semibold flex items-center gap-1">
                  Google Review
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
