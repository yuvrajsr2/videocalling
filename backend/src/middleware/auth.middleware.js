import jwt from "jsonwebtoken";
import User from "../models/User.js";


/**
 * Protects routes by verifying the JWT token in the cookies
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 * @returns {void} - Next middleware function is called if the JWT token is valid, otherwise a 401 error is returned
 */
export const protectRoute = async (req, res, next) =>{
    

    // check if the user is logged in
    try {
        // get the token from the cookies
        const token = req.cookies.jwt;


        // check if the token exists
        if (!token){
            return res.status(401).json({message:"Not authorized"});
        }

        // verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);


        // check if the token is valid
        if (!decoded){
            return res.status(401).json({message:"Not authorized - invalid token"});
        }

        // check if the user exists
        const user = await User.findById(decoded.userId).select("-password");

        // check if the user exists
        if (!user){
            return res.status(401).json({message:"Not authorized - user not found"});
        }

        // attach the user to the request
        req.user = user;
        next();

        
    } catch (error) {
        console.log(error);
        return res.status(401).json({message:"Server error"});
        
    }

}