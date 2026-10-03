import React, { useState, useEffect } from 'react';
import { useSiteData } from '../context/SiteDataContext';
import { Utensils, Home, Menu, X, MessageCircle } from 'lucide-react';

export default function Navbar() {
  const { activeHub, setActiveHub, openReservation, setIsAdminOpen } = useSiteData();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoTapCount, setLogoTapCount] = useState(0);

  const isRestaurant = activeHub === 'restaurant';

  // Secret 3-tap gesture on logo to open admin on mobile
  const handleLogoClick = (e) => {
    const nextCount = logoTapCount + 1;
    setLogoTapCount(nextCount);
    if (nextCount >= 3) {
      e.preventDefault();
      setIsAdminOpen(true);
      setLogoTapCount(0);
    }
    setTimeout(() => {
      setLogoTapCount(0);
    }, 1500);
  };

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-[#0B0F15]/95 backdrop-blur-md py-2.5 border-b border-gold/20 shadow-2xl shadow-black/50' 
        : 'bg-gradient-to-b from-[#0B0F15]/90 to-transparent py-3 sm:py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between">
          
          {/* Brand Logo & Name (Tap 3 times for Admin) */}
          <div 
            onClick={handleLogoClick}
            className="flex items-center gap-2.5 sm:gap-3 group cursor-pointer select-none"
          >
            <img 
              src="assets/logo.jpg" 
              alt="King's 99 Logo" 
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg object-cover border border-gold shadow-md shadow-gold/20 group-hover:scale-105 transition-transform" 
            />
            <div className="flex flex-col">
              <span className="font-serif font-bold text-lg sm:text-xl text-white tracking-wide flex items-center gap-1">
                KING'S 99
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-gold font-semibold">
                {isRestaurant ? "Royal Restaurant" : "Luxury Villas"}
              </span>
            </div>
          </div>

          {/* Dual Hub Switcher (Desktop Only) */}
          <div className="hidden md:flex items-center bg-black/40 border border-gold/20 rounded-full p-1 backdrop-blur-md">
            <button
              onClick={() => setActiveHub('restaurant')}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                isRestaurant
                  ? 'bg-gradient-to-r from-gold-metallic via-gold to-gold-dark text-black shadow-lg shadow-gold/30'
                  : 'text-gray-300 hover:text-gold-light'
              }`}
            >
              <Utensils className="w-3.5 h-3.5" />
              Restaurant
            </button>
            <button
              onClick={() => setActiveHub('villa')}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                !isRestaurant
                  ? 'bg-gradient-to-r from-emerald-accent to-emerald-dark text-white shadow-lg shadow-emerald-accent/30'
                  : 'text-gray-300 hover:text-emerald-400'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              Luxury Villas
            </button>
          </div>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-8">
            <a href="#home" className="text-sm font-medium text-gray-300 hover:text-gold-light transition-colors">Home</a>
            <a href="#gallery-section" className="text-sm font-medium text-gray-300 hover:text-gold-light transition-colors">Gallery</a>
            <a href="#reels-section" className="text-sm font-medium text-gray-300 hover:text-gold-light transition-colors">Videos</a>
            
            {isRestaurant ? (
              <a href="#menu-section" className="text-sm font-medium text-gray-300 hover:text-gold-light transition-colors">Menu</a>
            ) : (
              <a href="#villas-section" className="text-sm font-medium text-gray-300 hover:text-emerald-400 transition-colors">Villas</a>
            )}

            <a href="#location-section" className="text-sm font-medium text-gray-300 hover:text-gold-light transition-colors">Location</a>
          </nav>

          {/* CTA & Mobile Hamburger */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => openReservation(activeHub)}
              className={`hidden sm:inline-flex items-center gap-2 text-xs uppercase font-bold tracking-wider px-5 py-2.5 rounded-full shadow-md hover:-translate-y-0.5 transition-all ${
                isRestaurant 
                  ? 'bg-gradient-to-r from-gold-metallic via-gold to-gold-dark text-black shadow-gold/25' 
                  : 'bg-gradient-to-r from-emerald-accent to-emerald-dark text-white shadow-emerald-accent/25'
              }`}
            >
              <MessageCircle className="w-4 h-4" />
              {isRestaurant ? "Reserve Table" : "Book Villa"}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-300 hover:text-gold transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* PROMINENT MOBILE SWITCHER BAR (Directly Below Logo Bar on Mobile) */}
        <div className="md:hidden mt-2.5 pt-1 flex justify-center">
          <div className="w-full max-w-sm bg-[#121822]/95 border border-gold/30 rounded-2xl p-1 backdrop-blur-xl shadow-2xl grid grid-cols-2 gap-1.5">
            <button
              onClick={() => setActiveHub('restaurant')}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                isRestaurant
                  ? 'bg-gradient-to-r from-gold-metallic via-gold to-gold-dark text-black shadow-lg shadow-gold/30'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Utensils className="w-4 h-4" />
              Restaurant
            </button>
            <button
              onClick={() => setActiveHub('villa')}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                !isRestaurant
                  ? 'bg-gradient-to-r from-emerald-accent to-emerald-dark text-white shadow-lg shadow-emerald-accent/40'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Home className="w-4 h-4" />
              Villas
            </button>
          </div>
        </div>

      </div>

      {/* Mobile Hamburger Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0B0F15]/98 border-b border-gold/20 backdrop-blur-2xl px-6 py-6 transition-all duration-300 flex flex-col gap-4 mt-2">
          <a href="#home" onClick={() => setMobileMenuOpen(false)} className="text-gray-300 hover:text-gold py-1">Home</a>
          <a href="#gallery-section" onClick={() => setMobileMenuOpen(false)} className="text-gray-300 hover:text-gold py-1">Photo Gallery</a>
          <a href="#reels-section" onClick={() => setMobileMenuOpen(false)} className="text-gray-300 hover:text-gold py-1">Live Instagram Reels</a>

          {isRestaurant ? (
            <a href="#menu-section" onClick={() => setMobileMenuOpen(false)} className="text-gray-300 hover:text-gold py-1">Menu & Dishes</a>
          ) : (
            <a href="#villas-section" onClick={() => setMobileMenuOpen(false)} className="text-gray-300 hover:text-emerald-400 py-1">Luxury Villas</a>
          )}

          <a href="#location-section" onClick={() => setMobileMenuOpen(false)} className="text-gray-300 hover:text-gold py-1">Directions & Contact</a>

          <button
            onClick={() => { openReservation(activeHub); setMobileMenuOpen(false); }}
            className={`w-full mt-2 flex items-center justify-center gap-2 font-bold py-3 rounded-xl text-sm ${
              isRestaurant ? 'bg-gold text-black' : 'bg-emerald-accent text-white'
            }`}
          >
            <MessageCircle className="w-4 h-4" /> {isRestaurant ? "Reserve Table on WhatsApp" : "Book Villa on WhatsApp"}
          </button>
        </div>
      )}
    </header>
  );
}
