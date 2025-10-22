import express from 'express';
import dotenv from 'dotenv';
import authRoutes from "./routes/auth.route.js"
import { connectDB } from './lib/db.js';

dotenv.config();

// express app
const app = express();
const PORT = process.env.PORT || 5001;


// middle ware
app.use("/api/auth", authRoutes);





// start server
app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
    connectDB();
})