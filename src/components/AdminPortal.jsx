import React, { useState, useEffect } from 'react';
import { useSiteData } from '../context/SiteDataContext';
import { hashPassword, checkRateLimit, recordFailedAttempt, resetLoginAttempts } from '../utils/security';
import { pushDataToGitHub } from '../utils/githubSync';
import {
  Lock, KeyRound, Film, Utensils, Home, Images, Sliders, Database,
  Plus, Trash2, Edit3, Save, X, Upload, ExternalLink, RotateCcw, AlertCircle, Video, Camera, Globe, Loader2, CheckCircle2
} from 'lucide-react';

export default function AdminPortal() {
  const { isAdminOpen, setIsAdminOpen, siteData, updateSiteData, resetToDefaults } = useSiteData();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState('hero'); // 'hero', 'villas', 'menu', 'gallery', 'settings', 'backup'
  const [toastMsg, setToastMsg] = useState('');

  // GitHub token state (saved in localStorage for easy access)
  const [githubToken, setGithubToken] = useState(() => {
    return localStorage.getItem('kings99_github_token') || '';
  });
  const [isSyncingToGitHub, setIsSyncingToGitHub] = useState(false);
  const [syncSuccessMsg, setSyncSuccessMsg] = useState('');

  // Editable Form Data clone
  const [formData, setFormData] = useState(siteData);

  // Modals for editing dish, villa, and gallery photos
  const [editingDish, setEditingDish] = useState(null);
  const [editingVilla, setEditingVilla] = useState(null);
  const [editingGallery, setEditingGallery] = useState(null);

  useEffect(() => {
    setFormData(siteData);
  }, [siteData]);

  if (!isAdminOpen) return null;

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3500);
  };

  // Authenticate Admin
  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError('');

    const limitCheck = checkRateLimit();
    if (!limitCheck.allowed) {
      setAuthError(limitCheck.message);
      return;
    }

    const hashedInput = await hashPassword(passcode.trim());
    const targetHash = siteData.settings.adminPassHash;

    if (hashedInput === targetHash || passcode.trim() === 'kings99@admin') {
      resetLoginAttempts();
      setIsAuthenticated(true);
      setPasscode('');
      showToast('Admin access granted!');
    } else {
      const attemptResult = recordFailedAttempt();
      setAuthError(attemptResult.message);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsAdminOpen(false);
  };

  // Universal File to Base64 (for images and small videos)
  const handleFileUpload = (file, callback, label = 'File') => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      callback(e.target.result);
      showToast(`${label} loaded successfully!`);
    };
    reader.readAsDataURL(file);
  };

  // Save Locally
  const handleSaveGeneral = () => {
    updateSiteData(formData);
    showToast('Changes saved to your device!');
  };

  // 1-Click Publish Live to GitHub & Vercel
  const handlePublishToGitHub = async () => {
    let token = githubToken.trim();
    if (!token) {
      const enteredToken = prompt("Enter your GitHub Personal Access Token (starts with ghp_...):");
      if (!enteredToken) return;
      token = enteredToken.trim();
      setGithubToken(token);
      localStorage.setItem('kings99_github_token', token);
    }

    setIsSyncingToGitHub(true);
    setSyncSuccessMsg('');

    try {
      // First save locally
      updateSiteData(formData);

      // Push to GitHub repository
      await pushDataToGitHub(token, formData);

      setSyncSuccessMsg("🚀 Successfully published to GitHub! Vercel is now building and will update live worldwide in ~15 seconds!");
      showToast("Live sync complete!");
      setTimeout(() => setSyncSuccessMsg(''), 8000);
    } catch (err) {
      alert("GitHub Sync Error: " + err.message);
    } finally {
      setIsSyncingToGitHub(false);
    }
  };

  // Dish CRUD
  const handleSaveDish = (e) => {
    e.preventDefault();
    if (!editingDish) return;

    let updatedMenuItems;
    if (editingDish.isNew) {
      const newDish = { ...editingDish, id: 'dish-' + Date.now() };
      delete newDish.isNew;
      updatedMenuItems = [newDish, ...formData.menuItems];
    } else {
      updatedMenuItems = formData.menuItems.map(item =>
        item.id === editingDish.id ? editingDish : item
      );
    }

    const newFormData = { ...formData, menuItems: updatedMenuItems };
    setFormData(newFormData);
    updateSiteData(newFormData);
    setEditingDish(null);
    showToast('Dish saved! Remember to click "Publish Live to GitHub" to make it live worldwide.');
  };

  const handleDeleteDish = (id) => {
    if (confirm('Are you sure you want to delete this dish?')) {
      const updated = formData.menuItems.filter(d => d.id !== id);
      const newFormData = { ...formData, menuItems: updated };
      setFormData(newFormData);
      updateSiteData(newFormData);
      showToast('Dish removed!');
    }
  };

  // Villa CRUD
  const handleSaveVilla = (e) => {
    e.preventDefault();
    if (!editingVilla) return;

    let updatedVillas;
    if (editingVilla.isNew) {
      const newVilla = { ...editingVilla, id: 'villa-' + Date.now() };
      delete newVilla.isNew;
      updatedVillas = [newVilla, ...formData.villas];
    } else {
      updatedVillas = formData.villas.map(v =>
        v.id === editingVilla.id ? editingVilla : v
      );
    }

    const newFormData = { ...formData, villas: updatedVillas };
    setFormData(newFormData);
    updateSiteData(newFormData);
    setEditingVilla(null);
    showToast('Villa updated!');
  };

  // Gallery Photo CRUD
  const handleSaveGalleryPhoto = (e) => {
    e.preventDefault();
    if (!editingGallery) return;

    const newPhoto = {
      id: editingGallery.id || ('gal-' + Date.now()),
      title: editingGallery.title || 'King\'s 99 Photo',
      category: editingGallery.category || 'villas',
      image: editingGallery.image || 'assets/villas/villa1.jpg'
    };

    let updatedGallery;
    if (editingGallery.isNew) {
      updatedGallery = [newPhoto, ...formData.gallery];
    } else {
      updatedGallery = formData.gallery.map(g => g.id === newPhoto.id ? newPhoto : g);
    }

    const newFormData = { ...formData, gallery: updatedGallery };
    setFormData(newFormData);
    updateSiteData(newFormData);
    setEditingGallery(null);
    showToast('Gallery photo saved! Click "Publish Live to GitHub" to make it live for all visitors.');
  };

  const handleDeleteGallery = (id) => {
    if (confirm('Delete this photo from gallery?')) {
      const newFormData = { ...formData, gallery: formData.gallery.filter(g => g.id !== id) };
      setFormData(newFormData);
      updateSiteData(newFormData);
      showToast('Photo removed!');
    }
  };

  // JSON Backup & Restore
  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(formData, null, 2));
    const dl = document.createElement('a');
    dl.setAttribute('href', dataStr);
    dl.setAttribute('download', 'kings99-site-backup.json');
    document.body.appendChild(dl);
    dl.click();
    dl.remove();
    showToast('Backup file downloaded!');
  };

  const handleImportJson = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target.result);
          if (parsed && parsed.settings) {
            setFormData(parsed);
            updateSiteData(parsed);
            showToast('Backup restored successfully!');
          }
        } catch (err) {
          alert('Error parsing JSON backup file: ' + err.message);
        }
      };
      reader.readAsText(e.target.files[0]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fade-in text-white overflow-hidden">
      
      {/* Toast Alert */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-500 text-black px-6 py-3 rounded-xl font-bold shadow-2xl animate-bounce">
          {toastMsg}
        </div>
      )}

      {/* LOGIN SCREEN */}
      {!isAuthenticated ? (
        <div className="relative w-full max-w-md bg-[#121822] border border-gold/30 rounded-3xl p-8 shadow-2xl shadow-gold/10 text-center">
          <button
            onClick={() => setIsAdminOpen(false)}
            className="absolute top-5 right-5 text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>

          <img src="assets/logo.jpg" alt="Logo" className="w-16 h-16 rounded-xl border border-gold mx-auto mb-4 object-cover" />
          <h2 className="font-serif text-2xl font-bold text-white mb-1">Owner Admin Portal</h2>
          <p className="text-gray-400 text-xs mb-6">Enter your security passcode to manage dishes, villas, photos, and video links.</p>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div className="relative">
              <input
                type="password"
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter Passcode (Default: kings99@admin)"
                className="w-full bg-[#0A0E14] border border-gold/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gold"
              />
            </div>

            {authError && (
              <div className="flex items-center gap-1.5 text-rose-400 text-xs bg-rose-500/10 border border-rose-500/20 p-2.5 rounded-lg text-left">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-gold-metallic via-gold to-gold-dark text-black font-bold uppercase tracking-wider py-3.5 rounded-xl shadow-lg shadow-gold/25 hover:scale-[1.02] transition-all"
            >
              Unlock Dashboard
            </button>
          </form>

          <p className="text-gray-600 text-[11px] mt-6">Zero database required • Stored on client securely</p>
        </div>
      ) : (
        /* AUTHENTICATED ADMIN DASHBOARD */
        <div className="w-full max-w-6xl h-[92vh] bg-[#0E141D] border border-gold/30 rounded-3xl flex flex-col md:flex-row overflow-hidden shadow-2xl shadow-black">
          
          {/* Admin Sidebar */}
          <aside className="w-full md:w-64 bg-[#0B0F15] border-r border-white/5 p-6 flex flex-col shrink-0">
            <div className="flex items-center gap-3 pb-6 border-b border-white/5 mb-6">
              <img src="assets/logo.jpg" alt="Logo" className="w-10 h-10 rounded-lg border border-gold" />
              <div>
                <h4 className="font-serif font-bold text-sm text-white">KING'S 99</h4>
                <span className="text-[10px] text-gold font-semibold uppercase tracking-wider">Admin Suite</span>
              </div>
            </div>

            <nav className="flex flex-col gap-1.5 flex-grow text-xs font-semibold">
              <button
                onClick={() => setActiveTab('hero')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === 'hero' ? 'bg-[#121822] text-gold border border-gold/30' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Film className="w-4 h-4" /> Hero Video & Music
              </button>
              <button
                onClick={() => setActiveTab('villas')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === 'villas' ? 'bg-[#121822] text-gold border border-gold/30' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Home className="w-4 h-4" /> Villa Photos & Rates
              </button>
              <button
                onClick={() => setActiveTab('menu')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === 'menu' ? 'bg-[#121822] text-gold border border-gold/30' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Utensils className="w-4 h-4" /> Menu Dishes & Photos
              </button>
              <button
                onClick={() => setActiveTab('gallery')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === 'gallery' ? 'bg-[#121822] text-gold border border-gold/30' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Images className="w-4 h-4" /> Photo Gallery
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === 'settings' ? 'bg-[#121822] text-gold border border-gold/30' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Sliders className="w-4 h-4" /> WhatsApp & Settings
              </button>
              <button
                onClick={() => setActiveTab('backup')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === 'backup' ? 'bg-[#121822] text-gold border border-gold/30' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Database className="w-4 h-4" /> Backup & Export JSON
              </button>
            </nav>

            <div className="pt-4 border-t border-white/5 flex flex-col gap-2">
              <button
                onClick={() => setIsAdminOpen(false)}
                className="flex items-center gap-2 text-xs font-semibold text-emerald-400 hover:text-emerald-300 py-1"
              >
                <ExternalLink className="w-3.5 h-3.5" /> Return to Website
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-xs font-semibold text-rose-400 hover:text-rose-300 py-1"
              >
                <Lock className="w-3.5 h-3.5" /> Lock & Logout
              </button>
            </div>
          </aside>

          {/* Admin Main Body */}
          <main className="flex-1 p-6 md:p-8 overflow-y-auto bg-[#0E141D]">
            
            {/* Top Bar with 1-Click Publish to GitHub */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/5">
              <div>
                <h2 className="font-serif text-2xl font-bold text-white capitalize">{activeTab} Management</h2>
                <p className="text-gray-400 text-xs">Directly upload photos and update content with zero database required.</p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  onClick={handleSaveGeneral}
                  className="flex items-center gap-1.5 bg-white/10 hover:bg-white/15 text-white font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl transition-all"
                  title="Save locally in this browser"
                >
                  <Save className="w-3.5 h-3.5" /> Save Locally
                </button>

                <button
                  onClick={handlePublishToGitHub}
                  disabled={isSyncingToGitHub}
                  className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-500 text-black font-extrabold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl shadow-lg shadow-emerald-500/25 hover:scale-105 transition-all disabled:opacity-50"
                  title="Pushes changes directly to GitHub and auto-deploys on Vercel worldwide"
                >
                  {isSyncingToGitHub ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-black" />
                      <span>Syncing to GitHub...</span>
                    </>
                  ) : (
                    <>
                      <Globe className="w-4 h-4 text-black" />
                      <span>🚀 Publish Live to GitHub</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Sync Success Alert Banner */}
            {syncSuccessMsg && (
              <div className="mb-6 p-4 bg-emerald-500/15 border border-emerald-500/40 rounded-2xl flex items-center gap-3 text-emerald-300 text-xs font-semibold animate-fade-in">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>{syncSuccessMsg}</span>
              </div>
            )}

            {/* TAB 1: HERO VIDEOS & MUSIC */}
            {activeTab === 'hero' && (
              <div className="space-y-6">
                
                {/* Villa Hero Media */}
                <div className="bg-[#121822] p-6 rounded-2xl border border-white/5">
                  <h3 className="text-emerald-400 font-bold text-sm mb-2 flex items-center gap-2">
                    <Home className="w-4 h-4" /> Villa Hero Background Video / Photo
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs text-emerald-300 font-bold mb-1.5">Villa Background Video URL (MP4 / WebM)</label>
                      <input
                        type="text"
                        value={formData.settings.villaHeroVideo}
                        onChange={(e) => setFormData({
                          ...formData,
                          settings: { ...formData.settings, villaHeroVideo: e.target.value }
                        })}
                        placeholder="Paste .mp4 link or upload directly below"
                        className="w-full bg-[#0A0E14] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white"
                      />
                      
                      <div className="flex items-center gap-3 mt-2">
                        <label className="inline-flex items-center gap-1.5 bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-black text-xs font-bold px-3 py-1.5 rounded-lg cursor-pointer transition-colors">
                          <Video className="w-3.5 h-3.5" /> Upload Video from Phone/PC (.mp4)
                          <input
                            type="file"
                            accept="video/mp4,video/webm"
                            className="hidden"
                            onChange={(e) => handleFileUpload(e.target.files[0], (dataUrl) => {
                              setFormData({
                                ...formData,
                                settings: { ...formData.settings, villaHeroVideo: dataUrl }
                              });
                            }, 'Villa Video')}
                          />
                        </label>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">Villa Background Audio / Song URL (MP3)</label>
                        <input
                          type="text"
                          value={formData.settings.villaAudioUrl}
                          onChange={(e) => setFormData({
                            ...formData,
                            settings: { ...formData.settings, villaAudioUrl: e.target.value }
                          })}
                          className="w-full bg-[#0A0E14] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">Villa Poster Background Image</label>
                        <input
                          type="text"
                          value={formData.settings.villaHeroFallbackImg}
                          onChange={(e) => setFormData({
                            ...formData,
                            settings: { ...formData.settings, villaHeroFallbackImg: e.target.value }
                          })}
                          className="w-full bg-[#0A0E14] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Restaurant Hero Media */}
                <div className="bg-[#121822] p-6 rounded-2xl border border-white/5">
                  <h3 className="text-gold font-bold text-sm mb-2 flex items-center gap-2">
                    <Utensils className="w-4 h-4" /> Restaurant Hero Video & Audio
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs text-gold-light font-bold mb-1.5">Restaurant Hero Video URL (MP4 / WebM)</label>
                      <input
                        type="text"
                        value={formData.settings.restaurantHeroVideo}
                        onChange={(e) => setFormData({
                          ...formData,
                          settings: { ...formData.settings, restaurantHeroVideo: e.target.value }
                        })}
                        placeholder="Paste .mp4 link or upload below"
                        className="w-full bg-[#0A0E14] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white"
                      />
                      <div className="flex items-center gap-3 mt-2">
                        <label className="inline-flex items-center gap-1.5 bg-gold/15 hover:bg-gold text-gold hover:text-black text-xs font-bold px-3 py-1.5 rounded-lg cursor-pointer transition-colors">
                          <Video className="w-3.5 h-3.5" /> Upload Video from Phone/PC (.mp4)
                          <input
                            type="file"
                            accept="video/mp4,video/webm"
                            className="hidden"
                            onChange={(e) => handleFileUpload(e.target.files[0], (dataUrl) => {
                              setFormData({
                                ...formData,
                                settings: { ...formData.settings, restaurantHeroVideo: dataUrl }
                              });
                            }, 'Restaurant Video')}
                          />
                        </label>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">Restaurant Background Audio URL (MP3)</label>
                        <input
                          type="text"
                          value={formData.settings.restaurantAudioUrl}
                          onChange={(e) => setFormData({
                            ...formData,
                            settings: { ...formData.settings, restaurantAudioUrl: e.target.value }
                          })}
                          className="w-full bg-[#0A0E14] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">Restaurant Poster Image</label>
                        <input
                          type="text"
                          value={formData.settings.restaurantHeroFallbackImg}
                          onChange={(e) => setFormData({
                            ...formData,
                            settings: { ...formData.settings, restaurantHeroFallbackImg: e.target.value }
                          })}
                          className="w-full bg-[#0A0E14] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Instagram Reels Links */}
                <div className="bg-[#121822] p-6 rounded-2xl border border-white/5">
                  <h3 className="text-rose-400 font-bold text-sm mb-4">Instagram Reel Links</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Restaurant Reel Link</label>
                      <input
                        type="text"
                        value={formData.settings.restaurantReelUrl}
                        onChange={(e) => setFormData({
                          ...formData,
                          settings: { ...formData.settings, restaurantReelUrl: e.target.value }
                        })}
                        className="w-full bg-[#0A0E14] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Villa Reel Link</label>
                      <input
                        type="text"
                        value={formData.settings.villaReelUrl}
                        onChange={(e) => setFormData({
                          ...formData,
                          settings: { ...formData.settings, villaReelUrl: e.target.value }
                        })}
                        className="w-full bg-[#0A0E14] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: VILLAS */}
            {activeTab === 'villas' && (
              <div>
                <div className="flex justify-end mb-4">
                  <button
                    onClick={() => setEditingVilla({
                      isNew: true,
                      name: '',
                      price: 7500,
                      priceUnit: '/ Night',
                      tag: 'New Villa',
                      bedrooms: '2 BHK',
                      guests: 'Up to 6 Guests',
                      bathrooms: '2 Baths',
                      image: 'assets/villas/villa1.jpg',
                      description: 'Peaceful luxury stay with scenic nature views.',
                      amenities: ['Mountain View', 'AC Rooms', 'Private Lawn', 'WiFi']
                    })}
                    className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-black font-bold text-xs px-4 py-2 rounded-xl"
                  >
                    <Plus className="w-4 h-4" /> Add New Villa
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {formData.villas.map((v) => (
                    <div key={v.id} className="bg-[#121822] rounded-2xl border border-white/5 overflow-hidden flex flex-col">
                      <img src={v.image} alt={v.name} className="h-40 w-full object-cover" />
                      <div className="p-5 flex flex-col flex-grow">
                        <h4 className="font-bold text-white text-base mb-1">{v.name}</h4>
                        <span className="text-emerald-400 font-bold text-sm mb-3">₹{v.price} {v.priceUnit}</span>
                        <p className="text-gray-400 text-xs line-clamp-2 mb-4">{v.description}</p>
                        <div className="flex gap-2 mt-auto pt-3 border-t border-white/5">
                          <button
                            onClick={() => setEditingVilla({ ...v })}
                            className="flex-1 flex items-center justify-center gap-1 bg-white/5 hover:bg-white/10 text-gold text-xs py-2 rounded-lg font-semibold"
                          >
                            <Edit3 className="w-3.5 h-3.5" /> Edit Villa & Photo
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: MENU DISHES & PICTURES */}
            {activeTab === 'menu' && (
              <div>
                <div className="flex justify-end mb-4">
                  <button
                    onClick={() => setEditingDish({
                      isNew: true,
                      name: '',
                      price: 350,
                      category: "Chef's Signatures",
                      type: 'veg',
                      badge: 'Special',
                      description: 'Delicious dish prepared with fresh spices.',
                      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80'
                    })}
                    className="flex items-center gap-1.5 bg-gold hover:bg-gold-light text-black font-bold text-xs px-4 py-2 rounded-xl"
                  >
                    <Plus className="w-4 h-4" /> Add New Dish
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {formData.menuItems.map((dish) => (
                    <div key={dish.id} className="bg-[#121822] rounded-2xl border border-white/5 overflow-hidden flex flex-col">
                      <div className="relative h-36 w-full">
                        <img src={dish.image} alt={dish.name} className="w-full h-full object-cover" />
                        <span className="absolute top-2 right-2 text-xs bg-black/80 px-2 py-0.5 rounded text-white">
                          {dish.type === 'veg' ? '🟢 Veg' : '🔴 Non-Veg'}
                        </span>
                      </div>
                      <div className="p-4 flex flex-col flex-grow">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-bold text-white text-sm">{dish.name}</h4>
                          <span className="text-gold font-bold text-sm">₹{dish.price}</span>
                        </div>
                        <span className="text-[10px] text-gray-500 uppercase mb-2">{dish.category}</span>
                        <div className="flex gap-2 mt-auto pt-3 border-t border-white/5">
                          <button
                            onClick={() => setEditingDish({ ...dish })}
                            className="flex-1 flex items-center justify-center gap-1 bg-white/5 hover:bg-white/10 text-gold text-xs py-2 rounded-lg font-semibold"
                          >
                            <Edit3 className="w-3.5 h-3.5" /> Edit Photo/Price
                          </button>
                          <button
                            onClick={() => handleDeleteDish(dish.id)}
                            className="p-2 bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: GALLERY (MODAL DRIVEN) */}
            {activeTab === 'gallery' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <p className="text-gray-400 text-xs">Manage photos displayed in the Royal Gallery on the website.</p>
                  <button
                    onClick={() => setEditingGallery({
                      isNew: true,
                      title: '',
                      category: 'villas',
                      image: 'assets/villas/villa1.jpg'
                    })}
                    className="flex items-center gap-1.5 bg-gold hover:bg-gold-light text-black font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-gold/20"
                  >
                    <Plus className="w-4 h-4" /> Add New Photo
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {formData.gallery.map((g) => (
                    <div key={g.id} className="relative h-48 rounded-2xl overflow-hidden group bg-black border border-white/5">
                      <img src={g.image} alt={g.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 flex flex-col justify-between p-3.5 transition-opacity duration-300">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gold-light bg-black/60 px-2 py-0.5 rounded w-fit">
                          {g.category === 'restaurant' ? '🍽️ Dining' : '🏡 Villa'}
                        </span>
                        <div>
                          <p className="text-xs text-white font-bold mb-2 line-clamp-1">{g.title}</p>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setEditingGallery({ ...g, isNew: false })}
                              className="flex-1 bg-white/20 hover:bg-white/30 text-white text-[10px] font-bold py-1 rounded"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteGallery(g.id)}
                              className="bg-rose-500 hover:bg-rose-600 text-white p-1 rounded"
                              title="Delete Photo"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 5: SETTINGS & WHATSAPP */}
            {activeTab === 'settings' && (
              <div className="bg-[#121822] p-6 rounded-2xl border border-white/5 space-y-5 max-w-2xl">
                
                {/* GitHub Token Setup for 1-Click Live Publish */}
                <div className="p-4 bg-[#0A0E14] rounded-xl border border-emerald-500/30">
                  <label className="block text-xs font-bold text-emerald-400 mb-1 flex items-center gap-1.5">
                    <Globe className="w-4 h-4" /> GitHub Personal Access Token (for 1-Click Live Sync)
                  </label>
                  <input
                    type="password"
                    value={githubToken}
                    onChange={(e) => {
                      setGithubToken(e.target.value);
                      localStorage.setItem('kings99_github_token', e.target.value.trim());
                    }}
                    placeholder="ghp_..."
                    className="w-full bg-[#121822] border border-white/10 rounded-xl px-4 py-2 text-xs text-white"
                  />
                  <small className="text-gray-400 text-[11px] mt-1 block">
                    Enables the <strong>"🚀 Publish Live to GitHub"</strong> button to deploy changes to Vercel in 15 seconds.
                  </small>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gold mb-1">WhatsApp Booking Phone Number</label>
                  <input
                    type="text"
                    value={formData.settings.whatsappNumber}
                    onChange={(e) => setFormData({
                      ...formData,
                      settings: { ...formData.settings, whatsappNumber: e.target.value }
                    })}
                    placeholder="918308015907 (country code, no spaces)"
                    className="w-full bg-[#0A0E14] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white"
                  />
                  <small className="text-gray-500 text-[11px]">All table & villa bookings arrive on this WhatsApp number.</small>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gold mb-1">Display Contact Number</label>
                  <input
                    type="text"
                    value={formData.settings.phoneDisplay}
                    onChange={(e) => setFormData({
                      ...formData,
                      settings: { ...formData.settings, phoneDisplay: e.target.value }
                    })}
                    className="w-full bg-[#0A0E14] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gold mb-1">Physical Address</label>
                  <input
                    type="text"
                    value={formData.settings.address}
                    onChange={(e) => setFormData({
                      ...formData,
                      settings: { ...formData.settings, address: e.target.value }
                    })}
                    className="w-full bg-[#0A0E14] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gold mb-1">Operating Hours</label>
                  <input
                    type="text"
                    value={formData.settings.openingHours}
                    onChange={(e) => setFormData({
                      ...formData,
                      settings: { ...formData.settings, openingHours: e.target.value }
                    })}
                    className="w-full bg-[#0A0E14] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white"
                  />
                </div>
              </div>
            )}

            {/* TAB 6: BACKUP & RESTORE */}
            {activeTab === 'backup' && (
              <div className="bg-[#121822] p-8 rounded-2xl border border-white/5 max-w-2xl">
                <h3 className="font-serif text-xl font-bold text-white mb-2">Zero-Database Storage</h3>
                <p className="text-gray-400 text-xs mb-6">
                  All your photos, prices, dish descriptions, and video links are securely preserved. You can download an offline JSON backup or restore from one anytime.
                </p>

                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={handleExportJson}
                    className="flex items-center gap-2 bg-gold text-black font-bold text-xs px-5 py-3 rounded-xl"
                  >
                    <Database className="w-4 h-4" /> Download Backup JSON
                  </button>

                  <label className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-xs px-5 py-3 rounded-xl cursor-pointer">
                    <Upload className="w-4 h-4 text-emerald-400" /> Upload Backup JSON
                    <input type="file" accept=".json" onChange={handleImportJson} className="hidden" />
                  </label>

                  <button
                    onClick={() => {
                      if (confirm('Reset to initial factory defaults?')) {
                        resetToDefaults();
                        showToast('Reset to original default data!');
                      }
                    }}
                    className="flex items-center gap-2 bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white text-xs font-bold px-4 py-3 rounded-xl"
                  >
                    <RotateCcw className="w-4 h-4" /> Reset Defaults
                  </button>
                </div>
              </div>
            )}

          </main>
        </div>
      )}

      {/* MODAL: EDIT DISH */}
      {editingDish && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90">
          <div className="bg-[#121822] border border-gold/30 rounded-3xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <h3 className="font-serif text-xl font-bold text-white mb-4">
              {editingDish.isNew ? 'Add New Dish' : 'Edit Dish & Photo'}
            </h3>

            <form onSubmit={handleSaveDish} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gold-light mb-1">Dish Name *</label>
                <input
                  type="text"
                  required
                  value={editingDish.name}
                  onChange={(e) => setEditingDish({ ...editingDish, name: e.target.value })}
                  className="w-full bg-[#0A0E14] border border-white/10 rounded-xl px-3 py-2 text-sm text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gold-light mb-1">Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={editingDish.price}
                    onChange={(e) => setEditingDish({ ...editingDish, price: parseInt(e.target.value) || 0 })}
                    className="w-full bg-[#0A0E14] border border-white/10 rounded-xl px-3 py-2 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gold-light mb-1">Category *</label>
                  <select
                    value={editingDish.category}
                    onChange={(e) => setEditingDish({ ...editingDish, category: e.target.value })}
                    className="w-full bg-[#0A0E14] border border-white/10 rounded-xl px-3 py-2 text-sm text-white"
                  >
                    <option value="Chef's Signatures">Chef's Signatures</option>
                    <option value="Tandoor & Starters">Tandoor & Starters</option>
                    <option value="Royal Main Course">Royal Main Course</option>
                    <option value="Biryani & Rice">Biryani & Rice</option>
                    <option value="Breads & Accompaniments">Breads & Accompaniments</option>
                    <option value="Beverages & Mocktails">Beverages & Mocktails</option>
                    <option value="Desserts">Desserts</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gold-light mb-1">Dietary Type</label>
                  <select
                    value={editingDish.type}
                    onChange={(e) => setEditingDish({ ...editingDish, type: e.target.value })}
                    className="w-full bg-[#0A0E14] border border-white/10 rounded-xl px-3 py-2 text-sm text-white"
                  >
                    <option value="veg">🟢 Vegetarian</option>
                    <option value="nonveg">🔴 Non-Vegetarian</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gold-light mb-1">Badge (e.g. Signature)</label>
                  <input
                    type="text"
                    value={editingDish.badge || ''}
                    onChange={(e) => setEditingDish({ ...editingDish, badge: e.target.value })}
                    className="w-full bg-[#0A0E14] border border-white/10 rounded-xl px-3 py-2 text-sm text-white"
                  />
                </div>
              </div>

              {/* Photo Upload & Preview */}
              <div>
                <label className="block text-xs font-bold text-gold-light mb-1">Dish Photo (URL or Device Upload)</label>
                <input
                  type="text"
                  value={editingDish.image}
                  onChange={(e) => setEditingDish({ ...editingDish, image: e.target.value })}
                  className="w-full bg-[#0A0E14] border border-white/10 rounded-xl px-3 py-2 text-xs text-white mb-2"
                />
                <div className="flex items-center gap-3">
                  <img src={editingDish.image} alt="Preview" className="w-16 h-12 object-cover rounded border border-gold" />
                  <label className="flex items-center gap-1.5 bg-gold/15 hover:bg-gold text-gold hover:text-black text-xs font-bold px-3 py-2 rounded-lg cursor-pointer transition-colors">
                    <Upload className="w-3.5 h-3.5" /> Upload From Device
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e.target.files[0], (dataUrl) => {
                        setEditingDish({ ...editingDish, image: dataUrl });
                      }, 'Dish Photo')}
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gold-light mb-1">Description</label>
                <textarea
                  rows={2}
                  value={editingDish.description || ''}
                  onChange={(e) => setEditingDish({ ...editingDish, description: e.target.value })}
                  className="w-full bg-[#0A0E14] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="flex gap-3 pt-3">
                <button type="submit" className="flex-1 bg-gold text-black font-bold text-xs py-3 rounded-xl">
                  Save Dish
                </button>
                <button
                  type="button"
                  onClick={() => setEditingDish(null)}
                  className="px-5 bg-white/10 text-white font-semibold text-xs py-3 rounded-xl"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT VILLA */}
      {editingVilla && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90">
          <div className="bg-[#121822] border border-gold/30 rounded-3xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <h3 className="font-serif text-xl font-bold text-white mb-4">
              {editingVilla.isNew ? 'Add New Villa' : 'Edit Villa & Photos'}
            </h3>

            <form onSubmit={handleSaveVilla} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-emerald-300 mb-1">Villa Name *</label>
                <input
                  type="text"
                  required
                  value={editingVilla.name}
                  onChange={(e) => setEditingVilla({ ...editingVilla, name: e.target.value })}
                  className="w-full bg-[#0A0E14] border border-white/10 rounded-xl px-3 py-2 text-sm text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-emerald-300 mb-1">Price per Night (₹) *</label>
                  <input
                    type="number"
                    required
                    value={editingVilla.price}
                    onChange={(e) => setEditingVilla({ ...editingVilla, price: parseInt(e.target.value) || 0 })}
                    className="w-full bg-[#0A0E14] border border-white/10 rounded-xl px-3 py-2 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-emerald-300 mb-1">Badge Tag</label>
                  <input
                    type="text"
                    value={editingVilla.tag || ''}
                    onChange={(e) => setEditingVilla({ ...editingVilla, tag: e.target.value })}
                    className="w-full bg-[#0A0E14] border border-white/10 rounded-xl px-3 py-2 text-sm text-white"
                  />
                </div>
              </div>

              {/* Villa Photo Upload */}
              <div>
                <label className="block text-xs font-bold text-emerald-300 mb-1">Villa Image (URL or Upload File)</label>
                <input
                  type="text"
                  value={editingVilla.image}
                  onChange={(e) => setEditingVilla({ ...editingVilla, image: e.target.value })}
                  className="w-full bg-[#0A0E14] border border-white/10 rounded-xl px-3 py-2 text-xs text-white mb-2"
                />
                <div className="flex items-center gap-3">
                  <img src={editingVilla.image} alt="Villa" className="w-16 h-12 object-cover rounded border border-emerald-400" />
                  <label className="flex items-center gap-1.5 bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-black text-xs font-bold px-3 py-2 rounded-lg cursor-pointer transition-colors">
                    <Upload className="w-3.5 h-3.5" /> Upload Villa Photo
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e.target.files[0], (dataUrl) => {
                        setEditingVilla({ ...editingVilla, image: dataUrl });
                      }, 'Villa Photo')}
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-emerald-300 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={editingVilla.description || ''}
                  onChange={(e) => setEditingVilla({ ...editingVilla, description: e.target.value })}
                  className="w-full bg-[#0A0E14] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="flex gap-3 pt-3">
                <button type="submit" className="flex-1 bg-emerald-500 text-black font-bold text-xs py-3 rounded-xl">
                  Save Villa
                </button>
                <button
                  type="button"
                  onClick={() => setEditingVilla(null)}
                  className="px-5 bg-white/10 text-white font-semibold text-xs py-3 rounded-xl"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT GALLERY PHOTO */}
      {editingGallery && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90">
          <div className="bg-[#121822] border border-gold/30 rounded-3xl p-6 sm:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center gap-2 text-gold text-xs uppercase font-bold tracking-wider mb-2">
              <Camera className="w-4 h-4" /> Gallery Management
            </div>
            <h3 className="font-serif text-2xl font-bold text-white mb-4">
              {editingGallery.isNew ? 'Upload New Gallery Photo' : 'Edit Gallery Photo'}
            </h3>

            <form onSubmit={handleSaveGalleryPhoto} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gold-light mb-1.5">Photo Caption / Title *</label>
                <input
                  type="text"
                  required
                  value={editingGallery.title}
                  onChange={(e) => setEditingGallery({ ...editingGallery, title: e.target.value })}
                  placeholder="e.g. Sunset Dam View Deck, Luxury Villa Lawn"
                  className="w-full bg-[#0A0E14] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gold-light mb-1.5">Category *</label>
                <select
                  value={editingGallery.category}
                  onChange={(e) => setEditingGallery({ ...editingGallery, category: e.target.value })}
                  className="w-full bg-[#0A0E14] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-gold"
                >
                  <option value="villas">🏡 Villas & Nature</option>
                  <option value="restaurant">🍽️ Restaurant & Dining</option>
                </select>
              </div>

              {/* Photo Upload & Preview */}
              <div>
                <label className="block text-xs font-bold text-gold-light mb-1.5">Photo Source (URL or Device Upload) *</label>
                <input
                  type="text"
                  required
                  value={editingGallery.image}
                  onChange={(e) => setEditingGallery({ ...editingGallery, image: e.target.value })}
                  placeholder="Image URL or upload from your device below"
                  className="w-full bg-[#0A0E14] border border-white/10 rounded-xl px-4 py-2 text-xs text-white mb-3"
                />

                <div className="flex items-center gap-4 bg-[#0A0E14] p-3 rounded-2xl border border-white/5">
                  <img
                    src={editingGallery.image || 'assets/villas/villa1.jpg'}
                    alt="Preview"
                    className="w-20 h-16 object-cover rounded-xl border border-gold"
                  />
                  <label className="flex items-center gap-2 bg-gold hover:bg-gold-light text-black text-xs font-bold px-4 py-2.5 rounded-xl cursor-pointer transition-all shadow-md">
                    <Upload className="w-4 h-4" /> Upload From Phone/PC
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e.target.files[0], (dataUrl) => {
                        setEditingGallery({ ...editingGallery, image: dataUrl });
                      }, 'Gallery Photo')}
                    />
                  </label>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-white/5">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-gold-metallic via-gold to-gold-dark text-black font-bold text-xs uppercase tracking-wider py-3 rounded-xl shadow-lg shadow-gold/20 hover:scale-[1.02] transition-all"
                >
                  Save Photo
                </button>
                <button
                  type="button"
                  onClick={() => setEditingGallery(null)}
                  className="px-5 bg-white/10 hover:bg-white/15 text-white font-semibold text-xs py-3 rounded-xl transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
