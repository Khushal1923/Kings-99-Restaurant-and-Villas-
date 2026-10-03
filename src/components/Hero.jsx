import React, { useRef, useEffect } from 'react';
import { useSiteData } from '../context/SiteDataContext';
import { Crown, Sparkles, MessageCircle, BookOpen, Home } from 'lucide-react';

export default function Hero() {
  const { activeHub, siteData, openReservation } = useSiteData();
  const videoRef = useRef(null);

  const isRestaurant = activeHub === 'restaurant';
  const mediaType = isRestaurant 
    ? (siteData.settings.restaurantHeroMediaType || (siteData.settings.restaurantHeroVideo ? 'video' : 'image'))
    : (siteData.settings.villaHeroMediaType || (siteData.settings.villaHeroVideo ? 'video' : 'image'));

  const videoSrc = isRestaurant 
    ? (siteData.settings.restaurantHeroVideo || '') 
    : (siteData.settings.villaHeroVideo || '');
  const posterImg = isRestaurant 
    ? (siteData.settings.restaurantHeroFallbackImg || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=80')
    : (siteData.settings.villaHeroFallbackImg || 'assets/villas/villa1.jpg');

  const showVideo = mediaType === 'video' && videoSrc && (
    videoSrc.endsWith('.mp4') || 
    videoSrc.endsWith('.webm') || 
    videoSrc.startsWith('data:video') || 
    videoSrc.startsWith('blob:') ||
    videoSrc.includes('mixkit.co') ||
    videoSrc.includes('pexels.com') ||
    videoSrc.includes('cloudinary.com')
  );

  useEffect(() => {
    if (showVideo && videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [activeHub, videoSrc, showVideo, mediaType]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-16">
      
      {/* Background Media Container */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {showVideo ? (
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={posterImg}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : (
          <img 
            src={posterImg} 
            alt="King's 99 Hero Background" 
            className="w-full h-full object-cover" 
          />
        )}

        {/* Luxury Vignette Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F15]/80 via-[#0B0F15]/50 to-[#0B0F15] z-1" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/15 border border-gold/30 text-gold-light text-xs uppercase tracking-[0.2em] font-semibold mb-6 backdrop-blur-md">
          {isRestaurant ? (
            <>
              <Crown className="w-3.5 h-3.5 text-gold" />
              <span>Royal Dam-View Destination</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Private Hillside Staycation</span>
            </>
          )}
        </div>

        {/* Title */}
        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-6">
          {isRestaurant ? (
            <>
              Experience Royal Flavors <br />
              <span className="bg-gradient-to-r from-gold-metallic via-gold to-gold-light bg-clip-text text-transparent">
                With Scenic Dam Views
              </span>
            </>
          ) : (
            <>
              Luxury Mountain Villas <br />
              <span className="bg-gradient-to-r from-emerald-300 via-emerald-400 to-teal-200 bg-clip-text text-transparent">
                Surrounded By Nature
              </span>
            </>
          )}
        </h1>

        {/* Subtitle */}
        <p className="text-gray-300 text-base sm:text-xl max-w-2xl mx-auto font-light leading-relaxed mb-10">
          {isRestaurant
            ? "Indulge in authentic handi curries, sizzling tandoor delicacies, and majestic mountain breezes in Pahine, Nashik."
            : "Wake up to misty hill views, cool dam breezes, private lawns, and serene hillside architecture in Pahine."}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => openReservation(activeHub)}
            className={`flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-xl hover:-translate-y-1 ${
              isRestaurant
                ? 'bg-gradient-to-r from-gold-metallic via-gold to-gold-dark text-black shadow-gold/30 hover:shadow-gold/50'
                : 'bg-gradient-to-r from-emerald-accent to-emerald-dark text-white shadow-emerald-accent/30 hover:shadow-emerald-accent/50'
            }`}
          >
            <MessageCircle className="w-5 h-5" />
            {isRestaurant ? "Book a Table via WhatsApp" : "Reserve Villa via WhatsApp"}
          </button>

          <a
            href={isRestaurant ? "#menu-section" : "#villas-section"}
            className="flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-gold/40 backdrop-blur-md transition-all duration-300"
          >
            {isRestaurant ? (
              <>
                <BookOpen className="w-4 h-4 text-gold" />
                Explore Menu
              </>
            ) : (
              <>
                <Home className="w-4 h-4 text-emerald-400" />
                Explore Villas
              </>
            )}
          </a>
        </div>
      </div>
    </section>
  );
}
