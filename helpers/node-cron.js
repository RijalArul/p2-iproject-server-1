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
            const transporter = nodemailer.createTransport({
                service: "hotmail",
                auth: {
                    user: process.env.OUTLOOK_USER,
                    pass: process.env.OUTLOOK_PASS
                }
            })

            const options = {
                from: process.env.OUTLOOK_USER,
                to: el.User.email,
                subject: `Reminder`,
                html: `<b>Halo <@${el.User.idDiscord}> kamu harus ${el.activity} ya di waktu ini ya ${el.schedule}</b>`,
            }

            const send = transporter.sendMail(options, function (err, info) {
                if (err) {
                    console.log(err);
                }
                console.log("Sent: ", info);
            })
            return axios({
                url: `https://discord.com/api/v9/channels/890116074274701376/messages`,
                headers: {
                    "Authorization": `Bot ${process.env.CLIENT_TOKEN_DISCORD}`
                },
                method: "POST",
                data: {
                    "content": `Halo <@${el.User.idDiscord}> kamu harus ${el.activity} ya di waktu ini ya ${el.schedule} `
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