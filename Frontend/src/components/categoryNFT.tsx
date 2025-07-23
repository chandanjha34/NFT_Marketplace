import Image from "next/image";
import React, { JSX } from "react"


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
                                <button className="w-[7vw] rounded-lg hover:bg-[#A259FF] text-white active:scale-[0.85] text-lg h-[3vw]">
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