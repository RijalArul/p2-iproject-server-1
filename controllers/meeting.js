const { Meeting, User } = require('../models');
const dayjs  = require('dayjs');
const { Op } = require('sequelize')

class MeetingController {
    static async postMeeting(req, res, next) {
        try {
            const payload = {
                schedule: req.body.schedule,
                scheduleUnix: dayjs(req.body.schedule).unix(),
                activity: req.body.activity,
                userId: req.userData.id
            }

            const create = await Meeting.create(payload);

            res.status(201).json(create)
        } catch (err) {
            next(err)
        }
    }

    static async getAllMeeting(req, res) {
        try {

            const meeting = await Meeting.findAll({
                where: {
                    userId: req.userData.id
                },
                include: {
                    model: User,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'password']
                    }
                }
            });

            res.status(200).json(meeting)
        } catch (err) {
            next(err)
        }
    }

    static async getUnexpiredMeeting(req, res) {
        try {

            const meeting = await Meeting.findAll({
                where: {
                    schedule: {
                        [Op.gt]: new Date()
                    }
                },
                include: {
                    model: User,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'password']
                    }
                }
            });

            res.status(200).json(meeting)
        } catch (err) {
            next(err)
        }
    }

    static async getMeeting(req, res, next) {
        try {

            const meeting = await Meeting.findOne({
                where: {
                    id: req.params.id
                },
                include: {
                    model: User,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'password']
                    }
                }
            });

            res.status(200).json(meeting)

        } catch (err) {
            next(err)
        }
    }

    static async editMeeting(req, res) {
        try {

            const payload = {
                schedule: req.body.schedule,
                scheduleUnix: dayjs(req.body.schedule).unix(),
                activity: req.body.activity,
                userId: req.userData.id
            }

            const update = await Meeting.update(payload, {
                where: {
                    id: req.params.id
                },
                returning: true
            })

            res.status(200).json({
                id: update[1][0].id,
                schedule: update[1][0].schedule,
                activity: update[1][0].activity
            });
        } catch (err) {
            next(err)
        }
    }

    static async deleteMeeting(req, res, next) {
        try {
            const meeting = await Meeting.findByPk(req.params.id);

            await Meeting.destroy({
                where: {
                    id: meeting.id
                },
                returning: true
            })

            res.status(200).json({
                message: `deleted successfully`
            });
        } catch (err) {
            next(err)
        }
    }
}

module.exports = MeetingController