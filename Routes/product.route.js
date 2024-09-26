import express from "express";
import { addProduct, deleteProductById, getProduct, getProductById, updateProductById } from "../Controllers/product.controller.js";
const router = express.Router();
router.post("/add",addProduct)
router.get("/all",getProduct)
router.get("/:id",getProductById)
router.put("/update/:id",updateProductById)
router.delete("/delete/:id",deleteProductById)
export default router;