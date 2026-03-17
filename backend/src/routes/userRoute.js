import express from "express";
import { signup } from "../controller/authcontroller.js";
import { registerValidation } from "../middleware/validator.js";

const router = express.Router()

router.post('/signup',registerValidation,signup)
router.get('/login',(req,res) => {
    res.send("login endpoint")
})
router.get('/logout',(req,res) => {
    res.send("logout endpoint")
})

export default router