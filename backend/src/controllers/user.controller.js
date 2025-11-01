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


export async function acceptFriendRequest(req, res){
    try {
        const {id:requestId} = req.params;

        const friendRequest = await FriendRequest.findById(requestId);

        if (friendRequest.recipient.toString() !== req.user.id){
            return res.status(403).json({message:"You arent authrotiued to accept the req"})
        }

        friendRequest.status = "accepted";

        await friendRequest.save();

        // add userId to each other friends list
        await User.findByIdAndUpdate(friendRequest.sender, {
            $addToSet:{friends:friendRequest.recipient},
        })


        await User.findByIdAndUpdate(friendRequest.recipient, {
            $addToSet:{friends:friendRequest.sender},
        })

        res.status(200).json({message:"Friend req accepted"});


    } catch (error) {
        console.log("Error in friend req controller", error.message);
        res.status(500).json({message:"Internal server erorr"});
        
    }
}

export async function getFriendRequests(req, res){
    try {
        const incomingReq = await FriendRequest.find({
            recipieint:req.user.id,
            status:"pending",
        }).populate("sender", "fullName profilePic nativeLanguage learningLanguage");


        const acceptedReq = await FriendRequest.find({
            sender:req.user.id,
            status:"accepted",
        }).populate("recipient", "fullName profilePic");


        res.status(200).json({incomingReq, acceptedReq});
    } catch (error) {
        console.log("Error in getPendingReq controller", error.message);
        res.status(500).json({message:"Interal server error"});
        
    }

}

export async function getOutgoingFriendReqs(req, res){
    try {
        const outgoingReq = await FriendRequest.find({
            sender:req.user.id,
            status:"pending"
        }).populate("recipient", "fullName profilePic nativeLanguage learningLanguage");

        res.status(201).json(outgoingReq);
    } catch (error) {

        console.log("error in getoutgoing req controller", error.message);
        res.status(500).json({message:"Interal server error"});
        
    }
}