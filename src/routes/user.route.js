const { Router } = require('express')
const authMiddleWares = require('../middlewares/auth.middleware')
const userController = require('../controllers/user.controller')
const router = Router()

router.get('/info', authMiddleWares, userController.getUserInfo)
router.get('/find-user-email/:email', userController.findUserEmail)

module.exports = router