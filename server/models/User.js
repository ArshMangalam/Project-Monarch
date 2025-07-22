// server/models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    default: 1,
  },
  registeredAt: {
    type: Date,
    default: Date.now,
  },
  isInPenaltyZone: {
    type: Boolean,
    default: false,
  },
  level: { 
    type: Number, 
    default: 1 
  },
  xp: { 
    type: Number, 
    default: 0 
  },
  xpToNextLevel: { 
    type: Number, 
    default: 100 
  },
  stats: {
    unspentPoints: { 
      type: Number, 
      default: 0 
    },
    strength: { 
      type: Number, 
      default: 10 
    },
    agility: { 
      type: Number, 
      default: 10 
    },
    stamina: { 
      type: Number, 
      default: 10 
    },
    intelligence: { 
      type: Number, 
      default: 10 
    },
  },
  registeredAt: { 
    type: Date, 
    default: Date.now 
  },
});

module.exports = mongoose.model('User', UserSchema);