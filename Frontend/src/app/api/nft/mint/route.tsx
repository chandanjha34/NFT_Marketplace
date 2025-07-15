import { NextRequest, NextResponse } from "next/server";
import NFT from "@/models/NFTschema";
import connect from '../../../../../DBconfig/dbconfig'


connect();

export async function POST(request:NextRequest){

    
    try {
        const reqBody = await request.json()
        console.log(reqBody);
        const {email, address, name, Description, MediaURL,Category, createdAt} = reqBody;
        let { Price, bid, } = reqBody
        if(!email || !address || !name || !Description || !MediaURL || !Category ){
            console.log(email,address,name,Description,MediaURL,Category);
            return NextResponse.json({error:"Fill all inputs"},{status:403});
        }

        if(!Price){
            Price = 0;
        }
        if(!bid){
            bid=Price;
        }

         
        const NFTData = new NFT({
            email, address, name, Description, MediaURL, Category, Price, bid, createdAt
        })

        return NextResponse.json({
            message: "User created succesfully",
            success: true,
            NFTData
        })

    } catch (error) {
        if (error instanceof Error) {
          return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: 'Unknown error' }, { status: 500 });
    }
}