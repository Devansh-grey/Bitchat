import express from "express";
import { login, logout, signup } from "../controller/authcontroller.js";
import { registerValidation } from "../middleware/validator.js";
import { authenticateUser } from "../middleware/auth.js";

const router = express.Router()

router.post('/signup',registerValidation,signup)
router.post('/login',login)
router.post('/logout',logout)

export default router