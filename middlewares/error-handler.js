function errorHandler(err, req, res, next) {
    let statusCode = 500;
    let message;
    if(err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError") {
        statusCode = 400
        message = err.errors[0].message
    } else if(err.name === "Unauthenthicated" || err.name === "JsonWebTokenError") {
        statusCode = 401
        message = 'You are not authorized'
    } else if(err.name === "UserNotFound" || err.name === "DataNotFound") {
        statusCode = 404
        message = 'Not Found'
    } else if(err.name === "SequelizeDatabaseError") {
        statusCode = 400
        message = err.parent.routine
    } else if(err.name === "ForbiddenAccess") {
        statusCode = 403
        message = 'Forbidden Access'
    } else {
        console.log(err)
    }

    res.status(statusCode).json({
        message: message
    })

}

module.exports = errorHandler