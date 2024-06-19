require('dotenv').config()

const config = require('./config.js')

const getAppConfig = () => {
    const appEnv = process.env.APP_ENV

    if (appEnv == "production") {
        return config.product
    } else {
        return config.development
    }
}

module.exports = getAppConfig