import mongoose from "mongoose";

const NFTschema = new mongoose.Schema({
    email:{
        type : mongoose.Schema.Types.ObjectId,
        ref:"User",
        unique: true,
        required: [true,"Enter email address"],
    },
    address:{
        type : String,
        unique:true,
        required:[true,"Do log in first"],
    },
    name:{
        type : String,
        unique: true,
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
        requried:[true,"Enter category"],
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

const NFT = mongoose.models.NFT || mongoose.model("NFT",NFTschema)

export default NFT