// server/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

// @route   POST api/auth/register
// @desc    Register a new user
router.post('/register', registerUser);
// @route   POST api/auth/login
// @desc    Add this new route
router.post('/login', loginUser);

module.exports = router;