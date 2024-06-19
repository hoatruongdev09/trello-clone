require('dotenv').config

const { Sequelize } = require('sequelize')
const getAppConfig = require('../../config/get-app-config.js')

const config = getAppConfig()



const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
        host: config.host,
        port: config.port,
        dialect: config.dialect
    }
)

const testConnection = async () => {
    try {
        await sequelize.authenticate()
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error("Unable to connect to the database: ", error)
    }
}

testConnection()

module.exports = sequelize