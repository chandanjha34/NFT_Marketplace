'use client';
import Image from 'next/image';
import logo from '../../public/assets/logo.jpg'
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Navbar(){

    const Router = useRouter();

    const routeToSignup=()=>{
        Router.push('/SignUp');
    }


    const [isActive,changeStatus]=useState(true);

    return(
        <div className='flex p-3 gap-130 justify-center text-white'>
            <div className='flex flex-row justify-center'>
                <div><Image src={logo} alt="logo" width={40} height={40} /></div>
                <div className='font-semibold'>NFT MARKETPLACE</div>
            </div>
            <div className='flex flex-row w-[40vw] justify-between align-center'>
                <div className='cursor-pointer'>Marketplace</div>
                <div className='cursor-pointer'>Rankings</div>
                <div className='cursor-pointer'>Connect a Wallet</div>
                <div><button onMouseEnter={()=>changeStatus(!isActive)} onMouseLeave={()=>changeStatus(!isActive)} onClick={routeToSignup} className={`${isActive?'underline':''}  cursor-pointer w-full h-full bg-[#A259FF] border-black rounded-full px-8`}>Sign Up</button></div>
            </div>
        </div>
    );
}