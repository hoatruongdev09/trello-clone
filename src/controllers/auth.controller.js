const User = require('../models/user.model.js')
const { hash, compare } = require('../utils/hash.util.js')
const { sign, decode } = require('../utils/token.util.js')

const refreshToken = async (req, res) => {
    const { refreshToken } = req.body
    if (!refreshToken) {
        return res.error('unauthorized', new Error('unauthorized'), 401)
    }
    try {
        const { userId } = decode(refreshToken)
        const user = await User.findByPk(userId)
        if (!user) {
            return res.error('unauthorized', new Error('unauthorized'), 401)
        }
        const accessToken = await sign({ userId: existUser.id }, '1w')
        const { id, first_name, last_name } = user
        res.success('ok', {
            accessToken,
            refreshToken,
            user: {
                id, email, first_name, last_name
            }
        })

    } catch (error) {

    }
}

const register = async (req, res) => {
    try {
        const { email, first_name, last_name, password } = req.body
        const existUser = await User.findUserByEmail(email)
        if (existUser) {
            return res.error('account-is-existed', new Error('account-is-existed'), 409)
        }
        const hashPassword = await hash(password)
        const user = User.build({
            first_name,
            last_name,
            email,
            password: hashPassword
        })
        const data = await user.save();
        res.success('ok', data)
    } catch (error) {
        res.error('internal-error', error)
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const existUser = await User.findUserByEmail(email)
        if (!existUser) {
            return res.error('user-is-not-found', new Error('user-is-not-found'), 404)
        }
        if (!await compare(password, existUser.password)) {
            return res.error('password-is-not-match', new Error('password-is-not-match'), 400)
        }
        const accessToken = await sign({ userId: existUser.id }, '1w')
        let refreshToken = ""
        if (!existUser.refresh_token) {
            refreshToken = await sign({ userId: existUser.id }, '30d')
            await User.updateUserRefreshToken(existUser.id, refreshToken)
        } else {
            refreshToken = existUser.refresh_token
        }
        const { id, first_name, last_name } = existUser
        res.success('ok', {
            accessToken,
            refreshToken,
            user: {
                id, email, first_name, last_name
            }
        })
    } catch (error) {
        console.error(error)
        res.error('internal-error', error)
    }
}

const listAllUsers = async (req, res) => {
    try {
        const allUser = await User.findAll()
        res.success('ok', allUser)
    } catch (error) {
        res.error('internal-error', error)
    }
}



module.exports = {
    refreshToken,
    register,
    listAllUsers,
    login
}