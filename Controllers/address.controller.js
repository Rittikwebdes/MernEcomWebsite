import { Address } from "../Models/address.model.js";

export const addAddress = async (req, res) => {
  
  const { fullName, address, city, state, country, pincode ,phoneNumber } =
    req.body;
  let userId = req.user;
  let userAddress = await Address.create({
    userId,
    fullName,
    address,
    city,
    state,
    country,
    pincode,
    phoneNumber
  });
  res.status(200).json({ message: "Address added successfully", userAddress ,success: true });
};


export const getAddress = async(req,res)=>{
    let address = await Address.find({userId:req.user}).sort({createdAt:-1})
    res.status(200).json({message:"Here's user's address",userAddress:address[0]})
}
