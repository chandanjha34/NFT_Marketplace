'use client';

import { useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import logo from '../../public/assets/logo.jpg';
import { RootState, AppDispatch } from '@/Redux/store';
import { assignAddress, } from '@/Redux/features/wallet';
import { NFTContext } from '@/Wallet/contracts/NFTContext';
import { assignUsername } from '@/Redux/features/auth';

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
  // ✅ ALL HOOKS CALLED FIRST
  const nftContext = useContext(NFTContext);
  const address = useSelector((state: RootState) => state.address.value);
  const username = useSelector((state: RootState) => state.username.value);
  const [profile, showProfile] = useState(false);
  const [metadata, setMetadata] = useState<NftMetadata[]>([]);
  const [isLoggedIn,setLoggedIn] = useState<boolean>(false);
  // ✅ useEffect always called unconditionally
  useEffect(() => {
    const getAllNFTs = async () => {
      if (!nftContext || !address) {
        setMetadata([]);
        return;
      }

      try {
        const nftTokenIds = await nftContext.getUserNFT(address);

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
  }, [address, nftContext]);



  useEffect(() => {
    const checkAuthStatus = async () => {
        try {
            const response = await axios.get('/api/user/status');
            console.log(response);
            if (response.data.isLoggedin) {
                setLoggedIn(true);
                dispatch(assignUsername(response.data.username));
            }
        } catch (error) {
            console.error("Failed to check auth status");
        }
    };

    checkAuthStatus();
},[]);

  const routeToSignup = () => {
    router.push('/SignUp');
  }

  const walletLogic = () => {
    if (address) dispatch(assignAddress(''));
    else router.push('/connectWallet');
  };

  const logoutHandler = async() => {
      await axios.post('/api/user/logout');
      dispatch(assignUsername(''))
      showProfile(!profile);
  }

  // ✅ Render safely even when nftContext is not ready
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
            {username ? username.split(' ')[0] : 'Sign Up'}
          </button>
        </div>
      </div>

      {profile && (
        <div className="z-3 flex scrollbar-hide flex-col items-center py-4 bg-white text-black w-[20vw] h-[80vh] overflow-y-scroll right-2 bottom-8 rounded-lg absolute">
          <div><button className='bg-[#FF0000] rounded-lg w-[15vw] h-full py-3 flex justify-center items-center cursor-pointer  active:scale-95' onClick={()=>{logoutHandler()}} >Log Out</button></div>
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
