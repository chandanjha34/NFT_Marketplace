import Image from "next/image"

const connectWallet = ()=>{
    return(
        <div className="flex gap-8">
            <div>
                <Image width={600} alt="image" height={600} src={'/assets/wallet.png'}/>
            </div>
            <div className="flex flex-col text-white justify-between py-19">
                 <div className="text-7xl">Connect Wallet</div>
                 <div className="text-2xl">Choose a wallet you want to connect. There are several wallet providers.</div>
                 <div><button className={`border border-2 w-50 h-14 border-[#A259FF] rounded-full flex items-center gap-2 hover:bg-[#A259FF]`}><Image width={30} className=" transform translate-x-6" src={'/assets/Metamask.png'} height={30} alt="" /> <p className=" transform translate-x-6">Metamask</p> </button></div>
                 <div><button className={`border border-2 w-50 h-14 border-[#A259FF] rounded-full flex items-center gap-2 hover:bg-[#A259FF]`}><Image width={30} className=" transform translate-x-6" src={'/assets/WalletConnect.png'} height={30} alt="" /> <p className=" transform translate-x-6"> Wallet Connect</p></button></div>
                 <div><button className={`border border-2 w-50 h-14 border-[#A259FF] rounded-full flex items-center gap-2 hover:bg-[#A259FF]`}><Image width={30} className=" transform translate-x-6" src={'/assets/Coinbase.png'} height={30} alt="" /> <p className=" transform translate-x-6">Coinbase </p> </button></div>
            </div>
        </div>
    )
}

export default connectWallet;

