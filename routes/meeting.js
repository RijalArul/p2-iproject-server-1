const MeetingController = require('../controllers/meeting');
const { authenthication, authorization } = require('../middlewares/auth');
const errorHandler = require('../middlewares/error-handler');
const router = require('express').Router();

router.use(authenthication);
router.post('/', MeetingController.postMeeting);
router.get('/', MeetingController.getAllMeeting);
router.get('/active', MeetingController.getUnexpiredMeeting);
router.get('/:id', authorization, MeetingController.getMeeting);
router.put('/edit/:id', authorization, MeetingController.editMeeting);
router.delete('/delete/:id', authorization, MeetingController.deleteMeeting);
router.use(errorHandler)

module.exports = router