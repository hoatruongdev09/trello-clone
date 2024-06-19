const { Router } = require('express')
const authController = require('../controllers/auth.controller.js')

const router = Router()

router.get('/list', authController.listAllUsers)

router.post('/register', authController.register)
router.post('/login', authController.login)

module.exports = router