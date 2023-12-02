const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const food = require('./food');
const steps = require('./steps');
const water = require('./water');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/food', food);
router.use('/steps', steps);
router.use('/water', water);

router.use((req, res) => {
    res.status(404).end();
    console.log('Route not found')
});
console.log('Route setup complete')

module.exports = router;