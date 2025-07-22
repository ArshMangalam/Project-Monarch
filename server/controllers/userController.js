// server/controllers/userController.js
const User = require('../models/User');

// @desc    Get logged in user data
exports.getMe = async (req, res) => {
  try {
    // req.user.id is accessible because of our authMiddleware
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Allocate a stat point
exports.allocateStatPoint = async (req, res) => {
  const { statToIncrease } = req.body;
  const validStats = ['strength', 'agility', 'stamina', 'intelligence'];

  if (!validStats.includes(statToIncrease)) {
    return res.status(400).json({ msg: 'Invalid stat' });
  }

  try {
    const user = await User.findById(req.user.id);
    if (user.stats.unspentPoints > 0) {
      user.stats.unspentPoints -= 1;
      user.stats[statToIncrease] += 1;
      await user.save();
      res.json(user);
    } else {
      res.status(400).json({ msg: 'No unspent points' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Clear the user's penalty status
exports.clearPenalty = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        user.isInPenaltyZone = false;
        await user.save();
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};