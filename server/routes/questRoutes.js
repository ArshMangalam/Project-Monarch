// server/routes/questRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { getQuests, createQuest, updateQuest, deleteQuest } = require('../controllers/questController');

// All routes here are protected
router.route('/').get(auth, getQuests).post(auth, createQuest);
router.route('/:id').put(auth, updateQuest).delete(auth, deleteQuest);

module.exports = router;