const UserController = require('../controllers/user');
const errorHandler = require('../middlewares/error-handler');
const router = require('express').Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/google', UserController.googleAuth);

router.use(errorHandler)
module.exports = router