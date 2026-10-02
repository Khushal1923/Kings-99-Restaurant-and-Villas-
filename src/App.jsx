import React from 'react';
import { SiteDataProvider, useSiteData } from './context/SiteDataContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ExperienceStrip from './components/ExperienceStrip';
import GallerySection from './components/GallerySection';
import ReelsSection from './components/ReelsSection';
import MenuSection from './components/MenuSection';
import VillasSection from './components/VillasSection';
import ReviewsSection from './components/ReviewsSection';
import LocationSection from './components/LocationSection';
import Footer from './components/Footer';
import ReservationModals from './components/ReservationModals';
import AudioPlayer from './components/AudioPlayer';
import AdminPortal from './components/AdminPortal';

function MainLayout() {
  const { activeHub } = useSiteData();
  const isRestaurant = activeHub === 'restaurant';

  return (
    <div className="min-h-screen bg-[#0B0F15] text-[#FAF8F5] selection:bg-gold selection:text-black">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section with Video/Image & Title */}
      <Hero />

      {/* Quick Highlights Strip */}
      <ExperienceStrip />

      {/* Photo Gallery */}
      <GallerySection />

      {/* Video Highlights & Instagram Reels (Glimpse of King's 99) */}
      <ReelsSection />

      {/* Contextual Hub Sections */}
      {isRestaurant ? (
        /* Restaurant Hub: Show Menu */
        <MenuSection />
      ) : (
        /* Villa Hub: Show Villas (Menu is removed from Villa page) */
        <VillasSection />
      )}

      {/* Verified Google Reviews */}
      <ReviewsSection />

      {/* Location & Map */}
      <LocationSection />

      {/* Footer */}
      <Footer />

      {/* Interactive Audio Player with Equalizer */}
      <AudioPlayer />

      {/* Booking Modals & Floating WhatsApp */}
      <ReservationModals />

      {/* Hidden Secure Admin Dashboard (Ctrl+Shift+A) */}
      <AdminPortal />
    </div>
  );
}

export default function App() {
  return (
    <SiteDataProvider>
      <MainLayout />
    </SiteDataProvider>
  );
}
