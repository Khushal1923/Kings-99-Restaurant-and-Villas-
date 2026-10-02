import React from 'react';
import { Mountain, Flame, Hotel, MessageSquare } from 'lucide-react';

export default function ExperienceStrip() {
  const highlights = [
    {
      icon: <Mountain className="w-6 h-6 text-gold" />,
      title: "Scenic Dam & Hills",
      desc: "Prime panoramic dining deck in Pahine"
    },
    {
      icon: <Flame className="w-6 h-6 text-gold" />,
      title: "Authentic Handi & Tandoor",
      desc: "Prepared fresh with traditional spices"
    },
    {
      icon: <Hotel className="w-6 h-6 text-emerald-400" />,
      title: "Hillside Luxury Villas",
      desc: "Private 2 & 3 BHK stays with gardens"
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-gold" />,
      title: "Instant WhatsApp Booking",
      desc: "Direct confirmation in seconds"
    }
  ];

  return (
    <section className="relative z-20 -mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-[#121822]/95 border border-gold/20 rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-2xl shadow-black/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {highlights.map((item, idx) => (
          <div key={idx} className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0">
              {item.icon}
            </div>
            <div>
              <h4 className="text-white font-bold text-sm sm:text-base leading-snug">{item.title}</h4>
              <p className="text-gray-400 text-xs mt-0.5">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
