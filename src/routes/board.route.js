const { Router } = require('express')
const authMiddleWares = require('../middlewares/auth.middleware')
const boardController = require('../controllers/board.controller')

const route = Router()

route.post('/create', authMiddleWares, boardController.createBoard)
route.put('/update/:id', authMiddleWares, boardController.updateBoard)
route.get('/:id', authMiddleWares, boardController.getBoardInfo)

route.post('/close/:board_id', authMiddleWares, boardController.closeBoard)
route.post('/open/:board_id', authMiddleWares, boardController.openBoard)

route.post('/:board_id/add_list', authMiddleWares, boardController.addList)
route.post('/update_list/:list_id', authMiddleWares, boardController.updateList)
route.get('/:board_id/lists', authMiddleWares, boardController.getBoardLists)
route.get('/list_notes/:list_id', authMiddleWares, boardController.getNotesOfList)

module.exports = route