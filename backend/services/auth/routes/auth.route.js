import { Router } from "express";
import { loginUser, logoutUser } from "../controllers/auth.controllers.js";

const router = Router();

router.post("/login", loginUser)
router.get("/logout", logoutUser)

export default router;