const bcrypt = require('bcrypt')

const hash = async (data) => {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedValue = await bcrypt.hash(data, salt)
        return hashedValue
    } catch (error) {
        throw error;
    }
}

const compare = async (data, hashedValue) => {
    try {
        return await bcrypt.compare(data, hashedValue)
    } catch (error) {
        throw error;
    }
}

module.exports = {
    hash,
    compare
}