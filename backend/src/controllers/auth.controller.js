import User from "../models/User.js";
import jwt from "jsonwebtoken";

export async function signup(req, res){


    const {email, password, fullName} = req.body;

    try {
        if (!email || !password || !fullName){
            return res.status(400).json({error: "Missing fields"});
        }

        if (password.length < 6){
            return res.status(400).json({error: "Password must be at least 6 characters"});
        }

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailRegex.test(email)){
            return res.status(400).json({error: "Invalid email format"});
        }

        const existingUser = await User.findOne({email});

        if (existingUser){
            return res.status(400).json({error: "Email already exists"});
        }


        const index = Math.floor(Math.random() * 100 ) + 1; // gen a number between 1-100

        const randomPic = `https://avatar.iran.liara.run/public/${index}.png`;

        const newUser = new User.create({
            email,
            fullName,
            password,
            profilePic:randomPic,
            
        })

        const token = jwt.sign({userId:newUser._id}, process.env.JWT_SECRET, {expiresIn: "7d"},);

    } catch (error) {
        
    }
}

export async function login(req, res){
    res.send("Login route");
}

export function logout(req, res){
    res.send("Logout route");
}