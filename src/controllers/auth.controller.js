const User = require('../models/user.model.js')
const { hash, compare } = require('../utils/hash.util.js')
const { sign, decode, generateRandToken } = require('../utils/token.util.js')

const refreshToken = (req, res) => {
    const { authorization } = req.headers
    if (!authorization) {
        return res.error('unauthorized', new Error('unauthorized'), 400)
    }


}

const register = async (req, res) => {
    try {
        const { email, first_name, last_name, password } = req.body
        const existUser = await User.findUserByEmail(email)
        if (existUser) {
            return res.error('account is existed', new Error('account is existed'), 409)
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
        res.error('internal error', error)
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const existUser = await User.findUserByEmail(email)
        if (!existUser) {
            return res.error('user does not exist', new Error('user does not exist'), 404)
        }
        if (!await compare(password, existUser.password)) {
            return res.error('password not match', new Error('password not match'), 400)
        }
        const accessToken = await sign({ userId: existUser.id }, '1w')
        let refreshToken = ""
        if (!existUser.refresh_token) {
            refreshToken = await sign(await generateRandToken(), '30days')
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
        res.error('internal error', error)
    }
}

const listAllUsers = async (req, res) => {
    try {
        const allUser = await User.findAll()
        res.success('ok', allUser)
    } catch (error) {
        res.error('internal error', error)
    }
}



module.exports = {
    register,
    listAllUsers,
    login
}