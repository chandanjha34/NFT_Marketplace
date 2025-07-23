import { NextResponse } from "next/server";
import NFT from "@/models/NFTschema";
import connect from "../../../../../DBconfig/dbconfig";



export async function GET() {
    try {
        // Use Promise.all to run all database queries in parallel
        await connect();

        console.log('hey');
        const [arts, icons, rwas] = await Promise.all([
            NFT.find({ Category: "Art" }),
            NFT.find({ Category: "Icon" }),
            NFT.find({ Category: "RWA" })
        ]);
        console.log(arts,icons,rwas);
        return NextResponse.json({
            message: "Data Fetched",
            success: true,
            data: {
                arts,  // Now the variable names correctly match the data
                icons,
                rwas
            }
        });
        
    } catch (error: any) {
        // It's better to return error.message to not leak server details
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}