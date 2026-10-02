// King's 99 - Main Application Controller

let currentMode = "restaurant"; // 'restaurant' or 'villa'
let activeCategory = "All";
let activeDiet = "all"; // 'all', 'veg', 'nonveg'
let isAudioPlaying = false;
let siteData = getSiteData();

document.addEventListener("DOMContentLoaded", () => {
  siteData = getSiteData();
  
  // Initialize dynamic components
  initHeaderScroll();
  renderCategories();
  renderMenuItems();
  renderVillas();
  renderGallery();
  renderReviews();
  initDates();
  initAudio();
  initSecretAdminShortcut();

  // Update current year
  const yearEl = document.getElementById("currentYear");
  if (yearEl) yearEl.innerText = new Date().getFullYear();
});

// Scroll Effects
function initHeaderScroll() {
  const header = document.getElementById("header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

// Hub Mode Switching (Restaurant vs. Luxury Villas)
function switchHub(mode) {
  currentMode = mode;
  document.body.setAttribute("data-mode", mode);
  
  const restroBtn = document.getElementById("hubBtnRestaurant");
  const villaBtn = document.getElementById("hubBtnVilla");
  const heroBadgeText = document.getElementById("heroBadgeText");
  const heroTitle = document.getElementById("heroTitle");
  const heroSubtitle = document.getElementById("heroSubtitle");
  const heroVideo = document.getElementById("heroVideo");
  const heroVideoSrc = document.getElementById("heroVideoSrc");
  const heroSecondaryBtn = document.getElementById("heroSecondaryBtn");
  const bgAudio = document.getElementById("bgAudio");

  if (mode === "restaurant") {
    restroBtn.classList.add("active");
    villaBtn.classList.remove("active");
    
    heroBadgeText.innerText = "Royal Dam-View Destination";
    heroTitle.innerHTML = `Experience Royal Flavors <br><span class="gold-text">With Scenic Dam Views</span>`;
    heroSubtitle.innerText = "Indulge in authentic handi curries, sizzling tandoor delicacies, and majestic mountain breezes in Pahine, Nashik.";
    
    heroSecondaryBtn.setAttribute("href", "#menu-section");
    heroSecondaryBtn.innerHTML = `<i class="fa-solid fa-book-open"></i> Explore Menu`;
    
    if (siteData.settings.restaurantHeroVideo) {
      heroVideoSrc.src = siteData.settings.restaurantHeroVideo;
      heroVideo.poster = siteData.settings.restaurantHeroFallbackImg || "";
      heroVideo.load();
      heroVideo.play().catch(() => {});
    }

    if (isAudioPlaying && siteData.settings.restaurantAudioUrl) {
      bgAudio.src = siteData.settings.restaurantAudioUrl;
      bgAudio.play().catch(() => {});
    }
  } else {
    villaBtn.classList.add("active");
    restroBtn.classList.remove("active");
    
    heroBadgeText.innerText = "Private Hillside Staycation";
    heroTitle.innerHTML = `Luxury Mountain Villas <br><span class="gold-text">Surrounded By Nature</span>`;
    heroSubtitle.innerText = "Wake up to misty hill views, cool dam breeze, private lawns, and serene hillside architecture in Pahine.";
    
    heroSecondaryBtn.setAttribute("href", "#villas-section");
    heroSecondaryBtn.innerHTML = `<i class="fa-solid fa-house"></i> View Villas`;

    if (siteData.settings.villaHeroVideo) {
      heroVideoSrc.src = siteData.settings.villaHeroVideo;
      heroVideo.poster = siteData.settings.villaHeroFallbackImg || "";
      heroVideo.load();
      heroVideo.play().catch(() => {});
    }

    if (isAudioPlaying && siteData.settings.villaAudioUrl) {
      bgAudio.src = siteData.settings.villaAudioUrl;
      bgAudio.play().catch(() => {});
    }
  }
}

// Background Ambient Audio Controller
function initAudio() {
  const bgAudio = document.getElementById("bgAudio");
  if (!bgAudio) return;
  bgAudio.src = siteData.settings.restaurantAudioUrl || "";
}

function toggleAudioPlayback() {
  const bgAudio = document.getElementById("bgAudio");
  const audioBadge = document.getElementById("audioController");
  const audioText = document.getElementById("audioStatusText");

  if (!bgAudio) return;

  if (isAudioPlaying) {
    bgAudio.pause();
    isAudioPlaying = false;
    audioBadge.classList.remove("playing");
    audioText.innerText = "Play Music 🎵";
  } else {
    const targetAudio = currentMode === "restaurant" 
      ? siteData.settings.restaurantAudioUrl 
      : siteData.settings.villaAudioUrl;
      
    if (bgAudio.src !== targetAudio) {
      bgAudio.src = targetAudio;
    }

    bgAudio.play().then(() => {
      isAudioPlaying = true;
      audioBadge.classList.add("playing");
      audioText.innerText = "Pause Music 🎶";
    }).catch(err => {
      console.warn("Autoplay blocked or audio load error", err);
    });
  }
}

// Render Menu Categories
function renderCategories() {
  const container = document.getElementById("categoryPillList");
  if (!container) return;

  const categories = siteData.menuCategories || ["All"];
  container.innerHTML = categories.map(cat => `
    <button class="category-pill ${cat === activeCategory ? 'active' : ''}" onclick="selectCategory('${cat}')">
      ${cat}
    </button>
  `).join("");
}

function selectCategory(cat) {
  activeCategory = cat;
  renderCategories();
  filterMenuItems();
}

function setDietFilter(type) {
  activeDiet = type;
  
  document.getElementById("dietBtnAll").className = `diet-btn ${type === 'all' ? 'active-all' : ''}`;
  document.getElementById("dietBtnVeg").className = `diet-btn ${type === 'veg' ? 'active-veg' : ''}`;
  document.getElementById("dietBtnNonveg").className = `diet-btn ${type === 'nonveg' ? 'active-nonveg' : ''}`;

  filterMenuItems();
}

// Render Menu Dishes (Every single dish has an image)
function renderMenuItems(items = null) {
  const grid = document.getElementById("menuGrid");
  if (!grid) return;

  const dishList = items || siteData.menuItems;

  if (dishList.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-muted);">
        <i class="fa-solid fa-bowl-rice" style="font-size: 2.5rem; color: var(--gold-primary); margin-bottom: 1rem;"></i>
        <h3>No matching delicacies found</h3>
        <p style="font-size: 0.9rem; margin-top: 0.5rem;">Try searching for another dish or reset dietary filters.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = dishList.map(dish => `
    <div class="dish-card">
      <div class="dish-img-wrapper">
        <img src="${dish.image}" alt="${dish.name}" class="dish-img" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80'">
        ${dish.badge ? `<span class="dish-badge-tag">${dish.badge}</span>` : ''}
        <div class="diet-indicator ${dish.type === 'veg' ? 'diet-veg' : 'diet-nonveg'}" title="${dish.type === 'veg' ? 'Vegetarian' : 'Non-Vegetarian'}">
          <div class="diet-dot"></div>
        </div>
      </div>
      
      <div class="dish-info">
        <div class="dish-title-row">
          <h3 class="dish-name">${dish.name}</h3>
          <span class="dish-price">₹${dish.price}</span>
        </div>
        <p class="dish-desc">${dish.description || ''}</p>
        <div class="dish-footer">
          <span class="dish-category-label">${dish.category}</span>
          <button class="dish-order-btn" onclick="orderDishWhatsApp('${dish.name.replace(/'/g, "\\'")}', ${dish.price})">
            <i class="fa-brands fa-whatsapp"></i> Order on WhatsApp
          </button>
        </div>
      </div>
    </div>
  `).join("");
}

function filterMenuItems() {
  const searchTerm = (document.getElementById("menuSearchInput")?.value || "").toLowerCase().trim();
  
  let filtered = siteData.menuItems.filter(item => {
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    const matchesDiet = activeDiet === "all" || item.type === activeDiet;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm) || 
                          (item.description && item.description.toLowerCase().includes(searchTerm)) ||
                          item.category.toLowerCase().includes(searchTerm);
    return matchesCategory && matchesDiet && matchesSearch;
  });

  renderMenuItems(filtered);
}

// Render Villas
function renderVillas() {
  const grid = document.getElementById("villaGrid");
  if (!grid) return;

  grid.innerHTML = siteData.villas.map(villa => `
    <div class="villa-card">
      <div class="villa-media-box">
        <img src="${villa.image}" alt="${villa.name}" class="villa-main-img" onerror="this.src='assets/villas/villa1.jpg'">
        ${villa.tag ? `<span class="villa-tag-pill">${villa.tag}</span>` : ''}
        <div class="villa-price-tag">₹${villa.price.toLocaleString()} <span style="font-size: 0.8rem; font-weight: normal; color: var(--text-muted);">${villa.priceUnit}</span></div>
      </div>

      <div class="villa-content">
        <h3 class="villa-title">${villa.name}</h3>
        
        <div class="villa-specs-bar">
          <div class="villa-spec-item"><i class="fa-solid fa-bed" style="color: var(--gold-primary);"></i> ${villa.bedrooms}</div>
          <div class="villa-spec-item"><i class="fa-solid fa-users" style="color: var(--gold-primary);"></i> ${villa.guests}</div>
          <div class="villa-spec-item"><i class="fa-solid fa-bath" style="color: var(--gold-primary);"></i> ${villa.bathrooms}</div>
        </div>

        <p class="villa-description">${villa.description}</p>

        <div class="villa-amenities-list">
          ${(villa.amenities || []).map(am => `<span class="amenity-chip"><i class="fa-solid fa-check" style="color: #4ade80; font-size: 0.7rem; margin-right: 3px;"></i> ${am}</span>`).join('')}
        </div>

        <div class="villa-btn-row">
          <button class="btn btn-emerald btn-sm" onclick="openVillaBookingModal('${villa.name.replace(/'/g, "\\'")}')">
            <i class="fa-brands fa-whatsapp"></i> Book Stay
          </button>
          <a href="https://wa.me/${siteData.settings.whatsappNumber}?text=${encodeURIComponent(`Hello King's 99, I'd like to check availability for ${villa.name}.`)}" target="_blank" class="btn btn-outline btn-sm">
            <i class="fa-regular fa-calendar-check"></i> Inquire Dates
          </a>
        </div>
      </div>
    </div>
  `).join("");
}

// Render Photo Gallery
function renderGallery(filter = "all") {
  const grid = document.getElementById("galleryGrid");
  if (!grid) return;

  const items = siteData.gallery.filter(item => filter === "all" || item.category === filter);

  grid.innerHTML = items.map(item => `
    <div class="gallery-item">
      <img src="${item.image}" alt="${item.title}" loading="lazy">
      <div class="gallery-item-overlay">
        <div class="gallery-item-title">${item.title}</div>
      </div>
    </div>
  `).join("");
}

function filterGallery(category) {
  document.getElementById("galBtnAll").className = `diet-btn ${category === 'all' ? 'active-all' : ''}`;
  document.getElementById("galBtnVillas").className = `diet-btn ${category === 'villas' ? 'active-all' : ''}`;
  document.getElementById("galBtnRestro").className = `diet-btn ${category === 'restaurant' ? 'active-all' : ''}`;
  renderGallery(category);
}

// Render Google Reviews
function renderReviews() {
  const grid = document.getElementById("reviewsGrid");
  if (!grid) return;

  grid.innerHTML = siteData.reviews.map(rev => `
    <div class="review-card">
      <div class="review-stars">
        ${'★'.repeat(rev.rating)}${'☆'.repeat(5 - rev.rating)}
      </div>
      <p class="review-text">"${rev.text}"</p>
      <div class="review-author-row">
        <div>
          <div class="review-name">${rev.name}</div>
          <span style="font-size: 0.75rem; color: var(--text-dim);">${rev.date}</span>
        </div>
        <div class="review-source"><i class="fa-brands fa-google"></i> ${rev.source}</div>
      </div>
    </div>
  `).join("");
}

// Modal Handlers
function openReservationModal(preferredMode = null) {
  const targetMode = preferredMode || currentMode;
  if (targetMode === "villa") {
    openModal("villaModal");
  } else {
    openModal("restaurantModal");
  }
}

function openVillaBookingModal(villaName) {
  const select = document.getElementById("villaSelect");
  if (select && villaName) {
    // try to match option or add value
    let found = false;
    for (let opt of select.options) {
      if (opt.text.toLowerCase().includes(villaName.toLowerCase())) {
        opt.selected = true;
        found = true;
        break;
      }
    }
    if (!found) {
      select.value = select.options[0].value;
    }
  }
  openModal("villaModal");
}

function openModal(id) {
  document.getElementById(id)?.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal(id) {
  document.getElementById(id)?.classList.remove("open");
  document.body.style.overflow = "auto";
}

// Close modals on clicking overlay backdrop
window.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal-overlay")) {
    e.target.classList.remove("open");
    document.body.style.overflow = "auto";
  }
});

