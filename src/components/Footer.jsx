import React from 'react';
import { useSiteData } from '../context/SiteDataContext';
import { Instagram, MessageCircle, Phone, Search } from 'lucide-react';

export default function Footer() {
  const { siteData, openReservation, setIsAdminOpen } = useSiteData();

  return (
    <footer className="bg-[#070A0E] border-t border-white/5 pt-16 pb-8 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          
          {/* Brand Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="assets/logo.jpg"
                alt="Logo"
                className="w-10 h-10 rounded-lg object-cover border border-gold"
              />
              <div className="flex flex-col">
                <span className="font-serif font-bold text-lg text-white">KING'S 99</span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-gold font-semibold">Managed by SRS Paradise</span>
              </div>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed max-w-sm">
              The pinnacle of royal dam-view dining and mountain staycations in Pahine, Nashik. Experience unmatched royal hospitality.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-white font-bold text-base mb-4">Quick Links</h4>
            <ul className="flex flex-col gap-2.5 text-xs text-gray-400">
              <li><a href="#home" className="hover:text-gold transition-colors">Home Experience</a></li>
              <li><a href="#menu-section" className="hover:text-gold transition-colors">Menu & Delicacies</a></li>
              <li><a href="#villas-section" className="hover:text-gold transition-colors">Private Villas</a></li>
              <li><a href="#gallery-section" className="hover:text-gold transition-colors">Photo Gallery</a></li>
              <li><a href="#location-section" className="hover:text-gold transition-colors">Location & Route</a></li>
            </ul>
          </div>

          {/* Bookings */}
          <div>
            <h4 className="font-serif text-white font-bold text-base mb-4">Reservations</h4>
            <ul className="flex flex-col gap-2.5 text-xs text-gray-400">
              <li>
                <button onClick={() => openReservation('restaurant')} className="hover:text-gold text-left transition-colors">
                  Table Reservation
                </button>
              </li>
              <li>
                <button onClick={() => openReservation('villa')} className="hover:text-gold text-left transition-colors">
                  Villa Stay Booking
                </button>
              </li>
              <li>
                <a href={`https://wa.me/${siteData.settings.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
                  Direct WhatsApp Chat
                </a>
              </li>
              <li>
                <a href={`tel:${siteData.settings.phoneDisplay}`} className="hover:text-gold transition-colors">
                  Call Front Desk
                </a>
              </li>
            </ul>
          </div>

          {/* Social & Connect */}
          <div>
            <h4 className="font-serif text-white font-bold text-base mb-4">Connect With Us</h4>
            <p className="text-gray-400 text-xs mb-4">Follow our culinary journey and villa stories on social media.</p>
            <div className="flex items-center gap-2">
              <a
                href={siteData.settings.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-rose-600/20 border border-white/10 hover:border-rose-500/40 flex items-center justify-center text-gray-300 hover:text-rose-400 transition-all"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${siteData.settings.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-emerald-600/20 border border-white/10 hover:border-emerald-500/40 flex items-center justify-center text-gray-300 hover:text-emerald-400 transition-all"
                title="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={siteData.settings.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-gold/20 border border-white/10 hover:border-gold/40 flex items-center justify-center text-gray-300 hover:text-gold transition-all"
                title="Google Business"
              >
                <Search className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>
            © {new Date().getFullYear()} King's 99 Restaurant & Villa Resort. All rights reserved.
          </div>
          {/* Subtle secret trigger for owner/admin */}
          <div 
            onClick={() => setIsAdminOpen(true)}
            className="cursor-pointer text-[10px] text-gray-700 hover:text-gray-500 transition-colors"
            title="Admin Login (Ctrl+Shift+A)"
          >
            Owner Portal • SRS Paradise
          </div>
        </div>

      </div>
    </footer>
  );
}
