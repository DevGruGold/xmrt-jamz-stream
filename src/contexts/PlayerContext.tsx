import React, { createContext, useContext, useState } from 'react';

interface PlayerContextType {
  isPlaying: boolean;
  currentTrack: {
    title: string;
    artist: string;
    imageUrl: string;
    audioUrl: string;
    type: 'radio' | 'music';
  } | null;
  setCurrentTrack: (track: PlayerContextType['currentTrack']) => void;
  togglePlay: () => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<PlayerContextType['currentTrack']>(null);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <PlayerContext.Provider value={{ isPlaying, currentTrack, setCurrentTrack, togglePlay }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};