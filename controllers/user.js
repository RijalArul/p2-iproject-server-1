const { checkPassword } = require('../helpers/bcrypt');
const generateToken = require('../helpers/jwt');
const { User } = require('../models');

class UserController {
    static async register(req, res, next) {
        try {
            const payload = {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                idDiscord: req.body.idDiscord
            }

            const create = await User.create(payload);

            res.status(201).json({
                id: create.id,
                email: create.email
            })
        } catch (err) {
            next(err)
        }
    }

    static async login(req, res, next) {
        try {
            const payload = {
                email: req.body.email,
                password: req.body.password
            }

            const user = await User.findOne({
                where: {
                    email: payload.email
                }
            })

            if(user) {
                const matchPassword = checkPassword(payload.password, user.password);

                if(matchPassword) {
                    const access_token = generateToken({ id: user.id, email: user.email, username: user.username, idDiscord: user.idDiscord});
                    res.status(200).json({
                        id: user.id,
                        email: user.email,
                        access_token: access_token
                    })
                } else {
                    throw ({ name: "Unauthenthicated" });
                }
            } else {
                throw ({ name: "UserNotFound" });
            }
        } catch (err) {
            next(err)
        }
    }
}

module.exports = UserController