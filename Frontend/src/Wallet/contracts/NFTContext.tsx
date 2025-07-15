'use client';

import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import Web3Modal from 'web3modal';
import { BrowserProvider, Contract, parseUnits } from 'ethers';
import ABI from "./NFT_Minting_ABI.json";
import { CONTRACT_ADDRESS } from "./contractAddress";

interface NFTContextType {
  currentAccount: string;
  error: string | null;
  connectWallet: () => Promise<void>;
  mintNFT: (tokenURI: string) => Promise<string>; // Returns tx hash
  transferNFT: (tokenId: number, price: string) => Promise<string>; // Returns tx hash
}

export const NFTContext = createContext<NFTContextType | undefined>(undefined);

export const NFTProvider = ({ children }: { children: ReactNode }) => {
  const [currentAccount, setCurrentAccount] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [web3Modal, setWeb3Modal] = useState<Web3Modal | null>(null);

  // Initialize Web3Modal once
  useEffect(() => {
    const modal = new Web3Modal({
      cacheProvider: true, // Optional - enables wallet connection persistence
      providerOptions: {} // Add wallet providers here if needed
    });
    setWeb3Modal(modal);
    checkIfWalletConnected();
  }, []);

  const connectWallet = async () => {
    try {
      if (!web3Modal) throw new Error("Web3Modal not initialized");
      
      const instance = await web3Modal.connect();
      const provider = new BrowserProvider(instance);
      const accounts = await provider.send("eth_requestAccounts", []);
      
      setCurrentAccount(accounts[0]);
      setError(null);
      
      // Subscribe to accounts change
      instance.on("accountsChanged", (accounts: string[]) => {
        setCurrentAccount(accounts[0] || '');
      });
      
      return accounts[0];
    } catch (err) {
      console.error('Error connecting wallet:', err);
      setError(err instanceof Error ? err.message : 'Connection failed');
      throw err;
    }
  };

  const checkIfWalletConnected = async () => {
    try {
      if (!window.ethereum) {
        setError('Please install MetaMask');
        return false;
      }
      
      const provider = new BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_accounts", []);
      
      if (accounts.length > 0) {
        setCurrentAccount(accounts[0]);
        return true;
      }
      
      return false;
    } catch (err) {
      console.error('Error checking wallet:', err);
      return false;
    }
  };

  const getContract = async () => {
    if (!web3Modal) throw new Error("Web3Modal not initialized");
    const instance = await web3Modal.connect();
    const provider = new BrowserProvider(instance);
    const signer = await provider.getSigner();
    return new Contract(CONTRACT_ADDRESS, ABI.abi, signer);
  };

  const mintNFT = async (tokenURI: string): Promise<string> => {
    try {
      const contract = await getContract();
      const tx = await contract.mintNFT(tokenURI);
      await tx.wait();
      console.log("miniting completed");
      return tx.hash;
    } catch (err) {
      console.error('Minting failed:', err);
      setError(err instanceof Error ? err.message : 'Minting failed');
      throw err;
    }
  };

  const transferNFT = async (tokenId: number, price: string): Promise<string> => {
    try {
      const contract = await getContract();
      const tx = await contract.NFT_transfer(tokenId, {
        value: parseUnits(price, 18)
      });
      await tx.wait();
      return tx.hash;
    } catch (err) {
      console.error('Transfer failed:', err);
      setError(err instanceof Error ? err.message : 'Transfer failed');
      throw err;
    }
  };

  return (
    <NFTContext.Provider value={{
      currentAccount,
      error,
      connectWallet,
      mintNFT,
      transferNFT
    }}>
      {children}
    </NFTContext.Provider>
  );
};

export const useNFT = () => {
  const context = useContext(NFTContext);
  if (!context) throw new Error('useNFT must be used within an NFTProvider');
  return context;
};