import React, { useState, useEffect } from 'react';
import { useSiteData } from '../context/SiteDataContext';
import { X, Utensils, Home, MessageCircle, Calendar, Users, Clock, MapPin } from 'lucide-react';
import { sanitizeText } from '../utils/security';

// Helper to format '2026-10-02' into '02 October 2026'
function formatReadableDate(dateStr) {
  if (!dateStr) return '';
  try {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
  } catch (e) {
    return dateStr;
  }
}

export default function ReservationModals() {
  const { modalState, closeReservation, siteData } = useSiteData();

  // Table form states
  const [tableName, setTableName] = useState('');
  const [tablePhone, setTablePhone] = useState('');
  const [tableGuests, setTableGuests] = useState('3–4 Guests (Family)');
  const [tableDate, setTableDate] = useState('');
  const [tableTime, setTableTime] = useState('7:30 PM (Dinner)');
  const [tableSeating, setTableSeating] = useState('Dam-View Outdoor Deck');
  const [tableNotes, setTableNotes] = useState('');

  // Villa form states
  const [villaName, setVillaName] = useState('');
  const [villaPhone, setVillaPhone] = useState('');
  const [selectedVilla, setSelectedVilla] = useState('The Royal Hillside Villa (2 BHK Duplex)');
  const [villaCheckIn, setVillaCheckIn] = useState('');
  const [villaCheckOut, setVillaCheckOut] = useState('');
  const [villaGuests, setVillaGuests] = useState('5–8 Guests');
  const [villaAddon, setVillaAddon] = useState('Standard Stay');
  const [villaNotes, setVillaNotes] = useState('');

  // Initialize dates
  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfter = new Date(today);
    dayAfter.setDate(dayAfter.getDate() + 2);

    const fmt = d => d.toISOString().split('T')[0];
    setTableDate(fmt(today));
    setVillaCheckIn(fmt(today));
    setVillaCheckOut(fmt(tomorrow));

    if (modalState.prefill) {
      setSelectedVilla(modalState.prefill);
    }
  }, [modalState.prefill]);

  if (!modalState.isOpen) return (
    /* Floating WhatsApp Button */
    <a
      href={`https://wa.me/${siteData.settings.whatsappNumber}?text=${encodeURIComponent("Hello King's 99, I'd like to make a reservation.")}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-40 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl shadow-emerald-500/50 hover:scale-110 hover:rotate-6 transition-all duration-300"
      title="Instant WhatsApp Booking"
    >
      <MessageCircle className="w-7 h-7 fill-current" />
    </a>
  );

  const isTable = modalState.type === 'restaurant';

  const handleTableSubmit = (e) => {
    e.preventDefault();
    const safeName = sanitizeText(tableName.trim());
    const safePhone = sanitizeText(tablePhone.trim());
    const safeNotes = sanitizeText(tableNotes.trim());
    const readableDate = formatReadableDate(tableDate);

    // Extract Meal & clean time
    let mealType = 'Dinner';
    let cleanTime = tableTime;
    if (tableTime.includes('Lunch')) {
      mealType = 'Lunch';
      cleanTime = tableTime.replace(' (Lunch)', '');
    } else if (tableTime.includes('Dinner')) {
      mealType = 'Dinner';
      cleanTime = tableTime.replace(' (Dinner)', '');
    }

    const msg = `🍽️ KING'S 99 – TABLE RESERVATION CONFIRMATION

━━━━━━━━━━━━━━━━━━━━
Guest Name: ${safeName}
Contact Phone: ${safePhone}
Guests: ${tableGuests}
Date: ${readableDate}
Time: ${cleanTime}
Meal: ${mealType}
Seating: ${tableSeating}
${safeNotes ? `Special Requests: ${safeNotes}\n` : ''}━━━━━━━━━━━━━━━━━━━━

Reservation Status: Confirmed

Thank you for choosing King's 99. We look forward to welcoming you!`;

    const url = `https://wa.me/${siteData.settings.whatsappNumber}?text=${encodeURIComponent(msg)}`;
    closeReservation();
    window.open(url, "_blank");
  };

  const handleVillaSubmit = (e) => {
    e.preventDefault();
    const safeName = sanitizeText(villaName.trim());
    const safePhone = sanitizeText(villaPhone.trim());
    const safeNotes = sanitizeText(villaNotes.trim());
    const readableIn = formatReadableDate(villaCheckIn);
    const readableOut = formatReadableDate(villaCheckOut);

    const msg = `🏡 KING'S 99 – VILLA STAY BOOKING INQUIRY

━━━━━━━━━━━━━━━━━━━━
Guest Name: ${safeName}
Contact Phone: ${safePhone}
Selected Villa: ${selectedVilla}
Check-In: ${readableIn}
Check-Out: ${readableOut}
Total Guests: ${villaGuests}
Package: ${villaAddon}
${safeNotes ? `Special Requests: ${safeNotes}\n` : ''}━━━━━━━━━━━━━━━━━━━━

Reservation Status: Pending Confirmation

Thank you for choosing King's 99. We look forward to welcoming you!`;

    const url = `https://wa.me/${siteData.settings.whatsappNumber}?text=${encodeURIComponent(msg)}`;
    closeReservation();
    window.open(url, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#121822] border border-gold/30 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={closeReservation}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isTable ? (
          /* TABLE RESERVATION FORM */
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold/10 text-gold text-xs font-semibold uppercase tracking-wider mb-3">
              <Utensils className="w-3.5 h-3.5" /> Table Reservation
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-1">
              Reserve Your <span className="text-gold">Royal Table</span>
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm mb-6">
              Instant booking confirmation sent directly to our restaurant front desk on WhatsApp.
            </p>

            <form onSubmit={handleTableSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gold-light mb-1.5">Guest Name *</label>
                <input
                  type="text"
                  required
                  value={tableName}
                  onChange={(e) => setTableName(e.target.value)}
                  placeholder="e.g. Khushal"
                  className="w-full bg-[#0A0E14] border border-gold/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gold-light mb-1.5">Contact Phone *</label>
                  <input
                    type="tel"
                    required
                    value={tablePhone}
                    onChange={(e) => setTablePhone(e.target.value)}
                    placeholder="e.g. 9284417770"
                    className="w-full bg-[#0A0E14] border border-gold/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gold-light mb-1.5">Guests Count *</label>
                  <select
                    value={tableGuests}
                    onChange={(e) => setTableGuests(e.target.value)}
                    className="w-full bg-[#0A0E14] border border-gold/20 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-gold"
                  >
                    <option value="2 Guests (Couple)">2 Guests (Couple)</option>
                    <option value="3–4 Guests (Family)">3–4 Guests (Family)</option>
                    <option value="5–8 Guests (Group)">5–8 Guests (Group)</option>
                    <option value="9+ Guests (Large Party)">9+ Guests (Large Party)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gold-light mb-1.5">Date *</label>
                  <input
                    type="date"
                    required
                    value={tableDate}
                    onChange={(e) => setTableDate(e.target.value)}
                    className="w-full bg-[#0A0E14] border border-gold/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gold-light mb-1.5">Time Slot *</label>
                  <select
                    value={tableTime}
                    onChange={(e) => setTableTime(e.target.value)}
                    className="w-full bg-[#0A0E14] border border-gold/20 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-gold"
                  >
                    <option value="1:00 PM (Lunch)">1:00 PM (Lunch)</option>
                    <option value="2:00 PM (Lunch)">2:00 PM (Lunch)</option>
                    <option value="7:30 PM (Dinner)">7:30 PM (Dinner)</option>
                    <option value="8:30 PM (Dinner)">8:30 PM (Dinner)</option>
                    <option value="9:30 PM (Dinner)">9:30 PM (Dinner)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gold-light mb-1.5">Seating Area</label>
                <select
                  value={tableSeating}
                  onChange={(e) => setTableSeating(e.target.value)}
                  className="w-full bg-[#0A0E14] border border-gold/20 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-gold"
                >
                  <option value="Dam-View Outdoor Deck">Dam-View Outdoor Deck</option>
                  <option value="Royal Family Dining Lounge">Royal Family Dining Lounge</option>
                  <option value="Candlelight Evening Table">Candlelight Evening Table</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gold-light mb-1.5">Special Requests (Optional)</label>
                <input
                  type="text"
                  value={tableNotes}
                  onChange={(e) => setTableNotes(e.target.value)}
                  placeholder="e.g. Birthday celebration, High chair"
                  className="w-full bg-[#0A0E14] border border-gold/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 flex items-center justify-center gap-2 bg-gradient-to-r from-gold-metallic via-gold to-gold-dark text-black font-bold uppercase tracking-wider py-3.5 rounded-xl shadow-lg shadow-gold/25 hover:scale-[1.02] transition-all"
              >
                <MessageCircle className="w-5 h-5" /> Confirm On WhatsApp
              </button>
            </form>
          </div>
        ) : (
          /* VILLA BOOKING FORM */
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-accent/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <Home className="w-3.5 h-3.5" /> Villa Stay Booking
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-1">
              Book A Luxury <span className="text-emerald-400">Mountain Villa</span>
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm mb-6">
              Check availability and lock dates with our resort manager directly on WhatsApp.
            </p>

            <form onSubmit={handleVillaSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-emerald-300 mb-1.5">Guest Name *</label>
                <input
                  type="text"
                  required
                  value={villaName}
                  onChange={(e) => setVillaName(e.target.value)}
                  placeholder="e.g. Anjali Mehta"
                  className="w-full bg-[#0A0E14] border border-emerald-accent/30 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-emerald-300 mb-1.5">Contact Phone *</label>
                  <input
                    type="tel"
                    required
                    value={villaPhone}
                    onChange={(e) => setVillaPhone(e.target.value)}
                    placeholder="e.g. 9284417770"
                    className="w-full bg-[#0A0E14] border border-emerald-accent/30 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-emerald-300 mb-1.5">Villa Category *</label>
                  <select
                    value={selectedVilla}
                    onChange={(e) => setSelectedVilla(e.target.value)}
                    className="w-full bg-[#0A0E14] border border-emerald-accent/30 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-400"
                  >
                    {siteData.villas.map(v => (
                      <option key={v.id} value={v.name}>{v.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-emerald-300 mb-1.5">Check-In *</label>
                  <input
                    type="date"
                    required
                    value={villaCheckIn}
                    onChange={(e) => setVillaCheckIn(e.target.value)}
                    className="w-full bg-[#0A0E14] border border-emerald-accent/30 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-emerald-300 mb-1.5">Check-Out *</label>
                  <input
                    type="date"
                    required
                    value={villaCheckOut}
                    onChange={(e) => setVillaCheckOut(e.target.value)}
                    className="w-full bg-[#0A0E14] border border-emerald-accent/30 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-emerald-300 mb-1.5">Total Guests *</label>
                  <select
                    value={villaGuests}
                    onChange={(e) => setVillaGuests(e.target.value)}
                    className="w-full bg-[#0A0E14] border border-emerald-accent/30 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-400"
                  >
                    <option value="2–4 Guests">2–4 Guests</option>
                    <option value="5–8 Guests">5–8 Guests</option>
                    <option value="9–12 Guests">9–12 Guests</option>
                    <option value="12+ Guests (Full Estate)">12+ Guests (Full Estate)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-emerald-300 mb-1.5">Package Add-on</label>
                  <select
                    value={villaAddon}
                    onChange={(e) => setVillaAddon(e.target.value)}
                    className="w-full bg-[#0A0E14] border border-emerald-accent/30 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-400"
                  >
                    <option value="Standard Stay">Standard Stay</option>
                    <option value="Stay + Bonfire & BBQ">Stay + Bonfire & BBQ</option>
                    <option value="Stay + All Meals Package">Stay + All Meals Package</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-emerald-300 mb-1.5">Special Requests (Optional)</label>
                <input
                  type="text"
                  value={villaNotes}
                  onChange={(e) => setVillaNotes(e.target.value)}
                  placeholder="e.g. Family holiday, extra mattress needed"
                  className="w-full bg-[#0A0E14] border border-emerald-accent/30 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-400"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-accent to-emerald-dark text-white font-bold uppercase tracking-wider py-3.5 rounded-xl shadow-lg shadow-emerald-accent/25 hover:scale-[1.02] transition-all"
              >
                <MessageCircle className="w-5 h-5" /> Send Villa Inquiry on WhatsApp
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
