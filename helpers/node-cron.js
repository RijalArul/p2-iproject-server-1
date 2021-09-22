const axios = require('axios')
var cron = require('node-cron');
const { Op } = require('sequelize');
const { Meeting, User } = require('../models')

const crons = cron.schedule('*/30 * * * *', async () => {
    const thirtyMinutes = new Date(new Date().setDate(new Date().getMinutes() + 30));
    const data = await Meeting.findAll({
        where: {
            schedule: {
                [Op.gt]: new Date(),
                [Op.lt]: thirtyMinutes
            }
        }, include: {
            model: User,
            attributes: {
                exlcude: ['createdAt', 'updatedAt', 'password']
            }
        }
    });

    for (let i = 0; i < data.length; i++) {
            return axios({
                url: `https://discord.com/api/v9/channels/890116074274701376/messages`,
                headers: {
                    "Authorization": "Bot ODkwMTEyOTM1MzIwNTE4NzE2.YUrERQ.GRtECphOuFYADJJ0TeT5CI4Ke1s"
                },
                method: "POST",
                data: {
                    "content": `Halo hari ini kamu harus ${data[i].activity} ya <@${data[i].User.idDiscord}>`
                }
            })
                
    }
    
}, {
    scheduled: false,
    timezone: "Asia/Jakarta"
});


module.exports = crons