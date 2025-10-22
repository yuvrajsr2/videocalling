import express from 'express';
import { login, logout, signup } from '../controllers/auth.controller.js';

//  router
const router = express.Router();


// auth post routes for signup login and logout
router.post('/api/auth/signup', signup)
router.post('/api/auth/login', login)
router.post('/api/auth/logout', logout)

export default router;