// Initialize Date Defaults (Tomorrow / Next Day)
function initDates() {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfter = new Date(today);
  dayAfter.setDate(dayAfter.getDate() + 2);

  const formatDate = d => d.toISOString().split('T')[0];

  const resDate = document.getElementById("resDate");
  const villaIn = document.getElementById("villaCheckIn");
  const villaOut = document.getElementById("villaCheckOut");

  if (resDate) {
    resDate.min = formatDate(today);
    resDate.value = formatDate(today);
  }
  if (villaIn) {
    villaIn.min = formatDate(today);
    villaIn.value = formatDate(tomorrow);
  }
  if (villaOut) {
    villaOut.min = formatDate(tomorrow);
    villaOut.value = formatDate(dayAfter);
  }
}

// Handle Direct Dish Ordering via WhatsApp
function orderDishWhatsApp(dishName, price) {
  const waNum = siteData.settings.whatsappNumber;
  const msg = `👑 *KING'S 99 RESTAURANT - ORDER / INQUIRY*
━━━━━━━━━━━━━━━━━━━━
🍽️ *Dish:* ${dishName}
💰 *Price:* ₹${price}
📍 *Location:* King's 99, Pahine, Nashik

Hello, I would like to order / reserve a table with this dish. Please confirm availability!`;

  const waUrl = `https://wa.me/${waNum}?text=${encodeURIComponent(msg)}`;
  window.open(waUrl, "_blank");
}

