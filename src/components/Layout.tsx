import React from 'react';
import Sidebar from './Sidebar';
import Player from './Player';
import AIPanel from './AIPanel';
import { Cast, Heart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from './ui/button';
import { createWeb3Modal } from '@web3modal/wagmi/react';
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';
import { WagmiProvider } from 'wagmi';
import { mainnet } from 'viem/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ethers } from 'ethers';

// Add type declaration for window.ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}

// Replace with your wallet address from custom instructions
const DONATION_ADDRESS = '0xda6b8FbB45616F6F3b96C033De705b2b8cb8Cb08';

// Configure Web3Modal
const projectId = '979e55ed482b2e91b0384995a82a53c6';
const metadata = {
  name: 'XMRT Radio',
  description: 'Your gateway to global radio and music',
  url: 'https://xmrt.radio',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
};

const wagmiConfig = defaultWagmiConfig({
  projectId,
  metadata,
  chains: [mainnet],
  enableWalletConnect: true,
});

createWeb3Modal({
  wagmiConfig,
  projectId,
  themeMode: 'dark'
});

// Create a client for tanstack/react-query
const queryClient = new QueryClient();

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

  const handleDonate = async () => {
    if (!window.ethereum) {
      toast({
        title: "Error",
        description: "Please install a Web3 wallet like MetaMask",
        variant: "destructive",
      });
      return;
    }

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
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
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
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default Layout;