import { ethers } from 'ethers';
import WalletConnectProvider from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import { METHODS } from 'http';

export async function metamaskConnect():Promise<ethers.Signer|null>{
    console.log('Yes sir')
    if(!window.ethereum){
        alert("Install metamask first");
        return null;
    }
    
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const Provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await Provider.getSigner();
    return signer;

}

