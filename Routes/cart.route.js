import {
  addToCart,
  DecreaseProductQty,
  deleteAllCartItems,
  deleteCartItem,
  userCart,
} from "../Controllers/cart.controller.js";
import { Authenticated } from "../Middlewares/IsAuth.js";
import express from "express";
const router = express.Router();
router.post("/add", Authenticated, addToCart);
router.get("/usercart", Authenticated, userCart);
router.delete("/remove/:productId", Authenticated, deleteCartItem);
router.delete("/removeall", Authenticated, deleteAllCartItems);
router.post("/--qty", Authenticated, DecreaseProductQty);
export default router;
