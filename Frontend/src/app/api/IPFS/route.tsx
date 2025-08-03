import { NextRequest, NextResponse } from "next/server";
import axios from 'axios';
import connect from "../../../../DBconfig/dbconfig";

// Connect to DB (if needed)
connect();

export async function POST(req: NextRequest) {
  try {
    // 1. Extract metadata from the request
    const { name, description, image } = await req.json();

    // 2. Validate input
    if (!name || !description || !image) {
      return NextResponse.json(
        { success: false, error: 'Missing required metadata fields.' },
        { status: 400 }
      );
    }

    // 3. Get Pinata JWT
    const pinataJwt = process.env.NEXT_PUBLIC_PINATA_JWT;
    if (!pinataJwt) {
      console.error("Missing PINATA_JWT environment variable");
      return NextResponse.json(
        { success: false, error: 'Server configuration error.' },
        { status: 500 }
      );
    }

    // 4. Prepare the JSON metadata
    const metadata = {
      name,
      description,
      image, // should already be a Cloudinary or IPFS gateway URL
    };

    // 5. Upload metadata to public IPFS using pinJSONToIPFS
    const pinataResponse = await axios.post(
      'https://api.pinata.cloud/pinning/pinJSONToIPFS',
      metadata,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${pinataJwt}`,
        },
      }
    );

    // 6. Get IPFS hash and build tokenURI
    const ipfsHash = pinataResponse.data.IpfsHash;
    const tokenUri = `ipfs://${ipfsHash}`;

    // 7. Return success response
    return NextResponse.json({ success: true, tokenUri });

  }  catch (error) {
        if (error instanceof Error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ error: 'Unknown error' }, { status: 500 });
    }
}
