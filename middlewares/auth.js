const { Meeting } = require('../models');
const jwt = require('jsonwebtoken');

function authenthication(req, res, next) {
    try {
        const headers = req.headers.access_token
        const payload = jwt.verify(headers, process.env.JWT_SECRET_KEY);
        req.userData = payload
        next();
    } catch (err) {
        next(err)
    }
}

async function authorization(req, res, next) {
    try {
        const meeting = await Meeting.findOne({
            where: {
                id: req.params.id
            }
        });
        
        if(meeting) {
            if(meeting.userId === req.userData.id) {
                next()
            } else {
                throw ({ name: "ForbiddenAccess"})
            }
        } else {
            throw ({ name: "DataNotFound"})
        }
    } catch (err) {
        next(err)
    }
}

module.exports = {
    authenthication,
    authorization
}