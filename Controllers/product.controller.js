import { Products } from "../Models/product.model.js";

export const addProduct = async (req, res) => {
  const { title, description, price, category, qty, imgSrc } = req.body;
  try {
    let product = await Products.create({
      title,
      description,
      price,
      category,
      qty,
      imgSrc,
    });
    res.status(200).json({message:"product added successfully",product})
  } catch (error) {
    res.status(400).json(error.message)
  }
};

export const getProduct = async(req,res)=>{
    try {
        let products = await Products.find().sort({createdAt:-1})
        res.status(200).json({message:"here's your products",products})
    } catch (error) {
        res.status(400).json(error.message)
    }
}

export const getProductById = async(req,res)=>{
    try {
        const id = req.params.id;
        let product = await Products.findById(id)
        if(!product) return res.status(404).json({message:"invalid id"})
        res.status(200).json({message:"here's your product",product})
    } catch (error) {
        res.status(400).json(error.message)
    }
}

export const updateProductById = async(req,res)=>{
    try {
        const id = req.params.id;
        let product = await Products.findByIdAndUpdate(id,req.body,{new:true})
        if(!product) return res.status(404).json({message:"invalid id"})
        res.status(200).json({message:"Updated successfully",product})
    } catch (error) {
        res.status(400).json(error.message)
    }
}
export const deleteProductById = async(req,res)=>{
    try {
        const id = req.params.id;
        let product = await Products.findByIdAndDelete(id)
        if(!product) return res.status(404).json({message:"invalid id"})
        res.status(200).json({message:"Deleted successfully",product})
    } catch (error) {
        res.status(400).json(error.message)
    }
}
