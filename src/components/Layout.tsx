import React from 'react';
import Sidebar from './Sidebar';
import Player from './Player';
import AIPanel from './AIPanel';
import { Cast } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { toast } = useToast();

  const handleCast = () => {
    if ('presentation' in navigator.mediaSession) {
      toast({
        title: "Casting",
        description: "Looking for casting devices...",
      });
    } else {
      toast({
        title: "Casting Unavailable",
        description: "Your browser doesn't support casting.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-player-background text-player-foreground">
      <Sidebar />
      <main className="flex-1 overflow-auto p-3 pb-20">
        <div className="mb-4 flex justify-between items-center">
          <div className="flex-1 text-center">
            <h1 className="text-xl font-bold">XMRT Radio</h1>
            <p className="text-sm text-gray-400">Your gateway to global radio and music</p>
          </div>
          <button
            onClick={handleCast}
            className="p-2 hover:bg-gray-800 rounded-full transition-colors"
            title="Cast to device"
          >
            <Cast size={20} />
          </button>
        </div>
        {children}
      </main>
      <AIPanel />
      <Player />
    </div>
  );
};

export default Layout;