import Image from "next/image";
import React, { JSX } from "react"
import { useContext} from 'react';
import { NFTContext } from "@/Wallet/contracts/NFTContext";
import { BrowserProvider, ethers } from "ethers";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from '@/Redux/store';
import { parseEther, formatEther } from "ethers";

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

    interface CateoryProps{
        NFT: typeNFT[],

    }



export default function Categories({NFT}:CateoryProps):JSX.Element{

    const address = useSelector((state: RootState) => state.address.value );


const getUserBalance = async () => {
  try {
    if (!window.ethereum) return null;
    if(!address) throw new Error("Wallet address not found");
    const provider = new BrowserProvider(window.ethereum);
    await provider.getSigner(); 
    const balance = await provider.getBalance(address as string);
    console.log(balance);
    const balanceInEth = formatEther(balance); // e.g. "0.07"
    console.log(balanceInEth);
    return balanceInEth;
  } catch (error) {
    console.error("Error fetching balance:", error);
    return null;
  }
};

    const nftContext = useContext(NFTContext);

    // Check if context is available
      if (!nftContext) {
        return <p>Error loading NFT context.</p>;
      }
    
      const {
        transferNFT
      } = nftContext;

const TransferNFT = async ({ bid, price }: { bid: number; price: number }) => {
  try {
    const balance = await getUserBalance();

    if (!balance) {
      console.warn("User balance unavailable.");
      return;
    }
    const valueInWei = parseEther(balance);
    const priceInWei = parseEther(price.toFixed(18));

    if(valueInWei<priceInWei) return new Error('insufficient balance');

    console.log(valueInWei,priceInWei);
    await transferNFT(bid, priceInWei, priceInWei);

  } catch (error) {
    console.error("Transfer Error:", error);
  }
};


    return(
        <div className="w-full overflow-x-scroll  scrollbar-hidden">
            <div className="flex gap-8 w-[240vw] justify-around scrollbar-hide">
                {
                 Array.isArray(NFT) &&   NFT.map((nft)=>(
                        <div key={nft._id} className="flex flex-col items-center justify-between w-[20vw] h-[25vw] overflow-visible">
                            <Image  className="w-[15vw] h-[20vw] rounded-lg" src={nft.MediaURL.trimEnd()} width={800} height={400} alt={nft.name}/>
                            <div className="flex gap-6">
                                <button className="w-[7vw] rounded-lg bg-[#A259FF] text-lg h-[3vw]">
                                    {nft.Price} eth
                                </button>
                                <button onClick={() => TransferNFT({ bid: nft.bid, price: nft.Price })} className="w-[7vw] rounded-lg hover:bg-[#A259FF] text-white active:scale-[0.85] text-lg h-[3vw]">
                                    Place Bid
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}