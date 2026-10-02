// King's 99 - Admin Dashboard Logic

let currentAdminData = null;

document.addEventListener("DOMContentLoaded", () => {
  currentAdminData = getSiteData();
  checkAdminSession();
});

// Admin Authentication Check
function checkAdminSession() {
  const isAuth = sessionStorage.getItem("kings99_admin_auth");
  const authScreen = document.getElementById("authScreen");
  const dashboard = document.getElementById("dashboardLayout");

  if (isAuth === "true") {
    authScreen.style.display = "none";
    dashboard.classList.add("active");
    loadAllAdminValues();
  } else {
    authScreen.style.display = "flex";
    dashboard.classList.remove("active");
  }
}

function handleAdminLogin(e) {
  e.preventDefault();
  const enteredPass = document.getElementById("adminPassInput").value.trim();
  const correctPass = currentAdminData.settings.adminPasscode || "kings99@admin";

  if (enteredPass === correctPass) {
    sessionStorage.setItem("kings99_admin_auth", "true");
    document.getElementById("authError").style.display = "none";
    checkAdminSession();
  } else {
    document.getElementById("authError").style.display = "block";
  }
}

function handleAdminLogout() {
  sessionStorage.removeItem("kings99_admin_auth");
  window.location.reload();
}

// Navigation between Admin Tabs
function switchAdminTab(tabId, el) {
  document.querySelectorAll(".tab-pane").forEach(pane => pane.classList.remove("active"));
  document.querySelectorAll(".sidebar-link").forEach(link => link.classList.remove("active"));
  
  document.getElementById(tabId)?.classList.add("active");
  if (el) el.classList.add("active");

  const titles = {
    heroTab: "Hero Videos & Background Music",
    villasTab: "Manage Mountain Villas & Photos",
    menuTab: "Menu Dishes & Food Photography",
    galleryTab: "Curated Photo Gallery",
    settingsTab: "WhatsApp & General Settings",
    backupTab: "Data Backup & Restore"
  };
  document.getElementById("pageTitle").innerText = titles[tabId] || "Admin Dashboard";
}

// Load Values into Admin Fields
function loadAllAdminValues() {
  const s = currentAdminData.settings;

  // Media
  document.getElementById("admRestroVideo").value = s.restaurantHeroVideo || "";
  document.getElementById("admRestroAudio").value = s.restaurantAudioUrl || "";
  document.getElementById("admRestroPoster").value = s.restaurantHeroFallbackImg || "";

  document.getElementById("admVillaVideo").value = s.villaHeroVideo || "";
  document.getElementById("admVillaAudio").value = s.villaAudioUrl || "";
  document.getElementById("admVillaPoster").value = s.villaHeroFallbackImg || "";

  document.getElementById("admVillaReel").value = s.villaReelUrl || "";
  document.getElementById("admRestroReel").value = s.restaurantReelUrl || "";

  // Contact / WhatsApp
  document.getElementById("admWaNumber").value = s.whatsappNumber || "918308015907";
  document.getElementById("admPhoneDisplay").value = s.phoneDisplay || "+91 83080 15907";
  document.getElementById("admInstaUrl").value = s.instagramUrl || "";
  document.getElementById("admGoogleUrl").value = s.googleMapsUrl || "";
  document.getElementById("admAddress").value = s.address || "";
  document.getElementById("admPasscode").value = s.adminPasscode || "kings99@admin";

  // Render items
  renderAdminVillas();
  renderAdminDishes();
  renderAdminGallery();
}

// Universal File to Base64 Uploader (Zero Database)
function handleFileUpload(input, targetInputId, previewImgId = null) {
  if (input.files && input.files[0]) {
    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      const dataUrl = e.target.result;
      const targetInput = document.getElementById(targetInputId);
      if (targetInput) targetInput.value = dataUrl;

      if (previewImgId) {
        const previewEl = document.getElementById(previewImgId);
        if (previewEl) previewEl.src = dataUrl;
      }
      showToast("Photo uploaded & ready!");
    };

    reader.readAsDataURL(file);
  }
}

