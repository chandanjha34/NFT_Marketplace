'use client';
import Image from 'next/image';
import logo from '../../public/assets/logo.jpg'
import { useRouter } from 'next/navigation';

export default function Navbar(){

    const Router = useRouter();

    const routeToSignup=()=>{
        Router.push('/SignUp');
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
                <div className='cursor-pointer' onClick={()=>{Router.push('/connectWallet')}}>Connect a Wallet</div>
                <div><button onClick={routeToSignup} className={` hover:bg-[#2B2B2B] w-[10vw] bg-[#A259FF] px-8 cursor-pointer w-full h-10 border border-2 border-[#A259FF] rounded-full`}>Sign Up</button></div>
            </div>
        </div>
    );
}