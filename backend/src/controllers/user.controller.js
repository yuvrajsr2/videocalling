import User from "../models/User.js";
import FriendRequest from "../models/FriendRequest.js";

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

export async function sendFriendRequest(req, res){
    try {
        const myId = req.user.id;
        const {id:recipientId} = req.params;

        // prevent sending req to urself

        if (myId === recipientId){
            return res.status(400).json({error: "You cannot send a friend request to yourself"});
        }

        const recipient = await User.findById(recipientId);

        if (!recipient){
            return res.status(404).json({error: "User not found"});
        }

        if (recipient.friends.includes(myId)){
            return res.status(400).json({message:"You are alr friends with this guy"});
        }

        const existingReq = await FriendRequest.findOne({
            $or:[
                {sender:myId, recipient:recipientId},
                {sender:recipientId, recipient:myId},
            ],
        });

        if (existingReq){
            return res.status(400).json({message:"Thers alr a friend req between u guys"});
        }

        const friendRequest = await FriendRequest.create({
            sender:myId,
            recipient:recipientId,
        })

        res.status(201).json(friendRequest);




    } catch (error) {
        console.error("error in controller", error.message);
        res.status(500).json({message:"Internal server error"});
        
    }
    
}