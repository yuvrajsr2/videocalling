import express from 'express';
import dotenv from 'dotenv';
import authRoutes from "./routes/auth.route.js"
import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';

dotenv.config();

// express app
const app = express();
const PORT = process.env.PORT || 5001;




// middle ware
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);





// start server
app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
    connectDB();
})