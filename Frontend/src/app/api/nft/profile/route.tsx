import NFT from "@/models/NFTschema";
import { NextRequest, NextResponse } from "next/server";
import connect from "../../../../../DBconfig/dbconfig";

connect();


export async function GET(req:NextRequest){
    console.log('hi');
    const {searchParams} = new URL(req.url);
    console.log(searchParams);
    const allNFTs = searchParams.getAll("nfts[]").map(Number);
    console.log(allNFTs);
    try {
        
        const myNFTmetadata = await NFT.find({ bid: { $in: allNFTs } });

        return NextResponse.json({
            success:true,
            array:myNFTmetadata,
        }, { status: 200 })
    } catch (error) {
        if (error instanceof Error) {
          return NextResponse.json({ error: error.message }, { status: 505 });
        }
        return NextResponse.json({ error: 'Unknown error' }, { status: 500 });
    }
     


}