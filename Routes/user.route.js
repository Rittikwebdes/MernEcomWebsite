import express from "express";
import { allUsers, getProfile, login, register } from "../Controllers/user.controller.js";
import { Authenticated } from "../Middlewares/IsAuth.js";
const  router = express.Router();
router.post("/register",register)
router.post("/login",login)
router.get("/allusers",allUsers)
router.get("/getProfile", Authenticated, getProfile)
export default router