// Save Hero, Audio & General Settings
function saveAllChanges() {
  const s = currentAdminData.settings;

  s.restaurantHeroVideo = document.getElementById("admRestroVideo").value.trim();
  s.restaurantAudioUrl = document.getElementById("admRestroAudio").value.trim();
  s.restaurantHeroFallbackImg = document.getElementById("admRestroPoster").value.trim();

  s.villaHeroVideo = document.getElementById("admVillaVideo").value.trim();
  s.villaAudioUrl = document.getElementById("admVillaAudio").value.trim();
  s.villaHeroFallbackImg = document.getElementById("admVillaPoster").value.trim();

  s.villaReelUrl = document.getElementById("admVillaReel").value.trim();
  s.restaurantReelUrl = document.getElementById("admRestroReel").value.trim();

  s.whatsappNumber = document.getElementById("admWaNumber").value.trim();
  s.phoneDisplay = document.getElementById("admPhoneDisplay").value.trim();
  s.instagramUrl = document.getElementById("admInstaUrl").value.trim();
  s.googleMapsUrl = document.getElementById("admGoogleUrl").value.trim();
  s.address = document.getElementById("admAddress").value.trim();
  s.adminPasscode = document.getElementById("admPasscode").value.trim() || "kings99@admin";

  saveSiteData(currentAdminData);
  showToast("All settings saved successfully!");
}

// Toast Feedback
function showToast(msg) {
  const toast = document.getElementById("adminToast");
  toast.innerText = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}

// ==========================================
// VILLAS MANAGEMENT
// ==========================================
function renderAdminVillas() {
  const grid = document.getElementById("adminVillasGrid");
  if (!grid) return;

  grid.innerHTML = currentAdminData.villas.map(v => `
    <div class="admin-item-card">
      <img src="${v.image}" alt="${v.name}" class="admin-item-img">
      <div class="admin-item-body">
        <h4 style="color: #fff; font-size: 1.1rem;">${v.name}</h4>
        <div style="font-size: 0.85rem; color: var(--admin-gold); font-weight: 700;">₹${v.price} ${v.priceUnit}</div>
        <p style="font-size: 0.8rem; color: var(--admin-muted);">${v.bedrooms} • ${v.guests}</p>
        <div class="admin-item-actions">
          <button class="btn-admin btn-admin-gold" onclick="openEditVillaModal('${v.id}')">
            <i class="fa-solid fa-pen-to-square"></i> Edit
          </button>
          <button class="btn-admin btn-admin-red" onclick="deleteVilla('${v.id}')">
            <i class="fa-solid fa-trash"></i> Delete
          </button>
        </div>
      </div>
    </div>
  `).join("");
}

function openAddVillaModal() {
  document.getElementById("villaModalTitle").innerText = "Add New Villa";
  document.getElementById("editVillaId").value = "";
  document.getElementById("villaEditName").value = "";
  document.getElementById("villaEditPrice").value = "";
  document.getElementById("villaEditTag").value = "";
  document.getElementById("villaEditBeds").value = "2 BHK Luxury Duplex";
  document.getElementById("villaEditGuests").value = "Up to 8 Guests";
  document.getElementById("villaEditBaths").value = "2 Attached Baths";
  document.getElementById("villaEditImg").value = "assets/villas/villa1.jpg";
  document.getElementById("villaPreviewThumb").src = "assets/villas/villa1.jpg";
  document.getElementById("villaEditDesc").value = "";
  
  document.getElementById("villaModalAdm").style.display = "flex";
}

function openEditVillaModal(id) {
  const villa = currentAdminData.villas.find(v => v.id === id);
  if (!villa) return;

  document.getElementById("villaModalTitle").innerText = "Edit Villa";
  document.getElementById("editVillaId").value = villa.id;
  document.getElementById("villaEditName").value = villa.name;
  document.getElementById("villaEditPrice").value = villa.price;
  document.getElementById("villaEditTag").value = villa.tag || "";
  document.getElementById("villaEditBeds").value = villa.bedrooms;
  document.getElementById("villaEditGuests").value = villa.guests;
  document.getElementById("villaEditBaths").value = villa.bathrooms;
  document.getElementById("villaEditImg").value = villa.image;
  document.getElementById("villaPreviewThumb").src = villa.image;
  document.getElementById("villaEditDesc").value = villa.description;

  document.getElementById("villaModalAdm").style.display = "flex";
}

