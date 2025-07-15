// types/nft.storage.d.ts
declare module 'nft.storage' {
  export class NFTStorage {
    constructor(config: { token: string });
    storeBlob(blob: Blob): Promise<string>;
    storeDirectory(files: File[]): Promise<string>;
    status(cid: string): Promise<any>;
    delete(cid: string): Promise<void>;
  }
}