const { decode } = require('../utils/token.util.js')

const auth = (req, res, next) => {
    const { authorization } = req.headers
    if (!authorization) {
        return res.error('unauthorized', new Error('unauthorized'), 400)
    }
    
}