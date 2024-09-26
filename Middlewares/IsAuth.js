import jwt from "jsonwebtoken"
import { secretKey } from "../server.js"
import { User } from "../Models/user.model.js"

export const Authenticated = async(req,res,next)=>{
const token= req.header("Auth")
if(!token) return res.status(400).json({message:"Please Login First!!!"})
    const decoded = jwt.verify(token,secretKey)
const id = decoded.userId
let user = await User.findById(id)
if(!user) return res.status(404).json({message:"User not exist!!!"})
    req.user = user
next();
// console.log(decoded)
}