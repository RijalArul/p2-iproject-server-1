const { User } = require('../models');

class UserController {
    static async register(req, res) {
        try {
            const payload = {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                phoneNumber: req.body.phoneNumber
            }

            const create = await User.create(payload);

            res.status(201).json({
                id: create.id,
                email: create.email
            })
        } catch (err) {
            res.send(err)
        }
    }
}

module.exports = UserController