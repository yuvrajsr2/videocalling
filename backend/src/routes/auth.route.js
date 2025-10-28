import express from 'express';
import { login, logout, signup } from '../controllers/auth.controller.js';

//  router
const router = express.Router();


// auth post routes for signup login and logout
router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)

export default router;