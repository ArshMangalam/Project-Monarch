// server/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getMe, allocateStatPoint, clearPenalty } = require('../controllers/userController');


// @route   GET api/user/me
// @desc    Get current user's data
// @access  Private
router.get('/me', authMiddleware, getMe);
router.put('/allocate-stat', authMiddleware, allocateStatPoint);
router.put('/clear-penalty', authMiddleware, clearPenalty);

module.exports = router;