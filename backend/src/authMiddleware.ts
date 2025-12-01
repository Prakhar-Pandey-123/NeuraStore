import express from "express"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

export const authMiddleware= async(req:any,res:any,next:any)=>{
    try{
        const JWT_SECRET=process.env.JWT_SECRET as string;
        
    let token =req.headers["authorization"];
    // let token = req.headers["authorization"]?.split(" ")[1];

    if(!token){
        return res.status(400).json({
            success:false,
            message:"invalid input -1"
        })
    }
    // let user=jwt.verify(token as string,JWT_SECRET);
    // if(!user){
    //     return res.status(400).json({
    //         success:false,
    //         message:"token not found"
    //     })
    // }
    const payload = jwt.verify(token as string, JWT_SECRET) as { id: string; username: string };
   req.body.userId = payload.id;

    next();
    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"internal server error"
        })
    }
}