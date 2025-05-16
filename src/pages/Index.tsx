
import React, { useState } from 'react';
import { WalletData, NetworkData, NetworkNode, fetchWalletData, generateNetworkData } from '@/lib/solanaApi';
import WalletSearch from '@/components/WalletSearch';
import NetworkGraph from '@/components/NetworkGraph';
import TransactionDetail from '@/components/TransactionDetail';
import WalletSummary from '@/components/WalletSummary';
import { toast } from 'sonner';
import { ChevronRight, Instagram } from 'lucide-react';
import { useWalletData } from '@/hooks/useWalletData';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const Index = () => {
  const [walletData, setWalletData] = useState<WalletData | null>(null);
  const [networkData, setNetworkData] = useState<NetworkData | null>(null);
  const [selectedNode, setSelectedNode] = useState<NetworkNode | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Use our custom hook
  const { updateWalletData } = useWalletData();

  const handleSearch = async (address: string) => {
    setIsLoading(true);
    setSelectedNode(null);
    setError(null);
    
    try {
      const data = await fetchWalletData(address);
      
      if (data.transactions.length === 0) {
        toast.warning("No transactions found for this wallet");
      } else {
        toast.success(`Found ${data.transactions.length} transactions for this wallet`);
      }
      
      setWalletData(data);
      updateWalletData(data);
      
      const network = generateNetworkData(data);
      setNetworkData(network);
    } catch (error: any) {
      console.error("Search error:", error);
      setError(error.message);
      toast.error(`Error: ${error.message}`);
      
      setWalletData(null);
      setNetworkData(null);
      updateWalletData(null);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleNodeClick = (node: NetworkNode) => {
    setSelectedNode(node);
  };

  return (
    <div className="min-h-screen flex flex-col w-full bg-gradient-to-br from-cyan-900 to-slate-900">
      {/* Header */}
      <header className="w-full px-4 sm:px-6 py-4 border-b border-white/10">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center">
            <div className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-500">
              SolVision
            </div>
          </div>
        </div>
      </header>

      {/* Hero section - mobile optimized */}
      <section className="w-full px-4 sm:px-6 py-12 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-60 h-60 rounded-full bg-blue-500 filter blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-cyan-500 filter blur-3xl"></div>
        </div>
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold mb-4 sm:mb-6 leading-tight tracking-tight">
              <span className="text-white">Visualize Solana </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                Wallet Networks
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
              Explore wallet connections and transaction flows with our interactive visualization tool
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-1">
            <WalletSearch onSearch={handleSearch} isLoading={isLoading} />
          </div>
        </div>
      </section>

      {/* Main Content - mobile optimized */}
      <main className="flex-1 w-full px-4 sm:px-6 pb-16 sm:pb-24">
        <div className="container mx-auto max-w-7xl">
          {walletData && networkData ? (
            <div className="animate-fade-in space-y-6 sm:space-y-8">
              <WalletSummary data={walletData} />
              
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
                <div className="lg:col-span-3 bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-md">
                  <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 flex items-center gap-2 text-white">
                    <span className="inline-block w-2 h-2 bg-cyan-400 rounded-full"></span>
                    Network Visualization
                  </h2>
                  <NetworkGraph 
                    data={networkData} 
                    onNodeClick={handleNodeClick}
                  />
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-md">
                  <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 flex items-center gap-2 text-white">
                    <span className="inline-block w-2 h-2 bg-blue-400 rounded-full"></span>
                    Transaction Details
                  </h2>
                  <TransactionDetail 
                    selectedNode={selectedNode} 
                    allTransactions={walletData.transactions}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 sm:py-20 bg-white/5 mt-6 sm:mt-8 rounded-xl border border-white/10 backdrop-blur-md">
              <div className="relative w-20 sm:w-24 h-20 sm:h-24 mb-5 sm:mb-6">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 opacity-30 animate-pulse-glow"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 397.7 311.7" className="w-10 h-10 sm:w-12 sm:h-12">
                    <linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="360.8791" y1="351.4553" x2="141.213" y2="-69.2936">
                      <stop offset="0" stopColor="#00FFA3"/>
                      <stop offset="1" stopColor="#4DABF7"/>
                    </linearGradient>
                    <path fill="url(#SVGID_1_)" d="M64.6,237.9c2.4-2.4,5.7-3.8,9.2-3.8h317.4c5.8,0,8.7,7,4.6,11.1l-62.7,62.7c-2.4,2.4-5.7,3.8-9.2,3.8H6.5
                      c-5.8,0-8.7-7-4.6-11.1L64.6,237.9z"/>
                    <linearGradient id="SVGID_2_" gradientUnits="userSpaceOnUse" x1="264.8291" y1="401.6014" x2="45.163" y2="-19.1475">
                      <stop offset="0" stopColor="#00FFA3"/>
                      <stop offset="1" stopColor="#4DABF7"/>
                    </linearGradient>
                    <path fill="url(#SVGID_2_)" d="M64.6,3.8C67.1,1.4,70.4,0,73.8,0h317.4c5.8,0,8.7,7,4.6,11.1l-62.7,62.7c-2.4,2.4-5.7,3.8-9.2,3.8H6.5
                      c-5.8,0-8.7-7-4.6-11.1L64.6,3.8z"/>
                    <linearGradient id="SVGID_3_" gradientUnits="userSpaceOnUse" x1="312.5484" y1="376.688" x2="92.8822" y2="-44.061">
                      <stop offset="0" stopColor="#00FFA3"/>
                      <stop offset="1" stopColor="#4DABF7"/>
                    </linearGradient>
                    <path fill="url(#SVGID_3_)" d="M333.1,120.1c-2.4-2.4-5.7-3.8-9.2-3.8H6.5c-5.8,0-8.7,7-4.6,11.1l62.7,62.7c2.4,2.4,5.7,3.8,9.2,3.8h317.4
                      c5.8,0,8.7-7,4.6-11.1L333.1,120.1z"/>
                  </svg>
                </div>
              </div>
              <h2 className="text-xl sm:text-2xl font-medium text-white text-center">
                {error ? "Error loading wallet data" : "Enter a Solana wallet address"}
              </h2>
              <p className="text-sm sm:text-base text-white/70 mt-2 text-center max-w-md px-4">
                {error ? error : "Discover wallet connections and transaction patterns"}
              </p>
            </div>
          )}
        </div>
      </main>
      
      {/* Footer - mobile optimized */}
      <footer className="w-full px-4 sm:px-6 py-6 sm:py-8 border-t border-white/10 bg-black/20">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 mb-4 md:mb-0">
              SolVision
            </div>
            <div className="flex flex-wrap justify-center md:justify-end items-center gap-4 text-sm text-white/70">
              <a 
                href="https://instagram.com/saaalick" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Instagram size={16} /> 
                <span>Created by salik</span>
                <ChevronRight size={14} />
              </a>
              <span>© {new Date().getFullYear()} SolVision</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
