import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEFAULT_SITE_DATA } from '../data/defaultData';

const SiteDataContext = createContext();

const STORAGE_KEY = 'kings99_react_data_v1';

// Determines the freshest initial site data (compares local storage vs bundled data timestamp)
function getInitialSiteData() {
  try {
    const storedStr = localStorage.getItem(STORAGE_KEY);
    if (storedStr) {
      const stored = JSON.parse(storedStr);
      const storedTime = Number(stored.lastUpdated) || 0;
      const defaultTime = Number(DEFAULT_SITE_DATA.lastUpdated) || 0;

      // If the bundled code is newer than or equal to local storage, always prioritize the latest deployment
      if (defaultTime >= storedTime) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_SITE_DATA));
        return DEFAULT_SITE_DATA;
      }
      return stored;
    }
  } catch (e) {
    console.error("Failed to load local site data", e);
  }
  return DEFAULT_SITE_DATA;
}

export function SiteDataProvider({ children }) {
  const [siteData, setSiteData] = useState(getInitialSiteData);
  const [activeHub, setActiveHub] = useState('restaurant'); // 'restaurant' or 'villa'
  const [modalState, setModalState] = useState({ isOpen: false, type: 'restaurant', prefill: null });
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  // Save to localStorage whenever admin saves locally
  const updateSiteData = (newData) => {
    const dataWithTimestamp = {
      ...newData,
      lastUpdated: Date.now()
    };
    setSiteData(dataWithTimestamp);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataWithTimestamp));
    } catch (e) {
      console.error("Failed to save site data to localStorage", e);
    }
  };

  const resetToDefaults = () => {
    localStorage.removeItem(STORAGE_KEY);
    setSiteData(DEFAULT_SITE_DATA);
  };

  const openReservation = (type = 'restaurant', prefill = null) => {
    setModalState({ isOpen: true, type, prefill });
  };

  const closeReservation = () => {
    setModalState({ isOpen: false, type: 'restaurant', prefill: null });
  };

  // Live Sync Engine: Fetch latest data directly from GitHub in real-time so all devices worldwide get updates instantly
  useEffect(() => {
    async function syncFromGitHub() {
      try {
        const rawUrl = `https://raw.githubusercontent.com/Khushal1923/Kings-99-Restaurant-and-Villas-/main/src/data/defaultData.js?t=${Date.now()}`;
        const res = await fetch(rawUrl);
        if (res.ok) {
          const text = await res.text();
          // Extract DEFAULT_SITE_DATA JSON
          const match = text.match(/DEFAULT_SITE_DATA\s*=\s*(\{[\s\S]*\});/);
          if (match && match[1]) {
            const remoteData = JSON.parse(match[1]);
            const remoteTime = Number(remoteData.lastUpdated) || 0;

            setSiteData((current) => {
              const currentTime = Number(current.lastUpdated) || 0;
              if (remoteTime > currentTime) {
                console.log("⚡ Auto-synced newest site data from GitHub!", remoteData);
                localStorage.setItem(STORAGE_KEY, JSON.stringify(remoteData));
                return remoteData;
              }
              return current;
            });
          }
        }
      } catch (err) {
        console.warn("GitHub live fetch error (quiet fallback):", err);
      }
    }

    syncFromGitHub();
  }, []);

  // Secret admin shortcut listener: Ctrl+Shift+A or Cmd+Shift+A
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setIsAdminOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <SiteDataContext.Provider value={{
      siteData,
      updateSiteData,
      resetToDefaults,
      activeHub,
      setActiveHub,
      modalState,
      openReservation,
      closeReservation,
      isAdminOpen,
      setIsAdminOpen,
      isAudioPlaying,
      setIsAudioPlaying
    }}>
      {children}
    </SiteDataContext.Provider>
  );
}

export function useSiteData() {
  return useContext(SiteDataContext);
}
