import React from 'react';
import Sidebar from './Sidebar';
import Player from './Player';
import AIPanel from './AIPanel';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen bg-player-background text-player-foreground">
      <Sidebar />
      <main className="flex-1 overflow-auto p-6">
        {children}
      </main>
      <AIPanel />
      <Player />
    </div>
  );
};

export default Layout;