function handleVillaSave(e) {
  e.preventDefault();
  const id = document.getElementById("editVillaId").value;
  const name = document.getElementById("villaEditName").value.trim();
  const price = parseInt(document.getElementById("villaEditPrice").value) || 0;
  const tag = document.getElementById("villaEditTag").value.trim();
  const beds = document.getElementById("villaEditBeds").value.trim();
  const guests = document.getElementById("villaEditGuests").value.trim();
  const baths = document.getElementById("villaEditBaths").value.trim();
  const image = document.getElementById("villaEditImg").value.trim();
  const desc = document.getElementById("villaEditDesc").value.trim();

  if (id) {
    const v = currentAdminData.villas.find(item => item.id === id);
    if (v) {
      v.name = name;
      v.price = price;
      v.tag = tag;
      v.bedrooms = beds;
      v.guests = guests;
      v.bathrooms = baths;
      v.image = image;
      v.description = desc;
    }
  } else {
    currentAdminData.villas.push({
      id: "villa-" + Date.now(),
      name,
      price,
      priceUnit: "/ Night",
      tag,
      bedrooms: beds,
      guests,
      bathrooms: baths,
      image,
      description: desc,
      amenities: ["Mountain View", "Private Lawn", "AC Rooms", "Free WiFi", "24/7 Caretaker"]
    });
  }

  saveSiteData(currentAdminData);
  renderAdminVillas();
  closeAdminModal("villaModalAdm");
  showToast("Villa saved successfully!");
}

function deleteVilla(id) {
  if (confirm("Are you sure you want to delete this villa?")) {
    currentAdminData.villas = currentAdminData.villas.filter(v => v.id !== id);
    saveSiteData(currentAdminData);
    renderAdminVillas();
    showToast("Villa removed!");
  }
}

// ==========================================
// MENU & DISHES MANAGEMENT (WITH PHOTOS)
// ==========================================
function renderAdminDishes() {
  const grid = document.getElementById("adminDishesGrid");
  if (!grid) return;

  const search = (document.getElementById("adminDishSearch")?.value || "").toLowerCase().trim();
  const dishes = currentAdminData.menuItems.filter(d => 
    d.name.toLowerCase().includes(search) || d.category.toLowerCase().includes(search)
  );

  grid.innerHTML = dishes.map(d => `
    <div class="admin-item-card">
      <img src="${d.image}" alt="${d.name}" class="admin-item-img">
      <div class="admin-item-body">
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <h4 style="color: #fff; font-size: 1rem;">${d.name}</h4>
          <span style="font-size: 0.95rem; color: var(--admin-gold); font-weight: 700;">₹${d.price}</span>
        </div>
        <div style="font-size: 0.78rem; color: var(--admin-muted);">
          ${d.type === 'veg' ? '🟢 Veg' : '🔴 Non-Veg'} • ${d.category}
        </div>
        <div class="admin-item-actions">
          <button class="btn-admin btn-admin-gold" onclick="openEditDishModal('${d.id}')">
            <i class="fa-solid fa-pen-to-square"></i> Edit
          </button>
          <button class="btn-admin btn-admin-red" onclick="deleteDish('${d.id}')">
            <i class="fa-solid fa-trash"></i> Delete
          </button>
        </div>
      </div>
    </div>
  `).join("");
}

function openAddDishModal() {
  document.getElementById("dishModalTitle").innerText = "Add New Dish";
  document.getElementById("editDishId").value = "";
  document.getElementById("dishEditName").value = "";
  document.getElementById("dishEditPrice").value = "";
  document.getElementById("dishEditBadge").value = "";
  document.getElementById("dishEditCategory").value = "Chef's Signatures";
  document.getElementById("dishEditType").value = "veg";
  document.getElementById("dishEditImg").value = "";
  document.getElementById("dishPreviewThumb").src = "";
  document.getElementById("dishEditDesc").value = "";
  
  document.getElementById("dishModal").style.display = "flex";
}

function openEditDishModal(id) {
  const dish = currentAdminData.menuItems.find(d => d.id === id);
  if (!dish) return;

  document.getElementById("dishModalTitle").innerText = "Edit Dish";
  document.getElementById("editDishId").value = dish.id;
  document.getElementById("dishEditName").value = dish.name;
  document.getElementById("dishEditPrice").value = dish.price;
  document.getElementById("dishEditBadge").value = dish.badge || "";
  document.getElementById("dishEditCategory").value = dish.category;
  document.getElementById("dishEditType").value = dish.type;
  document.getElementById("dishEditImg").value = dish.image;
  document.getElementById("dishPreviewThumb").src = dish.image;
  document.getElementById("dishEditDesc").value = dish.description || "";

  document.getElementById("dishModal").style.display = "flex";
}

