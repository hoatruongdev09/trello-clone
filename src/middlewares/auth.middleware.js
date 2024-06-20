const { decode } = require('../utils/token.util.js')
const User = require('../models/user.model.js')

const auth = async (req, res, next) => {
    const { authorization } = req.headers
    if (!authorization) {
        return res.error('unauthorized', new Error('unauthorized'), 401)
    }
    try {
        const { userId } = decode(authorization)
        const user = await User.findByPk(userId)
        if (!user) {
            return res.error('unauthorized', new Error('unauthorized'), 401)
        }
        req.user = user
        next()
    } catch (error) {
        res.fail('access token is not valid', new Error('access token is not valid'), 401)
    }
}

module.exports = auth