// Handle Table Reservation Submit -> WhatsApp
function handleTableReservationSubmit(e) {
  e.preventDefault();
  const name = document.getElementById("resName").value.trim();
  const phone = document.getElementById("resPhone").value.trim();
  const guests = document.getElementById("resGuests").value;
  const date = document.getElementById("resDate").value;
  const time = document.getElementById("resTime").value;
  const seating = document.getElementById("resSeating").value;
  const notes = document.getElementById("resNotes").value.trim();

  const msg = `👑 *KING'S 99 - TABLE RESERVATION CONFIRMATION*
━━━━━━━━━━━━━━━━━━━━
👤 *Guest Name:* ${name}
📞 *Contact Phone:* ${phone}
👥 *Guests:* ${guests}
📅 *Date:* ${date}
⏰ *Time Slot:* ${time}
📍 *Seating Preference:* ${seating}
${notes ? `📝 *Special Notes:* ${notes}\n` : ''}━━━━━━━━━━━━━━━━━━━━
Please confirm our royal dining table reservation. Thank you!`;

  const waUrl = `https://wa.me/${siteData.settings.whatsappNumber}?text=${encodeURIComponent(msg)}`;
  closeModal("restaurantModal");
  window.open(waUrl, "_blank");
}

// Handle Villa Stay Booking Submit -> WhatsApp
function handleVillaBookingSubmit(e) {
  e.preventDefault();
  const name = document.getElementById("villaName").value.trim();
  const phone = document.getElementById("villaPhone").value.trim();
  const villa = document.getElementById("villaSelect").value;
  const checkIn = document.getElementById("villaCheckIn").value;
  const checkOut = document.getElementById("villaCheckOut").value;
  const guests = document.getElementById("villaGuests").value;
  const addons = document.getElementById("villaAddons").value;
  const notes = document.getElementById("villaNotes").value.trim();

  const msg = `🏡 *KING'S 99 VILLAS - STAY BOOKING INQUIRY*
━━━━━━━━━━━━━━━━━━━━
👤 *Guest Name:* ${name}
📞 *Phone Number:* ${phone}
🏡 *Selected Villa:* ${villa}
📅 *Check-In:* ${checkIn}
📅 *Check-Out:* ${checkOut}
👥 *Total Guests:* ${guests}
✨ *Package/Add-on:* ${addons}
${notes ? `📝 *Special Requests:* ${notes}\n` : ''}━━━━━━━━━━━━━━━━━━━━
Please share the booking confirmation & payment details for our stay.`;

  const waUrl = `https://wa.me/${siteData.settings.whatsappNumber}?text=${encodeURIComponent(msg)}`;
  closeModal("villaModal");
  window.open(waUrl, "_blank");
}

// Mobile Menu Toggle
function toggleMobileMenu() {
  document.getElementById("navMenu")?.classList.toggle("open");
}
function closeMobileMenu() {
  document.getElementById("navMenu")?.classList.remove("open");
}

// Secret Shortcut for Admin Panel (Ctrl + Shift + A or Cmd + Shift + A)
function initSecretAdminShortcut() {
  window.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
      e.preventDefault();
      window.location.href = "admin.html";
    }
  });
}
