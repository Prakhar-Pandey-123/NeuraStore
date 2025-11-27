import express from "express"
import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { z} from "zod"
import { userModel,contentModel, tagsModel, linkModel } from "./db.js"
import { authMiddleware } from "./authMiddleware.js"
import { random } from "./utils.js"
import cors from "cors"
import dotenv from "dotenv"
import { connectDB } from "./db.js"

connectDB()
dotenv.config()

const app=express()
app.use(express.json())
app.use(cors())



const signupSchema=z.object({
        username:z.string().min(3).max(10),
        password:z.string().min(8).max(20)
        .regex(/[A-Z]/)
        .regex(/[a-z]/)
        .regex(/[0-9]/)//it show have atleast one 0 - 9 number
    })
app.post("/api/v1/signup",async(req,res)=>{
    try{
         const {username,password}=req.body;
    
    const parsed=signupSchema.safeParse(req.body);

    if(!parsed.success){
        return res.status(411).json({
            message:"wrong inputs",
        })
    }
    const existingUser=await userModel.findOne({username});
    if(username){
        return res.status(409).json({
            message:"user already exists"
        })
    }

    const hashedPassword=await bcrypt.hash(password,10);

    const newuser=await userModel.create({
         username,
        password:hashedPassword
    } 
    )

    return res.status(200).json({
        success:true,
        message:"user created successfully"
    })

    }
   catch(error:any){
    console.log(error)
    return res.status(500).json({
        message:"server error",
        error:error.message
    })
   }

})


app.post("/api/v1/signin",async(req,res)=>{
    try{
        
         const {username,password}=req.body;
         const user=await userModel.findOne({username});
         if(!user){
            return res.status(401).json({
                message:"invalid credentials"
            })
         }
         const compared=await bcrypt.compare(password,user.password);
         if(!compared){
            return res.status(401).json({
                message:"invalid credentials"
            })
         }
         const payload={
            id:user._id,
            username:user.username
         }

         const JWT_SECRET=process.env.JWT_SECRET as string;
         
    const token=jwt.sign(payload,JWT_SECRET,{
        expiresIn:"24h"
    });
    return res.status(200).json({
        token,
        message:"login successful"
    })      
    }
    catch(error:any){
        console.log(error)
        return res.status(500).json({
            message:"internal server error",
            error:error.message
        })
    }
})


app.post("/api/v1/createContent",authMiddleware,async(req,res)=>{
    try {
        const body=req.body;
    if(!body.type || !body.link || !body.title){
        return res.status(411).json({
            success:false,
            message:"invalid input"
        })
    }
    // tasgids are object id in schema
   const tagsIds=[];
   for(let title of body.tags || []){
    let tag=await tagsModel.findOne({title})||await tagsModel.create({title});
    tagsIds.push(tag._id);
   }
    const posted=await contentModel.create({
        type:body.type,
        link:body.link,
        title:body.title,
        tags:tagsIds,
        userId:req.body.userId
    })
    return res.status(200).json({
        success:true,
        posted,
        message:"created the content"
    })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"internal file error"
        })
    }

})


app.post("/api/v1/getContent",authMiddleware,async(req,res)=>{
    try{
        const user=req.body.userId;
    if(!user){
        return res.status(411).json({
            success:false,
            message:"invalid input"
        })
    }
     let content=await contentModel.find({
        userId:user
    }).populate("tags");
        return res.status(200).json({
            success:true,
            message:"got all the content",
            content,
        })
    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"internal server error"
        })
    }    
})

app.delete("/api/v1/deleteContent",authMiddleware,async(req,res)=>{
    try{
        const {id}=req.body;
        if(!id){
            return res.status(400).json({
                success:false,
                message:"invalid input"
            })
        }
        const deleted=await contentModel.findByIdAndDelete(id);
        if(!deleted){
            return res.status(404).json({
                success:false,
                message:"content not found"
            })
        }
            return res.status(200).json({
                success:true,
                message:"successfully deleted"
            })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"internal server error"
        })
    }
})
// share brain link

app.post("/api/v1/brain/share",authMiddleware,async(req,res)=>{
    try{
        const {share}=req.body;
    if(share){
        const existingLink=await linkModel.findOne({userId:req.body.userId});
    // if the link already exists for that user
        if(existingLink){
            return res.status(200).json({
                success:true,
                hash:existingLink.hash
            })
        }
        const hash=random(10);
        await linkModel.create({
            userId:req.body.userId,hash
        })
        return res.status(200).json({
            success:true,
            hash
        })
    }
    else{
        // else it is marked false, hence delete it
        await linkModel.deleteOne({userId:req.body.userId});
        return res.status(200).json({
            success:true,
            message:"removed the link for the user"
        })
    }
    }
    catch(error:any){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:error.message
        })

    }

})


app.listen(300,()=>{
    console.log("app is listening at port 3000");
})
