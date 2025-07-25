import { NextRequest, NextResponse } from "next/server";
import NFT from "@/models/NFTschema";
import connect from '../../../../../DBconfig/dbconfig'
import User from "@/models/userModel";


connect();

export async function POST(request:NextRequest){

    
    try {
        const reqBody = await request.json()
        console.log(reqBody);
        const {email, address, name, Description, MediaURL,Category, createdAt} = reqBody;
        let { Price, bid, } = reqBody;
        if(!email || !address || !name || !Description || !MediaURL || !Category ){
            console.log(email,address,name,Description,MediaURL,Category);
            return NextResponse.json({error:"Fill all inputs"},{status:403});
        }
        console.log(Price,bid);
        if(!Price){
            Price = 0;
        }
        if(!bid){
            bid=Price;
        }
        console.log(email);
        const user = await User.findOne({ email });
        console.log(user);
        if(!user) return NextResponse.json({"message":"User not registered"});
        
        const NFTData = new NFT({
            userID: user._id, address, name, Description, MediaURL, Category, Price, bid, createdAt
        })
        console.log('hi');
        const savedNFT = await NFTData.save();

        return NextResponse.json({
            message: "NFT created successfully",
            success: true,
            data: savedNFT // Send back the saved data
        });

    } catch (error) {
        if (error instanceof Error) {
          return NextResponse.json({ error: error.message }, { status: 505 });
        }
        return NextResponse.json({ error: 'Unknown error' }, { status: 500 });
    }
}