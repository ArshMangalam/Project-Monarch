// server/models/Quest.js
const mongoose = require('mongoose');

const QuestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['DAILY', 'MAIN'],
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  xpReward: { 
    type: Number 
  },
});

module.exports = mongoose.model('Quest', QuestSchema);