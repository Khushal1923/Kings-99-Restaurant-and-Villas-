import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEFAULT_SITE_DATA } from '../data/defaultData';
import { fetchCloudSiteData, saveCloudSiteData, isSupabaseConfigured } from '../utils/supabaseClient';

const SiteDataContext = createContext();

const STORAGE_KEY = 'kings99_react_data_v1';

export function SiteDataProvider({ children }) {
  const [siteData, setSiteData] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error("Failed to load local site data", e);
    }
    return DEFAULT_SITE_DATA;
  });

  const [activeHub, setActiveHub] = useState('restaurant'); // 'restaurant' or 'villa'
  const [modalState, setModalState] = useState({ isOpen: false, type: 'restaurant', prefill: null });
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isCloudSyncing, setIsCloudSyncing] = useState(false);

  // Sync from Supabase Cloud on load
  useEffect(() => {
    async function loadFromCloud() {
      if (isSupabaseConfigured) {
        setIsCloudSyncing(true);
        const cloudData = await fetchCloudSiteData();
        if (cloudData && cloudData.settings) {
          setSiteData(cloudData);
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(cloudData));
          } catch (e) {}
        }
        setIsCloudSyncing(false);
      }
    }
    loadFromCloud();
  }, []);

  // Save to both localStorage and Supabase Cloud
  const updateSiteData = async (newData) => {
    setSiteData(newData);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    } catch (e) {
      console.error("Failed to save site data locally", e);
    }

    if (isSupabaseConfigured) {
      setIsCloudSyncing(true);
      await saveCloudSiteData(newData);
      setIsCloudSyncing(false);
    }
  };

  const resetToDefaults = async () => {
    localStorage.removeItem(STORAGE_KEY);
    setSiteData(DEFAULT_SITE_DATA);
    if (isSupabaseConfigured) {
      await saveCloudSiteData(DEFAULT_SITE_DATA);
    }
  };

  const openReservation = (type = 'restaurant', prefill = null) => {
    setModalState({ isOpen: true, type, prefill });
  };

  const closeReservation = () => {
    setModalState({ isOpen: false, type: 'restaurant', prefill: null });
  };

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
      setIsAudioPlaying,
      isCloudSyncing
    }}>
      {children}
    </SiteDataContext.Provider>
  );
}

export function useSiteData() {
  return useContext(SiteDataContext);
}
