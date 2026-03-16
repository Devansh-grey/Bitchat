import express from 'express';
import dotenv from 'dotenv'

import authRoutes from './routes/auth.js';

dotenv.config()

const app =express()

const port = process.env.port || 5000

app.use('/api/auth',authRoutes)

app.get('/',(req,res)=>{
    res.send("express working")
})

app.listen(port,()=> console.log(`server running on port ${port} `))