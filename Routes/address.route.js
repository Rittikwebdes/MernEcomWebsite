import express from "express";
import { addAddress, getAddress } from "../Controllers/address.controller.js";
import { Authenticated } from "../Middlewares/IsAuth.js";
const router = express.Router();
router.post("/add",Authenticated, addAddress)
router.get("/getaddress", Authenticated, getAddress)
export default router;