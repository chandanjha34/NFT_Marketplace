'use client';
import Image from 'next/image';
import logo from '../../public/assets/logo.jpg'
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/Redux/store';
import { toast } from 'react-toastify';
import { assignAddress } from '@/Redux/features/wallet';
import { useEffect, useState } from 'react';
import { useContext} from 'react';
import { NFTContext } from "@/Wallet/contracts/NFTContext";
import axios from 'axios';

export default function Navbar(){

    interface typeNFT {
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

    const address = useSelector((state: RootState) => state.address.value );
    const dispatch = useDispatch<AppDispatch>();

    const username = useSelector((state: RootState) => state.username.value )

    const [profile,showProfile]=useState<boolean>(false);
    const [logged,setLogged]=useState<boolean>(false);
    const [metadata,setMetadata]=useState<typeNFT[]>([]);
    const Router = useRouter();

    const nftContext = useContext(NFTContext);
        
          // Check if context is available
    if (!nftContext) {
      return <p>Error loading NFT context.</p>;
    }
    
    const {
      getUserNFT
    } = nftContext;

    const routeToSignup=()=>{
        setLogged(true);
        Router.push('/SignUp');
    }

    const walletLogic = () =>{
        if(address){
            dispatch(assignAddress(''))
            return
        } else{
        Router.push('/connectWallet')
        }
    }

    useEffect(()=>{
        
    const getAllNFTs = async()=>{
        try {
            const nfts = await getUserNFT(address as string);
            console.log(nfts);
            const response = await axios.get('/api/nft/profile',{
                params:{nfts}
            })
            console.log(response.data);
            const userNFTs:typeNFT[] = response.data.array;
            setMetadata(userNFTs);
        
            
        } catch (error) {
                console.log(error);}
    }
    getAllNFTs();
    },[address])

    return(
        <div className='flex p-3 gap-130 justify-center text-white'>
            <div className='flex flex-row justify-center items-center gap-4'>
                <div><Image src={logo} alt="logo" width={40} height={40} /></div>
                <div className='font-semibold'>NFT MARKETPLACE</div>
            </div>
            <div className='flex flex-row w-[40vw] justify-between items-center'>
                <div className='cursor-pointer hover:[text-shadow:0_0_15px_rgba(255,255,255,0.9)]'>Marketplace</div>
                <div className='cursor-pointer hover:[text-shadow:0_0_15px_rgba(255,255,255,0.9)]'>Rankings</div>
                <div className='cursor-pointer hover:[text-shadow:0_0_15px_rgba(255,255,255,0.9)]' onClick={walletLogic}>{address?`${address.slice(0,7)}...${address.slice(39,41)}`:'Connect a wallet'}</div>
                <div><button onClick={logged ? () => showProfile(!profile) : () => routeToSignup()} className={`transform transition-transform duration-100 ease-out active:scale-95 active:shadow-md hover:border-black  w-[10vw] bg-[#A259FF] px-8 cursor-pointer text-black font-white h-10 border border-2 border-[#A259FF] rounded-full`}>{username?`${(username.split('.'[0]))}`:'Sign Up'}</button></div>
            </div>

            {
                profile && 
                    <div className='flex scrollbar-hide flex-col items-center py-4 bg-white w-[20vw] h-[80vh] overflow-y-scroll right-2 bottom-8 rounded-lg absolute'>
                            {metadata.map((nft)=>(
                                <div key={nft._id} className='flex flex-col'>
                                    <Image src={nft.MediaURL} width={200} height={200} alt='nft.name'/>
                                    <div>{nft.name}</div>
                                </div>
                            ))}
                    </div>
            }
        </div>
    );
}