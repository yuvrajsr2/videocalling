import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { upsertStreamUser } from "../lib/stream.js";

export async function signup(req, res) {


    const { email, password, fullName } = req.body;

    try {
        if (!email || !password || !fullName) {
            return res.status(400).json({ error: "Missing fields" });
        }

        if (password.length < 6) {
            return res.status(400).json({ error: "Password must be at least 6 characters" });
        }

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid email format" });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ error: "Email already exists" });
        }


        const index = Math.floor(Math.random() * 100) + 1; // gen a number between 1-100

        const randomPic = `https://avatar.iran.liara.run/public/${index}.png`;

        const newUser = await User.create({
            email,
            fullName,
            password,
            profilePic: randomPic,



        });

        try {
            await upsertStreamUser({
                id: newUser._id,
                name: newUser.fullName,
                image: newUser.randomPic || "",
            });

            console.log("stream user created for ", newUser.fullName);
        } catch (error) {
            console.log("error creating stream user", error);
        }





        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" },);

        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true, // prevent XSS attacks,
            sameSite: "strict", // prevent CSRF attacks
            secure: process.env.NODE_ENV === "production",
        });

        res.status(201).json({ success: true, user: newUser });

    } catch (error) {
        console.log("Error in signup controller", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Missing fields" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid email or pass" })
        }

        const isPasswordCorrect = await user.matchPassword(password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid email or pass" })
        }


        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" },);

        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true, // prevent XSS attacks,
            sameSite: "strict", // prevent CSRF attacks
            secure: process.env.NODE_ENV === "production",
        });


        res.status(200).json({ success: true, user });


    } catch (error) {
        console.log("Error in login controller", error);
        res.status(500).json({ error: "Internal server error" });

    }
}

export function logout(req, res) {
    res.clearCookie("jwt");
    res.status(200).json({ success: true, message: "Logged out" });
}

export async function onboard(req, res) {
    try {
        const userId = req.user._id;

        const { fullName, bio, nativeLanguage, learningLanguage, location } = req.body;

        if (!fullName || !bio || !nativeLanguage || !learningLanguage || !location) {
            return res.status(400).json({
                message: "Missing fields",
                missingFields: [
                    !fullName && "fullName",
                    !bio && "bio",
                    !nativeLanguage && "nativeLanguage",
                    !learningLanguage && "learningLanguage",
                    !location && "location",

                ].filter(Boolean),
            });
        }

        const updatedUser = User.findByIdAndUpdate(userId, {
            ...req.body,
            isOnboarded: true,
        }, { new: true });


        if (!updatedUser) {
            return res.status(400).json({ error: "User not found" });
        }

        try {
            await upsertStreamUser({
                id: updatedUser._id.toString(),
                name: updatedUser.fullName,
                image: updatedUser.profilePic || "",
            });

            console.log("Stream user updated for onboard", updatedUser.fullName);
        } catch (error) {
            console.log("error updating stream user", error);
        }

        res.status(200).json({ success: true, user: updatedUser });

    } catch (error) {
        console.log("Error in onboard controller", error);
        res.status(500).json({ error: "Internal server error" });

    }
}