const usersRoutes = require('./user');
const router = require('express').Router();

router.use('/users', usersRoutes);

module.exports = router