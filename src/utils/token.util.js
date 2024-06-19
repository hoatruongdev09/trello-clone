require('dotenv').config()
const jwt = require('jsonwebtoken')
const randToken = require('rand-token')

const secret = process.env.APP_SECRET

const randomTokenSize = 16

const sign = (payload, expired) => {
    const token = jwt.sign(payload, secret, {
        expiresIn: expired
    })
    return token
}

const decode = (token) => {
    try {
        const data = jwt.verify(token, secret)
        return data
    } catch (error) {
        throw error
    }
}

const generateRandToken = () => {
    return randToken.generate(randomTokenSize)
}

module.exports = {
    sign,
    decode,
    generateRandToken
}