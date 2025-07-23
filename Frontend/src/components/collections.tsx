"use client"
import React from "react";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import Categories from "./categoryNFT";

const Collections = () => {

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

    const [artNFTs, setArtNFTs] = useState<typeNFT[]>([]);
    const [rwaNFTs, setRwaNFTs] = useState<typeNFT[]>([]);
    const [iconNFTs, setIconNFTs] = useState<typeNFT[]>([]);
    const [loading, setLoading] = useState(true); // 1. Add loading state
    const [category, setCategory] = useState<{ title: string; nfts: typeNFT[] } | null>(null);

    useEffect(() => {
        const NFTLoading = async () => {
            try {
                const response = await axios.get('/api/nft/data');
                
                setArtNFTs(response.data.data.arts);
                setIconNFTs(response.data.data.icons);
                setRwaNFTs(response.data.data.rwas);

            } catch (error) {
                console.error("Failed to load NFTs", error);
            } finally {
                setLoading(false); // 2. Set loading to false after fetch completes (or fails)
            }
        };
        NFTLoading();
    }, []);

    // 3. Show a loading message while data is being fetched
    if (loading) {
        return <div>Loading Collections...</div>;
    }

    if(category){
        return(
            <div className="flex flex-col gap-6 pb-18 pl-20 w-full">
                <div className="text-white text-4xl">Trending Collection</div>
                <div className="text-white text-2xl">Checkout our weekly updated trending collection.</div>
                <div className="w-full flex flex-col gap-5">
                    <div className="text-4xl flex justify-center text-white">{category.title}</div>
                    <div className="text-white" onClick={()=>setCategory(null)}><button>Back to Home Page</button></div>
                    <Categories  
                    NFT={ category.nfts}
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 px-20 pb-18 pl-20">
            <div className="text-white text-4xl">Trending Collection</div>
            <div className="text-white text-2xl">Checkout our weekly updated trending collection.</div>
            <div style={{ display: 'flex'}}>

                {/* Art Collection: Add checks to ensure the data exists before rendering */}
                {artNFTs.length > 0 && (
                    <div onClick={()=>{setCategory({title:"Art NFTs",nfts:artNFTs})}}  className="cursor-pointer w-[30vw] h-auto flex flex-col gap-5">
                        {artNFTs[0] && <Image className="w-[25vw] h-[25vw] rounded-lg overflow-hidden" src={artNFTs[0].MediaURL.trimEnd()} width={500} height={500} alt={artNFTs[0].name} />}
                        <div className="flex justify-between w-[25vw]">
                            {artNFTs[1] && <Image className="w-[7vw] h-[7vw] rounded-lg" src={artNFTs[1].MediaURL.trimEnd()} width={100} height={100} alt={artNFTs[1].name} />}
                            {artNFTs[2] && <Image className="w-[7vw] h-[7vw] rounded-lg" src={artNFTs[2].MediaURL.trimEnd()} width={100} height={100} alt={artNFTs[2].name} />}
                            <div  className="w-[7vw] h-[7vw] font-bold text-2xl  flex items-center justify-center bg-[#A259FF] rounded-lg">{(artNFTs.length)-3}+</div>
                        </div>
                    </div>
                )}
                
                {/* RWA Collection */}
                {rwaNFTs.length > 0 && (
                     <div onClick={()=>{setCategory({title:"RWA NFTs",nfts:rwaNFTs})}}  className="cursor-pointer w-[30vw] h-auto flex flex-col gap-5">
                        {rwaNFTs[0] && <Image  className="w-[25vw] h-[25vw] rounded-lg" src={rwaNFTs[0].MediaURL.trimEnd()} width={300} height={300} alt={rwaNFTs[0].name} />}
                        <div className="flex justify-between w-[25vw]">
                            {rwaNFTs[1] && <Image  className="w-[7vw]  h-[7vw] rounded-lg" src={rwaNFTs[1].MediaURL.trimEnd()} width={100} height={100} alt={rwaNFTs[1].name} />}
                            {rwaNFTs[2] && <Image  className="w-[7vw]  h-[7vw] rounded-lg" src={rwaNFTs[2].MediaURL.trimEnd()} width={100} height={100} alt={rwaNFTs[2].name} />}
                            <div  className="w-[7vw] h-[7vw] font-bold text-2xl flex items-center justify-center bg-[#A259FF] rounded-lg">{(rwaNFTs.length)-3}+</div>
                        </div>
                    </div>
                )}
                
                {/* Icon Collection */}
                {iconNFTs.length > 0 && (
                    <div onClick={()=>{setCategory({title:"Icon NFTs",nfts:iconNFTs})}} className="cursor-pointer gap-5 flex flex-col w-[30vw] h-auto ">
                        {iconNFTs[0] && <Image className="w-[25vw] h-[25vw] rounded-lg" src={iconNFTs[0].MediaURL.trimEnd()} width={300} height={300} alt={iconNFTs[0].name} />}
                        <div className="flex justify-between w-[25vw]">
                            {iconNFTs[1] && <Image className="w-[7vw]  h-[7vw] rounded-lg" src={iconNFTs[1].MediaURL.trimEnd()} width={100} height={100} alt={iconNFTs[1].name} />}
                            {iconNFTs[2] && <Image className="w-[7vw]  h-[7vw] rounded-lg" src={iconNFTs[2].MediaURL.trimEnd()} width={100} height={100} alt={iconNFTs[2].name} />}
                            <div  className="w-[7vw] h-[7vw] font-bold text-2xl flex items-center justify-center bg-[#A259FF] rounded-lg">{(iconNFTs.length)-3}+</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Collections;