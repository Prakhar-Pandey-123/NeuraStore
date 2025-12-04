import  express  from "express";
import  mongoose  from "mongoose";

export const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI as string);
        console.log("db connected successfully")
    }
    catch(error){
        console.log("db error",error)
        process.exit(1);
    }
}


const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})
const userModel=mongoose.model("users",userSchema)
export {userModel}





const contentSchema=new mongoose.Schema({
    link:{
        type:String,
        required:true
    },
    type:{
        type:String,
        enum:["youtube","twitter","github","others"],
        required:true
    },
    title:{type:String,required:true},
    tags:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"tags",
        }
    ],
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    }
})
const contentModel=mongoose.model("content",contentSchema);
export {contentModel}





const tagsSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    }
})
const tagsModel=mongoose.model("tags",tagsSchema)
export {tagsModel}





const linkSchema=new mongoose.Schema({
    hash:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    }
})
const linkModel=mongoose.model("link",linkSchema)
export {linkModel}