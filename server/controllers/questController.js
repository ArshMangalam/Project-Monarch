// server/controllers/questController.js
const Quest = require('../models/Quest');
const User = require('../models/User');

// @desc    Get all quests for a user
exports.getQuests = async (req, res) => {
  try {
    const quests = await Quest.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(quests);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Create a new quest
exports.createQuest = async (req, res) => {
  const { title, type } = req.body;
  try {
    const newQuest = new Quest({
      title,
      type,
      user: req.user.id,
      xpReward: type === 'DAILY' ? 10 : 50,
    });
    const quest = await newQuest.save();
    res.json(quest);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Update a quest (e.g., mark as complete)
exports.updateQuest = async (req, res) => {
  try {
    let quest = await Quest.findById(req.params.id);
    if (!quest) return res.status(404).json({ msg: 'Quest not found' });
    if (quest.user.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });

    // Only award XP if the quest is being marked as complete for the first time
    if (!quest.isCompleted) {
      quest.isCompleted = true;
      const user = await User.findById(req.user.id);
      user.xp += quest.xpReward;

      // Check for level up
      while (user.xp >= user.xpToNextLevel) {
        user.xp -= user.xpToNextLevel;
        user.level += 1;
        user.stats.unspentPoints += 5; // Award 5 stat points per level
        user.xpToNextLevel = Math.floor(user.xpToNextLevel * 1.5); // Increase XP for next level
      }
      await user.save();
    }

    await quest.save();
    res.json(quest);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Delete a quest
exports.deleteQuest = async (req, res) => {
    try {
        let quest = await Quest.findById(req.params.id);
        if (!quest) return res.status(404).json({ msg: 'Quest not found' });
        if (quest.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }
        await quest.deleteOne();
        res.json({ msg: 'Quest removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};