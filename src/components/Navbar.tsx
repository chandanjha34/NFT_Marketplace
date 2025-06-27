import Image from 'next/image';
import logo from '../../public/assets/logo.jpg'

export default function Navbar(){

    return(
        <div className='flex p-3 gap-130 justify-center text-white'>
            <div className='flex flex-row justify-center'>
                <div><Image src={logo} alt="logo" width={40} height={40} /></div>
                <div className='font-semibold'>NFT MARKETPLACE</div>
            </div>
            <div className='flex flex-row w-[40vw] justify-between align-center'>
                <div>Marketplace</div>
                <div>Rankings</div>
                <div>Connect a Wallet</div>
                <div><button className='w-full h-full bg-[#A259FF] border-black rounded-full px-8'>Sign Up</button></div>
            </div>
        </div>
    );
}