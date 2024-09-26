import { User } from "../Models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { secretKey } from "../server.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const checkEmail = await User.findOne({ email });
    if (checkEmail)
      return res.status(400).json({ message: "Email already exists" , success:false });

    const hash = await bcryptjs.hash(password, 10);
    let user = await User.create({
      name,
      email,
      password: hash,
    });
    res.status(200).json({ message: "user register successfully...", user ,  success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" ,success: false });

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Password is incorrect" ,success: false });
  
    const token = jwt.sign({userId:user._id},secretKey,{
      expiresIn:'365d'
    })
    
    res.status(200).json({ message: `welcome ${user.name}`,token ,success: true});
    console.log(token)
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const allUsers = async (req, res) => {
  try {
    let users = await User.find().sort({ createdAt: -1 });
    res.status(200).json({ message: "Here's all the users", users });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

export const getProfile = async(req,res)=>{
  res.status(200).json({message:"Users Profile", user:req.user})
}