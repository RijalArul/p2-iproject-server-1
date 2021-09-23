const axios = require('axios');
const dayjs = require('dayjs');
var cron = require('node-cron');
const { Op } = require('sequelize');
const { Meeting, User } = require('../models')
const nodemailer = require('nodemailer')

const crons = cron.schedule('0 */1 * * * *', async () => {
    const currentUnix = dayjs().add(30, 'minute')
    const data = await Meeting.findAll({
        // where: {
        //     scheduleUnix: currentUnix
        // }, 
        include: {
            model: User,
            attributes: {
                exlcude: ['createdAt', 'updatedAt', 'password']
            }
        }
    });

    const promise = data.map((el) => {
        try {
            return axios({
                url: `https://discord.com/api/v9/channels/890116074274701376/messages`,
                headers: {
                    "Authorization": `Bot ${process.env.CLIENT_TOKEN_DISCORD}`
                },
                method: "POST",
                data: {
                    "content": `Halo kamu harus ${el.activity} ya <@${el.User.idDiscord}>`
                }
            })

        } catch (err) {
            console.log(err)
        }
    })

    await Promise.All(promise)

}, {
    scheduled: false,
    timezone: "Asia/Jakarta"
});


module.exports = crons