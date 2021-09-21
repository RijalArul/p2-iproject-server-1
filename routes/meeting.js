const MeetingController = require('../controllers/meeting');
const { authenthication } = require('../middlewares/auth');
const errorHandler = require('../middlewares/error-handler');
const router = require('express').Router();

router.use(authenthication);
router.post('/', MeetingController.postMeeting);

router.use(errorHandler)

module.exports = router