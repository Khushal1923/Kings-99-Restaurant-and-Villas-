// King's 99 - Production Default Data Store

export const DEFAULT_SITE_DATA = {
  lastUpdated: 1790930000000,
  settings: {
    resortName: "King's 99",
    tagline: "Royal Dam-View Dining & Luxury Villa Resort",
    subtitle: "Pahine, Nashik • Managed by SRS Paradise",
    whatsappNumber: "918308015907",
    phoneDisplay: "+91 83080 15907",
    email: "kings99resort@gmail.com",
    address: "Ghoti-Trimbakeshwar Highway, Near Pahine Village, Nashik, Maharashtra 422212",
    googleMapsUrl: "https://www.google.com/search?q=kings+99+restaurant",
    instagramUrl: "https://www.instagram.com/kings99official/",
    openingHours: "Mon - Sun: 9:00 AM - 11:30 PM",
    adminPassHash: "b4fe98f121d120a169b5066fc038676d910ee2a7522f281e22709e32ff009228", // Default: kings99@admin
    
    // Video & Ambient Sound Media
    restaurantHeroVideo: "https://assets.mixkit.co/videos/preview/mixkit-table-setting-at-a-luxury-restaurant-41484-large.mp4",
    restaurantHeroFallbackImg: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=80",
    restaurantAudioUrl: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=relaxing-lounge-113695.mp3",
    
    villaHeroVideo: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-luxury-hotel-resort-with-swimming-pools-41496-large.mp4",
    villaHeroFallbackImg: "assets/villas/villa1.jpg",
    villaAudioUrl: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=ambient-nature-relax-10904.mp3",

    restaurantReelUrl: "https://www.instagram.com/p/Dafg4qpAXRV/",
    villaReelUrl: "https://www.instagram.com/p/DdvLjn0CQ14/"
  },

  // Villa Accommodations with uploaded high-res photos
  villas: [
    {
      id: "villa-1",
      name: "The Royal Hillside Villa",
      tag: "Most Popular",
      price: 8500,
      priceUnit: "/ Night",
      guests: "Up to 8 Guests",
      bedrooms: "2 BHK Luxury Duplex",
      bathrooms: "2 Attached Baths",
      image: "assets/villas/villa1.jpg",
      gallery: [
        "assets/villas/villa1.jpg",
        "assets/villas/villa2.jpg",
        "assets/villas/villa3.jpg"
      ],
      description: "Nestled against the lush Pahine hills with panoramic dam vistas. Features modern architecture, red terracotta roofing, private lawn, and open-air sunset balcony.",
      amenities: ["Mountain & Dam Views", "Private Lawn & Patio", "Air Conditioned Bedrooms", "Smart TV & High Speed WiFi", "Terrace Sitting Area", "24/7 Caretaker & Room Service", "Bonfire & BBQ on Demand"]
    },
    {
      id: "villa-2",
      name: "King's Grand Mountain Estate",
      tag: "Spacious Group Stay",
      price: 12500,
      priceUnit: "/ Night",
      guests: "Up to 12-14 Guests",
      bedrooms: "3 BHK Grand Villa",
      bathrooms: "3 Attached Baths",
      image: "assets/villas/villa3.jpg",
      gallery: [
        "assets/villas/villa3.jpg",
        "assets/villas/villa1.jpg",
        "assets/villas/villa2.jpg"
      ],
      description: "Expansive luxury villa perfect for big families, celebrations, and corporate getaways. Enjoy private barbecue zones, outdoor gazebo, and pristine nature views.",
      amenities: ["Spacious Living & Dining Lounge", "Outdoor Gazebo & Garden", "Private Barbecue Setup", "Fully Equipped Kitchenette", "Dam Breeze Balconies", "Music System", "Generous Car Parking"]
    },
    {
      id: "villa-3",
      name: "Horizon Serenity Cottage",
      tag: "Couples & Small Families",
      price: 5500,
      priceUnit: "/ Night",
      guests: "Up to 4 Guests",
      bedrooms: "1 BHK Cozy Suite",
      bathrooms: "1 Luxury Bath",
      image: "assets/villas/villa2.jpg",
      gallery: [
        "assets/villas/villa2.jpg",
        "assets/villas/villa3.jpg"
      ],
      description: "Intimate mountain retreat designed for peaceful getaways. Wake up to misty hills, chirping birds, and tranquil dam breezes.",
      amenities: ["Hillside Morning View", "King Size Master Bed", "Work/Relax Lounge Desk", "Complimentary Breakfast", "Private Balcony", "Tea/Coffee Maker", "Room Dining Service"]
    }
  ],

  // Restaurant Menu Categories & Dishes with Pictures
  menuCategories: ["All", "Chef's Signatures", "Tandoor & Starters", "Royal Main Course", "Biryani & Rice", "Breads & Accompaniments", "Beverages & Mocktails", "Desserts"],

  menuItems: [
    {
      id: "dish-1",
      name: "King's Special Handi Chicken",
      category: "Chef's Signatures",
      price: 460,
      type: "nonveg",
      badge: "Signature Bestseller",
      description: "Slow-cooked tender chicken simmered in a rich clay pot with royal spices and aromatic roasted gravy.",
      image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "dish-2",
      name: "Pahine Special Mutton Sukka",
      category: "Chef's Signatures",
      price: 520,
      type: "nonveg",
      badge: "Chef Special",
      description: "Traditional Nashik style dry mutton roasted in freshly pounded coconut and Khandeshi spices.",
      image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "dish-3",
      name: "Shahi Paneer Lazeez",
      category: "Chef's Signatures",
      price: 360,
      type: "veg",
      badge: "Royal Special",
      description: "Melt-in-mouth cottage cheese cubes infused with cashew nut cream, cardamom, and saffron essence.",
      image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "dish-4",
      name: "Murgh Malai Tikka",
      category: "Tandoor & Starters",
      price: 390,
      type: "nonveg",
      badge: "Popular",
      description: "Boneless chicken marinated in hung curd, fresh cream, cheese, and mild fragrant spices, charcoal grilled.",
      image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "dish-5",
      name: "Tandoori Chicken (Half / Full)",
      category: "Tandoor & Starters",
      price: 340,
      type: "nonveg",
      badge: "Classic",
      description: "Authentic whole chicken marinated in Kashmiri red chilli yogurt and roasted in a traditional clay tandoor.",
      image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "dish-6",
      name: "Paneer Tikka Angaara",
      category: "Tandoor & Starters",
      price: 320,
      type: "veg",
      badge: "Spicy Delight",
      description: "Charcoal grilled paneer cubes marinated in fiery red spices, bell peppers, and fresh onions.",
      image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "dish-7",
      name: "Crispy Veg Crispy Salt & Pepper",
      category: "Tandoor & Starters",
      price: 260,
      type: "veg",
      badge: "Crunchy",
      description: "Batter fried garden vegetables tossed in oriental garlic sauces, spring onions, and roasted sesame.",
      image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "dish-8",
      name: "Chicken Pahadi Kebab",
      category: "Tandoor & Starters",
      price: 380,
      type: "nonveg",
      badge: "Fresh Mint",
      description: "Succulent chicken chunks seasoned with fresh mint, coriander, green chillies, and mountain herbs.",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "dish-9",
      name: "Butter Chicken (Murgh Makhani)",
      category: "Royal Main Course",
      price: 440,
      type: "nonveg",
      badge: "All-Time Fav",
      description: "Tandoori chicken pieces simmered in a velvet tomato, rich butter, and cashew nut gravy.",
      image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "dish-10",
      name: "Mutton Rogan Josh",
      category: "Royal Main Course",
      price: 540,
      type: "nonveg",
      badge: "Chef Special",
      description: "Kashmiri delicacy of tender mutton slow-cooked with ratan jot and aromatic whole spices.",
      image: "https://images.unsplash.com/photo-1545247181-516773cae754?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "dish-11",
      name: "Paneer Butter Masala",
      category: "Royal Main Course",
      price: 340,
      type: "veg",
      badge: "Popular",
      description: "Rich and creamy dish made of butter, paneer, onions, tomatoes, cashews, and delicate spices.",
      image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "dish-12",
      name: "Kaju Curry (White / Red Gravy)",
      category: "Royal Main Course",
      price: 380,
      type: "veg",
      badge: "Royal Treat",
      description: "Golden roasted cashews cooked in your choice of royal white Mughlai or spicy red tomato gravy.",
      image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "dish-13",
      name: "Dal Makhani Dum Pukht",
      category: "Royal Main Course",
      price: 280,
      type: "veg",
      badge: "Slow Cooked",
      description: "Black lentils and kidney beans slow-cooked overnight with fresh cream, butter, and mild spices.",
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "dish-14",
      name: "King's Special Dum Biryani (Chicken)",
      category: "Biryani & Rice",
      price: 420,
      type: "nonveg",
      badge: "Aromatic",
      description: "Long grain basmati rice layered with spiced marinated chicken, saffron, fried onions, and steamed in dum.",
      image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "dish-15",
      name: "Royal Mutton Dum Biryani",
      category: "Biryani & Rice",
      price: 520,
      type: "nonveg",
      badge: "Royal Classic",
      description: "Tender goat meat cooked with fragrant spices, kewra water, and long basmati rice on slow coal fire.",
      image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "dish-16",
      name: "Veg Hyderabadi Dum Biryani",
      category: "Biryani & Rice",
      price: 320,
      type: "veg",
      badge: "Rich Flavor",
      description: "Fresh farm vegetables, paneer, and aromatic basmati rice cooked with authentic Hyderabadi potli masala.",
      image: "https://images.unsplash.com/photo-1642821373181-696a54913e9a?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "dish-17",
      name: "Butter Garlic Naan",
      category: "Breads & Accompaniments",
      price: 70,
      type: "veg",
      badge: "Tandoor",
      description: "Fine flour flatbread topped with minced garlic, fresh coriander, and melted dairy butter.",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "dish-18",
      name: "Cheese Garlic Naan",
      category: "Breads & Accompaniments",
      price: 110,
      type: "veg",
      badge: "Cheesy",
      description: "Stuffed with melted mozzarella and cheddar, seasoned with roasted garlic and herbs.",
      image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "dish-19",
      name: "Blue Ocean Lagoon Mocktail",
      category: "Beverages & Mocktails",
      price: 180,
      type: "veg",
      badge: "Refreshing",
      description: "Sparkling curaçao syrup, fresh lime juice, crushed mint, and sparkling soda over crushed ice.",
      image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "dish-20",
      name: "Royal Mango Kesar Lassi",
      category: "Beverages & Mocktails",
      price: 140,
      type: "veg",
      badge: "Traditional",
      description: "Thick, creamy churned yogurt topped with saffron strands, pistachios, and mango pulp.",
      image: "https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "dish-21",
      name: "Cold Coffee with Vanilla Ice Cream",
      category: "Beverages & Mocktails",
      price: 160,
      type: "veg",
      badge: "Chill",
      description: "Rich blended espresso milk topped with a generous scoop of artisanal vanilla ice cream.",
      image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "dish-22",
      name: "Sizzling Brownie with Hot Fudge",
      category: "Desserts",
      price: 230,
      type: "veg",
      badge: "Heavenly",
      description: "Warm walnut fudge brownie served on a smoking hot sizzler plate with vanilla ice cream and chocolate drizzle.",
      image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "dish-23",
      name: "Gulab Jamun with Rich Rabdi",
      category: "Desserts",
      price: 170,
      type: "veg",
      badge: "Sweet Indulgence",
      description: "Warm golden khoya jamuns served over chilled, slow-reduced cardamom rabdi.",
      image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80"
    }
  ],

  // Dedicated Gallery Photos for Restaurant & Villas
  gallery: [
    // --- RESTAURANT GALLERY ---
    {
      id: "gal-rest-1",
      title: "Royal Open-Air Dam View Dining Deck",
      category: "restaurant",
      tag: "Dam View & Ambiance",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "gal-rest-2",
      title: "King's Special Handi Chicken Feast",
      category: "restaurant",
      tag: "Chef Specials & Dishes",
      image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "gal-rest-3",
      title: "Smoky Charcoal Tandoori Platter",
      category: "restaurant",
      tag: "Chef Specials & Dishes",
      image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "gal-rest-4",
      title: "Evening Dam Sunset Ambiance & Dining",
      category: "restaurant",
      tag: "Dam View & Ambiance",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "gal-rest-5",
      title: "Handcrafted Refreshing Mocktails & Drinks",
      category: "restaurant",
      tag: "Mocktails & Drinks",
      image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "gal-rest-6",
      title: "Shahi Paneer Lazeez with Butter Naan",
      category: "restaurant",
      tag: "Chef Specials & Dishes",
      image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "gal-rest-7",
      title: "Candlelit Evening Tables by the Waters",
      category: "restaurant",
      tag: "Dam View & Ambiance",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "gal-rest-8",
      title: "Sizzling Hot Fudge Walnut Brownie",
      category: "restaurant",
      tag: "Chef Specials & Dishes",
      image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80"
    },

    // --- VILLA GALLERY ---
    {
      id: "gal-villa-1",
      title: "The Royal Hillside Villa & Terrace",
      category: "villas",
      tag: "Villa Lawns & Exterior",
      image: "assets/villas/villa1.jpg"
    },
    {
      id: "gal-villa-2",
      title: "Horizon Serenity Cottage & Balcony",
      category: "villas",
      tag: "Villa Lawns & Exterior",
      image: "assets/villas/villa2.jpg"
    },
    {
      id: "gal-villa-3",
      title: "King's Grand Mountain Estate & Lawn",
      category: "villas",
      tag: "Villa Lawns & Exterior",
      image: "assets/villas/villa3.jpg"
    },
    {
      id: "gal-villa-4",
      title: "Panoramic Hillside & Dam Sunrise View",
      category: "villas",
      tag: "Mountain & Dam Views",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "gal-villa-5",
      title: "Luxury Duplex Living Room & Lounge",
      category: "villas",
      tag: "Suites & Interiors",
      image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "gal-villa-6",
      title: "Private Evening Lawn & Bonfire Zone",
      category: "villas",
      tag: "Villa Lawns & Exterior",
      image: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "gal-villa-7",
      title: "Master Suite with Scenic Mountain Windows",
      category: "villas",
      tag: "Suites & Interiors",
      image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "gal-villa-8",
      title: "Lush Greenery & Morning Mist in Pahine",
      category: "villas",
      tag: "Mountain & Dam Views",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
    }
  ],

  // Google Verified Reviews
  reviews: [
    {
      name: "Rohit Deshmukh",
      rating: 5,
      date: "2 weeks ago",
      text: "The dam view dining is unreal! King's Special Handi chicken and Tandoori chicken are top notch. Excellent hospitality and peaceful atmosphere in Pahine.",
      source: "Google Review"
    },
    {
      name: "Priyanka Kulkarni",
      rating: 5,
      date: "1 month ago",
      text: "Stayed at the 3 BHK villa with family for the weekend. The mountain views from the balcony are breathtaking. Great service and food straight from the restaurant!",
      source: "Google Review"
    },
    {
      name: "Sameer Patel",
      rating: 5,
      date: "3 weeks ago",
      text: "Best highway spot between Ghoti and Trimbakeshwar. Fresh tasty food, clean luxurious rooms, and quick table booking through WhatsApp.",
      source: "Google Review"
    }
  ]
};
