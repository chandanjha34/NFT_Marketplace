'use client';
import Image from 'next/image';
import logo from '../../public/assets/logo.jpg'
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/Redux/store';
import { assignAddress } from '@/Redux/features/wallet';
import { assignUsername } from '@/Redux/features/auth';

export default function Navbar(){

    const address = useSelector((state: RootState) => state.address.value );
    const dispatch = useDispatch<AppDispatch>();

    const username = useSelector((state: RootState) => state.username.value )

    const Router = useRouter();

    const routeToSignup=()=>{
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

    return(
        <div className='flex p-3 gap-130 justify-center text-white'>
            <div className='flex flex-row justify-center items-center'>
                <div><Image src={logo} alt="logo" width={40} height={40} /></div>
                <div className='font-semibold'>NFT MARKETPLACE</div>
            </div>
            <div className='flex flex-row w-[40vw] justify-between items-center'>
                <div className='cursor-pointer'>Marketplace</div>
                <div className='cursor-pointer'>Rankings</div>
                <div className='cursor-pointer' onClick={walletLogic}>{address?`${address.slice(0,7)}...${address.slice(39,41)}`:'Connect a wallet'}</div>
                <div><button onClick={routeToSignup} className={` hover:bg-[#2B2B2B] w-[10vw] bg-[#A259FF] px-8 cursor-pointer text-black font-white h-10 border border-2 border-[#A259FF] rounded-full`}>{username?`${username.trim()}`:'Sign Up'}</button></div>
            </div>
        </div>
    );
}