const User = require('../models/user.model')

const getUserInfo = async (req, res) => {
    const { id, email, first_name, last_name } = req.user
    res.success('ok', {
        id,
        email,
        first_name,
        last_name
    })
}

const findUserEmail = async (req, res) => {
    try {

        const { email } = req.params
        const user = await User.findOne({ where: { email } })
        if (!user) {
            return res.error('user-is-not-found', new Error('user-is-not-found'), 404)
        }
        const { id, first_name, last_name } = user
        res.success('ok', {
            id, first_name, last_name, email
        })

    } catch (error) {
        console.error(error)
        res.error('internal-error', error);
    }
}

module.exports = {
    getUserInfo,
    findUserEmail
}