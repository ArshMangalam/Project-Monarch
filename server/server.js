// server/server.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const resetDailyQuests = require('./jobs/dailyReset');

// Connect to Database
connectDB();

// Start scheduled jobs
resetDailyQuests();

const app = express();

// CORS Setup
const allowedOrigins = [
  'http://localhost:3000', // For local development
  process.env.FRONTEND_URL  // For deployed frontend
];

app.use(cors({
  origin: function(origin, callback){
      if(!origin) return callback(null, true);
      if(allowedOrigins.indexOf(origin) === -1){
          const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
          return callback(new Error(msg), false);
      }
      return callback(null, true);
  }
}));
app.use(express.json()); // Allows us to parse JSON in request bodies

// Define Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/quests', require('./routes/questRoutes'));

app.get('/api', (req, res) => {
  res.send('The Monarch Server is awake!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));