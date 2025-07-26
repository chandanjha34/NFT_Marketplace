"use client"
import Image from "next/image"
import { ethers } from "ethers";
import { metamaskConnect} from "@/Wallet/walletConnect";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from '../../Redux/store';
import { assignAddress } from "../../Redux/features/wallet";
import { useRouter } from 'next/navigation';
import { toast } from "react-toastify";

const ConnectWallet = ()=>{

    const Router = useRouter();
    const address = useSelector((state: RootState) => state.address.value );
    const dispatch = useDispatch<AppDispatch>();

    const connect = async (type:string) => {

        let value: ethers.Signer | null = null;

        if(type=='metamask') value = await metamaskConnect();
        toast.success("Wallet Connected");
        console.log(value);
        const Address  = await value?.getAddress();
        dispatch(assignAddress(Address as string));
        console.log(address);
        Router.push('/')
    }
    return(
        <div className="flex gap-8">
            <div>
                <Image width={600} alt="image" height={600} src={'/assets/wallet.png'}/>
            </div>
            <div className="flex flex-col text-white justify-between py-19">
                 <div className="text-7xl">Connect Wallet</div>
                 <div className="text-2xl">Choose a wallet you want to connect. There are several wallet providers.</div>
                 <div><button onClick={()=>{connect('metamask')}} className={`border border-2 w-50 h-14 border-[#A259FF] rounded-full flex items-center gap-2 hover:bg-[#A259FF]`}><Image width={30} className=" transform translate-x-6" src={'/assets/Metamask.png'} height={30} alt="" /> <p className=" transform translate-x-6">Metamask</p> </button></div>
                 <div><button onClick={()=>{connect('walletConnect')}}  className={`border border-2 w-50 h-14 border-[#A259FF] rounded-full flex items-center gap-2 hover:bg-[#A259FF]`}><Image width={30} className=" transform translate-x-6" src={'/assets/WalletConnect.png'} height={30} alt="" /> <p className=" transform translate-x-6"> Wallet Connect</p></button></div>
                 <div><button onClick={()=>{connect('coinbase')}}  className={`border border-2 w-50 h-14 border-[#A259FF] rounded-full flex items-center gap-2 hover:bg-[#A259FF]`}><Image width={30} className=" transform translate-x-6" src={'/assets/Coinbase.png'} height={30} alt="" /> <p className=" transform translate-x-6">Coinbase </p> </button></div>
            </div>
        </div>
    )
}

export default ConnectWallet;

