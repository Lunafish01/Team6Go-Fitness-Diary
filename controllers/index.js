const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const food = require('./food');
const steps = require('./steps');
const water = require('./water');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);


module.exports = router;