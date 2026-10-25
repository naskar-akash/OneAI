import { Router } from 'express';
import {agent} from "../controllers/agent.controller.js"
import multer from '../config/multer.js';

const router = Router();

router.post("/chat", multer.single("file"), agent)

export  default router;