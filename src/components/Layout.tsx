import React from 'react';
import Sidebar from './Sidebar';
import Player from './Player';
import AIPanel from './AIPanel';
import { Cast, Heart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from './ui/button';
import { Web3Button, Web3Modal } from '@web3modal/react';
import { useWeb3Modal } from '@web3modal/react';
import { ethers } from 'ethers';

// Replace with your wallet address
const DONATION_ADDRESS = '0x742d35Cc6634C0532925a3b844Bc454e4438f44e';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { toast } = useToast();
  const { open } = useWeb3Modal();

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

  const handleDonate = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      
      const tx = await signer.sendTransaction({
        to: DONATION_ADDRESS,
        value: ethers.parseEther("0.01"), // Default donation of 0.01 ETH
      });

      toast({
        title: "Thank you!",
        description: "Your donation is being processed.",
      });

      await tx.wait();
      
      toast({
        title: "Donation Successful",
        description: "Thank you for supporting XMRT Radio!",
      });
    } catch (error) {
      console.error('Donation error:', error);
      toast({
        title: "Donation Failed",
        description: "There was an error processing your donation.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Web3Modal projectId="YOUR_PROJECT_ID" themeMode="dark" />
      <div className="flex flex-col md:flex-row h-screen bg-player-background text-player-foreground">
        <Sidebar />
        <main className="flex-1 overflow-auto p-3 pb-20">
          <div className="mb-4 flex justify-between items-center">
            <div className="flex-1 text-center">
              <h1 className="text-xl font-bold">XMRT Radio</h1>
              <p className="text-sm text-gray-400">Your gateway to global radio and music</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
                onClick={handleDonate}
              >
                <Heart size={16} className="text-red-500" />
                Donate
              </Button>
              <button
                onClick={handleCast}
                className="p-2 hover:bg-gray-800 rounded-full transition-colors"
                title="Cast to device"
              >
                <Cast size={20} />
              </button>
            </div>
          </div>
          {children}
        </main>
        <AIPanel />
        <Player />
      </div>
    </>
  );
};

export default Layout;