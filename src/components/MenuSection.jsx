import React, { useState, useMemo } from 'react';
import { useSiteData } from '../context/SiteDataContext';
import { Search, Utensils, Sparkles, MessageCircle } from 'lucide-react';

export default function MenuSection() {
  const { siteData } = useSiteData();
  const [activeCategory, setActiveCategory] = useState("All");
  const [dietFilter, setDietFilter] = useState("all"); // 'all', 'veg', 'nonveg'
  const [searchQuery, setSearchQuery] = useState("");

  const categories = siteData.menuCategories || ["All"];

  const filteredDishes = useMemo(() => {
    return siteData.menuItems.filter(dish => {
      const matchesCat = activeCategory === "All" || dish.category === activeCategory;
      const matchesDiet = dietFilter === "all" || dish.type === dietFilter;
      const matchesQuery = dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           (dish.description && dish.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
                           dish.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesDiet && matchesQuery;
    });
  }, [siteData.menuItems, activeCategory, dietFilter, searchQuery]);

  const handleOrderWhatsApp = (dish) => {
    const waNumber = siteData.settings.whatsappNumber;
    const msg = `👑 *KING'S 99 RESTAURANT - ORDER / INQUIRY*
━━━━━━━━━━━━━━━━━━━━
🍽️ *Dish:* ${dish.name}
💰 *Price:* ₹${dish.price}
📍 *Location:* King's 99, Pahine, Nashik

Hello, I would like to order / reserve a table with this dish. Please confirm availability!`;

    const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  return (
    <section id="menu-section" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs uppercase tracking-[0.2em] font-semibold mb-4">
            <Utensils className="w-3.5 h-3.5" /> Culinary Excellence
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight mb-4">
            The Royal <span className="bg-gradient-to-r from-gold-metallic via-gold to-gold-light bg-clip-text text-transparent">Menu Selection</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base font-light">
            Every recipe is freshly prepared with traditional spices, rich ghee, and authentic secret recipes.
          </p>
        </div>

        {/* Controls: Search, Dietary Filters & Categories */}
        <div className="flex flex-col gap-6 mb-12">
          
          {/* Search Bar + Dietary Switches */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-2xl mx-auto w-full bg-[#121822] p-2 pl-4 rounded-full border border-gold/20 shadow-xl">
            <div className="flex items-center gap-3 w-full">
              <Search className="w-4 h-4 text-gold shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dishes (e.g., Handi, Paneer, Biryani, Mojito)..."
                className="bg-transparent border-none text-white text-sm w-full outline-none placeholder-gray-500"
              />
            </div>

            {/* Diet Pills */}
            <div className="flex items-center gap-1.5 shrink-0 pr-1">
              <button
                onClick={() => setDietFilter('all')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  dietFilter === 'all' ? 'bg-gold text-black' : 'text-gray-400 hover:text-white bg-white/5'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setDietFilter('veg')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  dietFilter === 'veg' ? 'bg-emerald-500 text-white' : 'text-gray-400 hover:text-emerald-400 bg-white/5'
                }`}
              >
                🟢 Veg
              </button>
              <button
                onClick={() => setDietFilter('nonveg')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  dietFilter === 'nonveg' ? 'bg-rose-500 text-white' : 'text-gray-400 hover:text-rose-400 bg-white/5'
                }`}
              >
                🔴 Non-Veg
              </button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center justify-start lg:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-gold-metallic via-gold to-gold-dark text-black shadow-md shadow-gold/25 font-bold'
                    : 'bg-[#121822] text-gray-400 hover:text-white border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dishes Grid - Picture on every dish */}
        {filteredDishes.length === 0 ? (
          <div className="text-center py-16 bg-[#121822]/50 rounded-3xl border border-white/5">
            <Utensils className="w-12 h-12 text-gold mx-auto mb-3 opacity-50" />
            <h3 className="text-lg font-bold text-white">No matching delicacies found</h3>
            <p className="text-sm text-gray-400 mt-1">Try another search term or reset dietary filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDishes.map((dish) => (
              <div
                key={dish.id}
                className="group bg-[#121822] rounded-2xl border border-white/5 hover:border-gold/30 overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/60"
              >
                {/* Dish Photo */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80";
                    }}
                  />
                  {dish.badge && (
                    <span className="absolute top-3 left-3 bg-[#0B0F15]/90 border border-gold/30 text-gold-light text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-md">
                      {dish.badge}
                    </span>
                  )}
                  {/* Veg / Non-Veg Indicator */}
                  <div className="absolute top-3 right-3 w-5 h-5 bg-white rounded flex items-center justify-center shadow-md">
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        dish.type === 'veg' ? 'bg-emerald-500' : 'bg-rose-500'
                      }`}
                    />
                  </div>
                </div>

                {/* Dish Details */}
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-serif font-bold text-base text-white group-hover:text-gold-light transition-colors leading-snug">
                      {dish.name}
                    </h3>
                    <span className="text-gold font-bold text-base shrink-0">
                      ₹{dish.price}
                    </span>
                  </div>

                  <p className="text-gray-400 text-xs line-clamp-2 leading-relaxed mb-4 flex-grow">
                    {dish.description}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-white/5 mt-auto">
                    <span className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold">
                      {dish.category}
                    </span>

                    <button
                      onClick={() => handleOrderWhatsApp(dish)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-gold-light bg-gold/10 hover:bg-gold hover:text-black border border-gold/30 px-3 py-1.5 rounded-full transition-all"
                    >
                      <MessageCircle className="w-3.5 h-3.5" /> Order
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
