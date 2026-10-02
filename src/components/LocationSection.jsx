import React from 'react';
import { useSiteData } from '../context/SiteDataContext';
import { MapPin, Phone, Clock, Navigation, Instagram } from 'lucide-react';

export default function LocationSection() {
  const { siteData } = useSiteData();

  return (
    <section id="location-section" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-[#121822] border border-gold/20 rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 shadow-2xl shadow-black/80">
          
          {/* Info Side */}
          <div className="p-8 sm:p-12 lg:p-14 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs uppercase tracking-[0.2em] font-semibold mb-6 w-fit">
              <MapPin className="w-3.5 h-3.5" /> Visit Us
            </div>

            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">
              King's 99 <span className="text-gold">Restaurant & Villa</span>
            </h3>

            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              Strategically located on the scenic Ghoti-Trimbakeshwar highway near Pahine, offering cool breezes, mountain backdrops, and peaceful luxury.
            </p>

            <div className="flex flex-col gap-4 mb-10">
              <div className="flex items-start gap-3.5 text-gray-300 text-sm">
                <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <span>{siteData.settings.address}</span>
              </div>
              <div className="flex items-center gap-3.5 text-gray-300 text-sm">
                <Phone className="w-5 h-5 text-gold shrink-0" />
                <span>{siteData.settings.phoneDisplay}</span>
              </div>
              <div className="flex items-center gap-3.5 text-gray-300 text-sm">
                <Clock className="w-5 h-5 text-gold shrink-0" />
                <span>{siteData.settings.openingHours}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href={siteData.settings.googleMapsUrl || "https://www.google.com/search?q=kings+99+restaurant"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-gold-metallic via-gold to-gold-dark text-black font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-full shadow-lg shadow-gold/20 transition-all hover:scale-105"
              >
                <Navigation className="w-4 h-4" /> Open in Google Maps
              </a>
              <a
                href={siteData.settings.instagramUrl || "https://www.instagram.com/kings99official/"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-xs px-6 py-3 rounded-full transition-all"
              >
                <Instagram className="w-4 h-4 text-rose-400" /> @kings99official
              </a>
            </div>
          </div>

          {/* Google Maps Embed */}
          <div className="min-h-[380px] lg:min-h-full bg-slate-900">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119985.45494451296!2d73.542284!3d19.932824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdd92994e772421%3A0xb36340984da0e8e6!2sPahine%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              className="w-full h-full border-none min-h-[380px]"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="King's 99 Map Location"
            />
          </div>

        </div>

      </div>
    </section>
  );
}