function handleDishSave(e) {
  e.preventDefault();
  const id = document.getElementById("editDishId").value;
  const name = document.getElementById("dishEditName").value.trim();
  const price = parseInt(document.getElementById("dishEditPrice").value) || 0;
  const badge = document.getElementById("dishEditBadge").value.trim();
  const category = document.getElementById("dishEditCategory").value;
  const type = document.getElementById("dishEditType").value;
  const image = document.getElementById("dishEditImg").value.trim();
  const description = document.getElementById("dishEditDesc").value.trim();

  if (id) {
    const d = currentAdminData.menuItems.find(item => item.id === id);
    if (d) {
      d.name = name;
      d.price = price;
      d.badge = badge;
      d.category = category;
      d.type = type;
      d.image = image;
      d.description = description;
    }
  } else {
    currentAdminData.menuItems.push({
      id: "dish-" + Date.now(),
      name,
      price,
      badge,
      category,
      type,
      image,
      description
    });
  }

  saveSiteData(currentAdminData);
  renderAdminDishes();
  closeAdminModal("dishModal");
  showToast("Dish saved successfully!");
}

function deleteDish(id) {
  if (confirm("Delete this dish?")) {
    currentAdminData.menuItems = currentAdminData.menuItems.filter(d => d.id !== id);
    saveSiteData(currentAdminData);
    renderAdminDishes();
    showToast("Dish deleted!");
  }
}

// ==========================================
// PHOTO GALLERY MANAGEMENT
// ==========================================
function renderAdminGallery() {
  const grid = document.getElementById("adminGalleryGrid");
  if (!grid) return;

  grid.innerHTML = currentAdminData.gallery.map(g => `
    <div class="admin-item-card">
      <img src="${g.image}" alt="${g.title}" class="admin-item-img">
      <div class="admin-item-body">
        <h4 style="color: #fff; font-size: 0.95rem;">${g.title}</h4>
        <span style="font-size: 0.75rem; color: var(--admin-gold); text-transform: uppercase;">${g.category}</span>
        <div class="admin-item-actions">
          <button class="btn-admin btn-admin-red" onclick="deleteGalleryItem('${g.id}')">
            <i class="fa-solid fa-trash"></i> Remove Photo
          </button>
        </div>
      </div>
    </div>
  `).join("");
}

function openAddGalleryModal() {
  const title = prompt("Enter photo title / caption:");
  if (!title) return;
  const category = prompt("Enter category (villas or restaurant):", "villas");
  const imgUrl = prompt("Enter image URL (or upload via local files):", "assets/villas/villa1.jpg");
  
  if (title && imgUrl) {
    currentAdminData.gallery.push({
      id: "gal-" + Date.now(),
      title,
      category: category === "restaurant" ? "restaurant" : "villas",
      image: imgUrl
    });
    saveSiteData(currentAdminData);
    renderAdminGallery();
    showToast("Gallery photo added!");
  }
}

function deleteGalleryItem(id) {
  if (confirm("Remove this photo from gallery?")) {
    currentAdminData.gallery = currentAdminData.gallery.filter(g => g.id !== id);
    saveSiteData(currentAdminData);
    renderAdminGallery();
    showToast("Photo removed!");
  }
}

// ==========================================
// JSON BACKUP & RESTORE
// ==========================================
function exportDataJson() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(currentAdminData, null, 2));
  const downloadAnchor = document.createElement("a");
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", "kings99-site-data.json");
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
  showToast("Backup exported successfully!");
}

function importDataJson(input) {
  if (input.files && input.files[0]) {
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
      try {
        const imported = JSON.parse(e.target.result);
        if (imported && imported.settings) {
          currentAdminData = imported;
          saveSiteData(imported);
          loadAllAdminValues();
          showToast("Data imported successfully!");
        } else {
          alert("Invalid backup file structure.");
        }
      } catch (err) {
        alert("Error parsing JSON file: " + err.message);
      }
    };
    reader.readAsText(file);
  }
}

function resetToFactoryDefaults() {
  if (confirm("Reset everything to original default values? Custom edits will be cleared.")) {
    resetSiteData();
    currentAdminData = DEFAULT_DATA;
    loadAllAdminValues();
    showToast("Restored to factory defaults!");
  }
}

function closeAdminModal(id) {
  document.getElementById(id).style.display = "none";
}
