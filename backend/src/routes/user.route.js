import express from 'express';
import { getRecommendations, getFriends, sendFriendRequest } from '../controllers/user.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';


const router = express.Router();


// apply protectRoute middleware to all the routes
router.use(protectRoute);

router.get("/", getRecommendations);
router.get("/friends",getFriends);



router.post("/friends-request/:id", sendFriendRequest);
router.put("/friend-request/:id/accept", acceptFriendRequest);

export default router;