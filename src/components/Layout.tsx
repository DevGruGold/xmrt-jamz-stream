import React from 'react';
import Sidebar from './Sidebar';
import Player from './Player';
import AIPanel from './AIPanel';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col md:flex-row h-screen bg-player-background text-player-foreground">
      <Sidebar />
      <main className="flex-1 overflow-auto p-4 md:p-6 pb-24 md:pb-32">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">XMRT Radio</h1>
          <p className="text-sm md:text-base text-gray-400">Your gateway to global radio and music</p>
        </div>
        {children}
      </main>
      <AIPanel />
      <Player />
    </div>
  );
};

export default Layout;