import { ethers } from 'ethers';

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
