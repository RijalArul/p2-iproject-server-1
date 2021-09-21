function errorHandler(err, req, res, next) {
    let statusCode = 500;
    let message;
    if(err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError") {
        statusCode = 400
        message = err.errors[0].message
    } else if(err.name === "Unauthenthicated") {
        statusCode = 401
        message = 'You are notauthorized'
    } else if(err.name === "UserNotFound" || err.name === "DataNotFound") {
        statusCode = 404
        message = 'Not Found'
    }

    res.status(statusCode).json({
        message: message
    })

}

module.exports = errorHandler