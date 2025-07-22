// server/jobs/dailyReset.js
const cron = require('node-cron');
const Quest = require('../models/Quest');
const User = require('../models/User');

const resetDailyQuests = () => {
  // Schedule the task to run at midnight (00:00) every day
  // Cron format: 'minute hour day-of-month month day-of-week'
  cron.schedule('* * * * *', async () => {
    console.log('Running daily quest reset...');
    try {
      const result = await Quest.updateMany(
        { type: 'DAILY' },
        { $set: { isCompleted: false } }
      );
      console.log(`Daily quests reset successfully. ${result.modifiedCount} quests updated.`);
    } catch (error) {
      console.error('Error resetting daily quests:', error);
    }
  }, {
    scheduled: true,
    timezone: "Asia/Kolkata" // It's good practice to set a timezone
  });

  cron.schedule('* * * * *', async () => {
    console.log('Running daily penalty check and quest reset...');
    try {
        // 2. Find all incomplete daily quests
        const incompleteQuests = await Quest.find({ type: 'DAILY', isCompleted: false });

        // Get a unique list of user IDs who failed
        const userIdsToPenalize = [...new Set(incompleteQuests.map(quest => quest.user.toString()))];

        // 3. Apply penalty to those users
        if (userIdsToPenalize.length > 0) {
            await User.updateMany(
                { _id: { $in: userIdsToPenalize } },
                { $set: { isInPenaltyZone: true } }
            );
            console.log(`Penalty applied to ${userIdsToPenalize.length} users.`);
        }

        // 4. Finally, reset all daily quests for the new day
        const result = await Quest.updateMany(
            { type: 'DAILY' },
            { $set: { isCompleted: false } }
        );
        console.log(`Daily quests reset successfully. ${result.modifiedCount} quests updated.`);

    } catch (error) {
        console.error('Error during daily job:', error);
    }
  }, {
      scheduled: true,
      timezone: "Asia/Kolkata"
  });
};

module.exports = resetDailyQuests;