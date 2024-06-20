const { Router } = require('express')
const authMiddleWares = require('../middlewares/auth.middleware')
const boardController = require('../controllers/board.controller')

const route = Router()

route.post('/create', authMiddleWares, boardController.createBoard)
route.put('/update/:id', authMiddleWares, boardController.updateBoard)
route.get('/:id', boardController.getBoardInfo)

module.exports = route