import express from 'express';
import dotenv from 'dotenv'

import authRoutes from './routes/userRoute.js';
import { connectDB } from './utils/db.js';

dotenv.config()

const app =express()

const port = process.env.PORT || 5000
connectDB()

app.use(express.json())

app.use('/api/auth',authRoutes)

app.get('/',(req,res)=>{
    res.send("express working")
})

app.listen(port,()=>{
    console.log(`server running on port ${port} `)
} )