import Image from "next/image";
import cover from "../../public/assets/coverPhoto.png"


const Hero=()=>{
    return(
        <div className="h-full w-full flex text-white">
            <div className="w-[50vw] h-full pl-20 py-10 flex flex-col gap-5 ">
                <div className="text-6xl font-bold">Discover  <br />digital art & Collect NFTs</div>
                <div className="text-xl">NFT marketplace UI created with Anima for Figma. Collect, buy and sell art from more than 20k NFT artists.</div>
                <div>
                    <button className="flex bg-[#A259FF] px-8 py-3 rounded-full flex align-center gap-3">
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
                <Image src={cover} alt="" width={450} height={450}/>
            </div>
        </div>
    );
}
export default Hero;