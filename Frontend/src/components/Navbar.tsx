'use client';

import { useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';

import logo from '../../public/assets/logo.jpg';
import { RootState, AppDispatch } from '@/Redux/store';
import { assignAddress } from '@/Redux/features/wallet';
import { NFTContext } from '@/Wallet/contracts/NFTContext';

interface NftMetadata {
  _id: string;
  userID: string;
  name: string;
  address: string;
  Description?: string;
  MediaURL: string;
  Category: string;
  Price: number;
  bid: number;
  createdAt: number;
}

export default function Navbar() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const nftContext = useContext(NFTContext);
  const address = useSelector((state: RootState) => state.address.value);
  const username = useSelector((state: RootState) => state.username.value);

  const [profile, showProfile] = useState<boolean>(false);
  const [metadata, setMetadata] = useState<NftMetadata[]>([]);

  // ✅ Early return before calling any hooks below
  if (!nftContext) {
    return <p>Loading Wallet Connection...</p>;
  }

  const { getUserNFT } = nftContext;

  const routeToSignup = () => {
    router.push('/SignUp');
  };

  const walletLogic = () => {
    if (address) {
      dispatch(assignAddress('')); // Disconnect
    } else {
      router.push('/connectWallet');
    }
  };

  useEffect(() => {
    const getAllNFTs = async () => {
      if (!address) {
        setMetadata([]);
        return;
      }

      try {
        const nftTokenIds = await getUserNFT(address);
        if (nftTokenIds.length === 0) {
          setMetadata([]);
          return;
        }

        const response = await axios.get('/api/nft/profile', {
          params: { nfts: nftTokenIds },
        });

        const userNFTs: NftMetadata[] = response.data.array;
        setMetadata(userNFTs);
      } catch (error) {
        console.error('Failed to fetch user NFTs:', error);
        toast.error('Could not fetch your NFTs.');
      }
    };

    getAllNFTs();
  }, [address, getUserNFT]);

  return (
    <div className="flex p-3 gap-130 justify-center text-white">
      <div className="flex flex-row justify-center items-center gap-4">
        <div>
          <Image src={logo} alt="logo" width={40} height={40} />
        </div>
        <div className="font-semibold">NFT MARKETPLACE</div>
      </div>

      <div className="flex flex-row w-[40vw] justify-between items-center">
        <div className="cursor-pointer hover:[text-shadow:0_0_15px_rgba(255,255,255,0.9)]">Marketplace</div>
        <div className="cursor-pointer hover:[text-shadow:0_0_15px_rgba(255,255,255,0.9)]">Rankings</div>
        <div
          className="cursor-pointer hover:[text-shadow:0_0_15px_rgba(255,255,255,0.9)]"
          onClick={walletLogic}
        >
          {address ? `${address.slice(0, 7)}...${address.slice(-4)}` : 'Connect a wallet'}
        </div>
        <div>
          <button
            onClick={username ? () => showProfile(!profile) : routeToSignup}
            className="transform transition-transform duration-100 ease-out active:scale-95 active:shadow-md hover:border-black w-[10vw] bg-[#A259FF] px-8 cursor-pointer text-white h-10 border border-2 border-[#A259FF] rounded-full"
          >
            {username ? username.split('@')[0] : 'Sign Up'}
          </button>
        </div>
      </div>

      {profile && (
        <div className="flex scrollbar-hide flex-col items-center py-4 bg-white text-black w-[20vw] h-[80vh] overflow-y-scroll right-2 bottom-8 rounded-lg absolute">
          {metadata.length > 0 ? (
            metadata.map((nft) => (
              <div key={nft._id} className="flex flex-col mb-4">
                <Image
                  src={nft.MediaURL}
                  width={200}
                  height={200}
                  alt={nft.name}
                  className="rounded-md"
                />
                <div className="font-semibold mt-2">{nft.name}</div>
              </div>
            ))
          ) : (
            <p>No NFTs found.</p>
          )}
        </div>
      )}
    </div>
  );
}
