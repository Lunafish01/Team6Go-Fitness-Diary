const { Water } = require('../models');

const waterData = [
    {
        user_id: 1,
        date: '2023-08-06',
        daily_goal: 64,
        actual_intake: 16,
    },
    {
        user_id: 2,
        date: '2023-09-28',
        daily_goal: 128,
        actual_intake: 64,
    },
    {
        user_id: 3,
        date: '2023-12-28',
        daily_goal: 64,
        actual_intake: 0,
    }
]

const seedWater = () => Water.bulkCreate(waterData);

module.exports = seedWater;