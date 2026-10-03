import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEFAULT_SITE_DATA } from '../data/defaultData';

const SiteDataContext = createContext();

const STORAGE_KEY = 'kings99_react_data_v1';

// Universal UTF-8 base64 decoder for GitHub API responses
function base64ToUtf8(base64) {
  try {
    return decodeURIComponent(escape(window.atob(base64.replace(/\s/g, ''))));
  } catch (e) {
    return window.atob(base64.replace(/\s/g, ''));
  }
}

// Determines the freshest initial site data on startup
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

  // Save to state and localStorage whenever admin makes edits
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

  // Real-Time GitHub Live Sync: Fetches newest repository data instantly across all devices
  useEffect(() => {
    let isMounted = true;

    async function syncLatestFromGitHub() {
      // 1. Try GitHub Contents API (Instant 0-second cache, official REST endpoint)
      try {
        const apiRes = await fetch(
          'https://api.github.com/repos/Khushal1923/Kings-99-Restaurant-and-Villas-/contents/src/data/defaultData.js',
          {
            headers: { Accept: 'application/vnd.github.v3+json' },
            cache: 'no-store'
          }
        );
        if (apiRes.ok) {
          const resJson = await apiRes.json();
          if (resJson.content) {
            const decodedText = base64ToUtf8(resJson.content);
            const match = decodedText.match(/DEFAULT_SITE_DATA\s*=\s*(\{[\s\S]*\});/);
            if (match && match[1]) {
              const remoteData = JSON.parse(match[1]);
              const remoteTime = Number(remoteData.lastUpdated) || 0;

              if (isMounted) {
                setSiteData((current) => {
                  const currentTime = Number(current.lastUpdated) || 0;
                  if (remoteTime > currentTime) {
                    console.log("⚡ Auto-synced newest live data from GitHub API!", remoteData);
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(remoteData));
                    return remoteData;
                  }
                  return current;
                });
              }
              return; // Succeeded via GitHub API
            }
          }
        }
      } catch (err) {
        // Fall through to raw CDN attempt
      }

      // 2. Fallback to raw GitHub content
      try {
        const rawRes = await fetch(
          `https://raw.githubusercontent.com/Khushal1923/Kings-99-Restaurant-and-Villas-/main/src/data/defaultData.js?t=${Date.now()}`,
          { cache: 'no-store' }
        );
        if (rawRes.ok) {
          const text = await rawRes.text();
          const match = text.match(/DEFAULT_SITE_DATA\s*=\s*(\{[\s\S]*\});/);
          if (match && match[1]) {
            const remoteData = JSON.parse(match[1]);
            const remoteTime = Number(remoteData.lastUpdated) || 0;

            if (isMounted) {
              setSiteData((current) => {
                const currentTime = Number(current.lastUpdated) || 0;
                if (remoteTime > currentTime) {
                  console.log("⚡ Auto-synced newest live data from GitHub Raw!", remoteData);
                  localStorage.setItem(STORAGE_KEY, JSON.stringify(remoteData));
                  return remoteData;
                }
                return current;
              });
            }
          }
        }
      } catch (err) {
        console.warn("GitHub live sync fallback error (quiet):", err);
      }
    }

    syncLatestFromGitHub();

    return () => {
      isMounted = false;
    };
  }, []);

  // Secret admin shortcut listener: Ctrl+Shift+A or Cmd+Shift+A & URL Hash (#admin)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setIsAdminOpen(prev => !prev);
      }
    };

    const checkHash = () => {
      if (window.location.hash === '#admin' || window.location.hash === '#admin-portal') {
        setIsAdminOpen(true);
      }
    };

    checkHash();
    window.addEventListener('hashchange', checkHash);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('hashchange', checkHash);
    };
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
