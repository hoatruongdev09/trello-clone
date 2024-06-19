const customResponse = (req, res, next) => {
    res.success = (message, data, statusCode = 200) => {
        res.json({
            message,
            error: false,
            code: statusCode,
            data
        })
    }

    res.error = (message, error, statusCode = 500) => {
        res.json({
            message: message,
            error: true,
            code: statusCode,
            data: error
        })
    }
    next()
}

module.exports = customResponse