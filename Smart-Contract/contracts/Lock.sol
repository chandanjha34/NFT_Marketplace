// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract NFT_Minting is ERC721URIStorage, Ownable{
    uint256 public tokenCounter;

    struct NFT{
        string tokenId;
    }

    event NFT_Minted(uint256 tokenId , address index);
    event NFT_Transfered(uint256 tokenId , address index);

    mapping(uint256=>address)public NFTOwner;

    constructor() ERC721("NFT Marketplace", "NFToken") Ownable(msg.sender){
        tokenCounter=0;
    }

    function mintNFT(string memory tokenURI) public returns (uint256){
        address to = msg.sender;
        _safeMint(to, tokenCounter);
        _setTokenURI(tokenCounter, tokenURI);
        NFTOwner[tokenCounter]=msg.sender;
        tokenCounter++;
        emit NFT_Minted(tokenCounter-1, msg.sender);
        return tokenCounter-1;
    }

    function NFT_transfer(uint256 _tokenID ,uint price) payable   public{
        address seller = NFTOwner[_tokenID];

        require(msg.value>=price,"Low Balance");
        require(seller!=msg.sender,"You are already the owner of this NFT");

        payable(seller).transfer(price);

        _transfer(seller, msg.sender, _tokenID);

        NFTOwner[_tokenID]=msg.sender;
        emit NFT_Transfered(_tokenID , msg.sender );
    }
}