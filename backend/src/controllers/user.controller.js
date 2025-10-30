import User from "../models/User.js";

export async function getRecommendations(req, res) {

    try {
        const currentUserId = req.user.id;

        const currentUser = req.user;
        const recommendedUsers = await User.find({
            $and:[
                {_id: {$ne : currentUserId}}, // exclude the current user
                {$id: {$nin : currentUser.friends}}, // exclude the current user's friends
                {isOnboarded: true}, // exclude users that are not onboarded
            ]
        })

        res.status(200).json(recommendedUsers);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error" });
        
    }
}

export async function getFriends(req, res) {
    try {
        const user = await User.findById(req.user.id).select("friends").populate(
            "friends", "fullName profilePic nativeLanguage learningLanguage");

        res.status(200).json(user.friends);
    } catch (error) {

        console.log(error);
        res.status(500).json({ error: "Server error" });
        
    }
}