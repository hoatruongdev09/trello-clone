const { Router } = require('express')
const authMiddleWares = require('../middlewares/auth.middleware')
const noteController = require('../controllers/note.controller')
const router = Router()

router.post('/create', authMiddleWares, noteController.create)
router.get('/detail/:id', authMiddleWares, noteController.getNoteDetail)
router.delete('/remove/:id', authMiddleWares, noteController.removeNote)
router.put('/update/:id', authMiddleWares, noteController.updateNote)
router.post('/move_to_list', authMiddleWares, noteController.moveNoteToList)

module.exports = router