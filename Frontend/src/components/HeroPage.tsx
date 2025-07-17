"use client"
import Image from "next/image";
import cover from "../../public/assets/coverPhoto.png"
import { useState } from "react";
import axios from "axios";
import { useSelector} from 'react-redux';
import { RootState} from '@/Redux/store'
import { useContext} from 'react';
import { NFTContext } from "@/Wallet/contracts/NFTContext";


const Hero=()=>{

    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_uploadPreset;
    const cloud_name = process.env.NEXT_PUBLIC_CLOUDINARY_cloud_name;

    const [MintForm,showMintFrom]=useState<boolean>(false);
    const [name,setName]=useState<string>('');
    const [Description,setDescription]=useState<string>('');
    const [media,setMedia]=useState<File | null>(null);
    const [Category,setCategory]=useState<string>('');
    const [Price,setPrice]=useState<number>(0);
    const address = useSelector((state: RootState) => state.address.value );
    const nftContext = useContext(NFTContext);
    
      // Check if context is available
      if (!nftContext) {
        return <p>Error loading NFT context.</p>;
      }
    
      const {
        mintNFT
      } = nftContext;
    
    
    



    const handleSubmit=async()=>{
        const bid = Price;
        const createdAt = Date.now();
        console.log(bid);
        let MediaURL;


        if(!media){
            console.log('media is not inserted')
            return;
        }
        console.log(media);
        const formData = new FormData();
        formData.append("file",media);
        formData.append("upload_preset", uploadPreset as string);
        console.log(formData);

        try {
            const res = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,formData);
            MediaURL = res.data.secure_url;
            console.log("Cloudinary response:", res.data);

            
        // const metadata = {
        //   name,
        //   description: Description,
        //   image: MediaURL,
        //   attributes: [
        //     { trait_type: "Category", value: Category },
        //     { trait_type: "Creator", value: username || "Anonymous" }
        //   ]
        // };

        // const { cid, url } = await uploadToIPFS(
        //   new Blob([JSON.stringify(metadata)], { type: "application/json" }),
        //   `metadata_${Date.now()}.json`
        // );

        // console.log("Metadata uploaded:", { cid, url });

        const url = 'bafkreicbxfdqu5gs27gigycagxagvout3vkppqbw4z65lqwq5kjpkbqnbe';
        const tokendata = await mintNFT(url);
          console.log(tokendata);

        } catch (error) {
            console.error("Error uploading image:", error);
        } 
        console.log(media);
        const email = "jha924@gmail.com";
        const response = await axios.post('/api/nft/mint',JSON.stringify({
            email, address, name, Description, MediaURL, Category, Price, bid, createdAt
        }));
        console.log(response);

    }

    return(
        <div className="h-screen w-full flex text-white">
            <div className="h-full w-full flex text-white">
                <div className="w-[50vw] h-full pl-20 py-10 flex flex-col gap-5 ">
                    <div className="text-6xl font-bold">Discover  <br />digital art & Collect NFTs</div>
                    <div className="text-xl">NFT marketplace UI created with Anima for Figma. Collect, buy and sell art from more than 20k NFT artists.</div>
                    <div>
                        <button className=" active:scale-95 active:shadow-md hover:border-black border border-2 border-[#A259FF] cursor-pointer flex bg-[#A259FF] px-8 py-3 rounded-full flex align-center gap-3">
                            <span>
                                <Image src="/assets/Rocket.png" alt="image" width={20} height={20}/>
                            </span>
                            <span>
                                Get Started
                            </span>
                        </button>
                    </div>
                    <div className="flex justify-between text-[130%]">
                        <div>
                            <div className="font-bold text-[130%]">240K+</div>
                            <div className="text-[130%]">Total Sale</div>
                        </div>
                        <div>
                            <div className="font-bold text-[130%]">100K+</div>
                            <div className="text-[130%]">Auctions</div>
                        </div>
                        <div>
                            <div className="font-bold text-[130%]">240K+</div>
                            <div className="text-[130%]">Artists</div>
                        </div>
                    </div>
                </div>
                <div className="w-[50vw] px-30 py-10">
                    <Image className=" hover:shadow-[0_3px_6px_rgba(255,255,255,0.6)] rounded-xl" src={cover} alt="" width={450} height={450}/>
                </div>
            </div>
            <div className="absolute right-8 bottom-8">
                <Image width={80} height={80} alt="mint" onClick={()=>{showMintFrom(!MintForm)}} src={'/assets/plus1.png'} className="active:rotate-180 rounded-2xl transition-transform duration-500 ease-in-out cursor-pointer"/>
            </div>
            {
                MintForm &&
                <div className="left-[30%] top-[20vh] absolute bg-[#A259FF] rounded-xl w-[40vw] py-10 px-6 space-y-6 shadow-lg">
                  <div className="flex flex-col">
                    <label className="text-white font-medium mb-1">Name</label>
                    <input onChange={(e)=>{setName(e.target.value)}} className="bg-[#2B2B2B] text-white placeholder:text-gray-400 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400" placeholder="NFT Name" type="text" />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-white font-medium mb-1">Description</label>
                    <input onChange={(e)=>{setDescription(e.target.value)}} className="bg-[#2B2B2B] text-white placeholder:text-gray-400 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400" placeholder="NFT Description" type="text" />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-white font-medium mb-1">Category</label>
                    <input onChange={(e)=>{setCategory(e.target.value)}} className="bg-[#2B2B2B] text-white placeholder:text-gray-400 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400" placeholder="Art, Music, Collectible..." type="text" />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-white font-medium mb-1">Media</label>
                    <input onChange={(e) => {
                          if (e.target.files?.[0]) {
                            setMedia(e.target.files[0]);
                        }}} className="bg-[#2B2B2B] text-white file:bg-[#A259FF] file:text-white file:font-semibold file:border-none file:px-4 file:py-2 px-2 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400" type="file" />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-white font-medium mb-1">Price (ETH)</label>
                    <input onChange={(e)=>{setPrice(e.target.valueAsNumber)}} className="bg-[#2B2B2B] text-white placeholder:text-gray-400 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400" placeholder="0.01" type="number" />
                  </div>

                  <button onClick={()=>{handleSubmit()}} className="w-full bg-[#2B2B2B] cursor-pointer text-white font-semibold py-3 rounded-lg hover:bg-white hover:text-[#2B2B2B] transition-colors duration-300 shadow-md">
                    Mint NFT
                  </button>
                </div>

            }
        </div>
    );
}
export default Hero;