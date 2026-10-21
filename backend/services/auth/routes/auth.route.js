import { Router } from "express";
import { loginUser, logoutUser, updateUserPayment } from "../controllers/auth.controllers.js";

const router = Router();

router.post("/login", loginUser)
router.get("/logout", logoutUser)
router.post("/update-plan", updateUserPayment)

export default router;