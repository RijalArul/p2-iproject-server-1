const { checkPassword } = require('../helpers/bcrypt');
const generateToken = require('../helpers/jwt');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID_GOOGLE);

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

            if(create) {
                const access_token = generateToken({ id: create.id, email: create.email, username: create.username, idDiscord: create.idDiscord});
                res.status(201).json({
                    id: create.id,
                    email: create.email,
                    idDiscord: create.idDiscord,
                    access_token: access_token
                })
            }

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

    static async googleAuth(req, res, next) {
        try {
            const ticket = await client.verifyIdToken({
                idToken: req.body.idToken,
                audience: process.env.CLIENT_ID
            })
            const user = ticket.getPayload();

            const body = {
                username: user.given_name,
                password: user.at_hash,
                email: user.email,
                idDiscord: process.env.CLIENT_TOKEN_DISCORD
            }
            const createAuth = await User.findOrCreate({
                where: {
                    email: body.email
                },
                defaults: body
            });

            const access_token = generateToken({ id: createAuth[0].id, email: createAuth[0].email, role: createAuth[0].username, idDiscord: createAuth[0].idDiscord })

            res.status(201).json({
                access_token: access_token
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = UserController