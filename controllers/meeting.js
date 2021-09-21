const { Meeting, User } = require('../models');

class MeetingController {
    static async postMeeting(req, res, next) {
        try {
            const payload = {
                date: req.body.date,
                time: req.body.time,
                activity: req.body.activity,
                userId: req.userData.id
            }

            const create = await Meeting.create(payload);

            res.status(201).json(create)
        } catch (err) {
            next(err)
        }
    }
}

module.exports = MeetingController