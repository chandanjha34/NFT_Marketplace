import { NFTStorage } from 'nft.storage';

export const uploadToIPFS = async (file: Blob, filename: string) => {
  const client = new NFTStorage({
    token: process.env.NEXT_PUBLIC_NFT_STORAGE_TOKEN!
  });

  // Using native File constructor
  const ipfsFile = new File([file], filename, {
    type: file.type || 'application/octet-stream'
  });

  const cid = await client.storeBlob(ipfsFile);
  
  return {
    cid,
    url: `https://${cid}.ipfs.nftstorage.link/${encodeURIComponent(filename)}`
  };
};