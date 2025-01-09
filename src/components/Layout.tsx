import React from 'react';
import Sidebar from './Sidebar';
import Player from './Player';
import AIPanel from './AIPanel';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col md:flex-row h-screen bg-player-background text-player-foreground">
      <Sidebar />
      <main className="flex-1 overflow-auto p-3 pb-20">
        <div className="mb-4">
          <h1 className="text-xl font-bold">XMRT Radio</h1>
          <p className="text-sm text-gray-400">Your gateway to global radio and music</p>
        </div>
        {children}
      </main>
      <AIPanel />
      <Player />
    </div>
  );
};

export default Layout;