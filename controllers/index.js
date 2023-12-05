const express = require('express');
const router = express.Router();
const homeRoutes = require('./homeRoutes');
const apiRoutes = require('./api');

router.use('/', homeRoutes);
router.use("/", apiRoutes);

router.use((req, res) => {
    res.status(404).end();
    console.log('Route not found!')
});
console.log('Route setup complete')

module.exports = router;

