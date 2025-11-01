import express from 'express';
import { getRecommendations, getFriends, sendFriendRequest, acceptFriendRequest, getFriendRequests, getOutgoingFriendReqs} from '../controllers/user.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';


const router = express.Router();


// apply protectRoute middleware to all the routes
router.use(protectRoute);

router.get("/", getRecommendations);
router.get("/friends",getFriends);



router.post("/friends-request/:id", sendFriendRequest);
router.put("/friend-request/:id/accept", acceptFriendRequest);

router.get("/friend-requests", getFriendRequests);
router.get("/outgoing-friend-requests", getOutgoingFriendReqs);

export default router;