import React, { useRef, useEffect } from 'react';
import { useSiteData } from '../context/SiteDataContext';
import { Music, Volume2, VolumeX } from 'lucide-react';

export default function AudioPlayer() {
  const { siteData, activeHub, isAudioPlaying, setIsAudioPlaying } = useSiteData();
  const audioRef = useRef(null);

  const targetAudio = activeHub === 'restaurant'
    ? siteData.settings.restaurantAudioUrl
    : siteData.settings.villaAudioUrl;

  useEffect(() => {
    if (audioRef.current && isAudioPlaying) {
      audioRef.current.src = targetAudio;
      audioRef.current.play().catch(() => {});
    }
  }, [activeHub, targetAudio, isAudioPlaying]);

  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (isAudioPlaying) {
      audioRef.current.pause();
      setIsAudioPlaying(false);
    } else {
      audioRef.current.src = targetAudio;
      audioRef.current.play().then(() => {
        setIsAudioPlaying(true);
      }).catch((e) => {
        console.warn("Audio play prevented", e);
      });
    }
  };

  return (
    <>
      <audio ref={audioRef} loop preload="none" />

      {/* Floating Audio Controller Badge */}
      <button
        onClick={toggleAudio}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#121822]/90 hover:bg-[#192230] border border-gold/30 hover:border-gold backdrop-blur-xl shadow-2xl shadow-black/80 transition-all duration-300 hover:scale-105"
        title="Toggle Ambient Music"
      >
        {isAudioPlaying ? (
          <div className="flex items-end gap-[3px] h-4">
            <span className="w-1 bg-gold rounded-full animate-[pulse_0.6s_ease-in-out_infinite] h-4" />
            <span className="w-1 bg-gold rounded-full animate-[pulse_0.4s_ease-in-out_infinite_0.2s] h-3" />
            <span className="w-1 bg-gold rounded-full animate-[pulse_0.8s_ease-in-out_infinite_0.4s] h-4" />
            <span className="w-1 bg-gold rounded-full animate-[pulse_0.5s_ease-in-out_infinite_0.1s] h-2" />
          </div>
        ) : (
          <Music className="w-4 h-4 text-gold" />
        )}

        <span className="text-xs font-semibold text-gray-200">
          {isAudioPlaying ? "Pause Music" : "Play Music 🎵"}
        </span>
      </button>
    </>
  );
}
