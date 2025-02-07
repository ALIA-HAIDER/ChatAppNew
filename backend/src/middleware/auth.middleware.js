import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const protectRoute=async(req,res,next)=>{
    try{
        const token=req.cookies.jwt;


        if(!token){
            return res.status(401).json({message:"Unauthorized token not provided"});
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        console.log(decoded);
        if(!decoded){
            return res.status(401).json({message:"Unauthorized token not valid"});
        }

        const user=await User.findById(decoded.userId).select('-password');//-password means excluding password from user object
        if(!user){
            return res.status(404).json({message:"Unauthorized user not found"});
        }
        req.user=user;                                          

        next();


    }catch(error){
        console.log("protect route error",error.message);
        res.status(500).json({message:"Internal server error"});
    }

}