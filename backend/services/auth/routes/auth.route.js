import { Router } from "express";
import { deductCredits, loginUser, logoutUser, updateUserPayment } from "../controllers/auth.controllers.js";

const router = Router();

router.post("/login", loginUser)
router.get("/logout", logoutUser)
router.post("/update-plan", updateUserPayment)
router.post("/deduct-credits", deductCredits)

export default router;