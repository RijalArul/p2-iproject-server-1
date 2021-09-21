const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

function generatePassword(password) {
    return bcrypt.hashSync(password, salt);
}

function checkPassword(password, generatePassword) {
    return bcrypt.compareSync(password, generatePassword);
}

module.exports = {
    generatePassword,
    checkPassword
}