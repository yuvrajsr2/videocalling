import express from 'express';
import { login, logout, onboard, signup } from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

//  router
const router = express.Router();


// auth post routes for signup login and logout
router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)


router.post("/onboard", protectRoute, onboard);

export default router;