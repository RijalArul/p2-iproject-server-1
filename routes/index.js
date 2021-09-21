const userRoutes = require('./user');
const meetingRoutes = require('./meeting');
const router = require('express').Router();

router.use('/users', userRoutes);
router.use('/meetings', meetingRoutes);

module.exports = router