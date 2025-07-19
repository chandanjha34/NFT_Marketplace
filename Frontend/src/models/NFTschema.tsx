import mongoose from "mongoose";

const NFTschema = new mongoose.Schema({
    userID:{
        type : mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    address:{
        type : String,
        required:[true,"Do log in first"],
    },
    name:{
        type : String,
        required:[true,"Enter Name of this NFT"]
    },
    Description:{
        type: String,
    },
    MediaURL:{
        type: String,
        required:[true,"Enter NFT"]
    },
    Category:{
        type : String,
        enum:["Art","RWA","Icon","Star"],
        required:[true,"Enter category"],
    },

    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true, // Cannot be changed once set
    },
    Price:{
        type:Number,
        default:0,
    },
    bid:{
        type:Number,
    }

})

if (mongoose.models.NFT) {
  delete mongoose.models.NFT;
}
const NFT = mongoose.model("NFT", NFTschema);

export default NFT;