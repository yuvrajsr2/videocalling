import express from 'express';
import { getRecommendations, getFriends } from '../controllers/user.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';


const router = express.Router();


// apply protectRoute middleware to all the routes
router.use(protectRoute);

router.get("/", getRecommendations);
router.get("/friends",getFriends);

export default router;