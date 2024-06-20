const { Router } = require('express')
const authMiddleWares = require('../middlewares/auth.middleware')
const noteController = require('../controllers/note.controller')
const router = Router()

router.post('/create', authMiddleWares, noteController.create)
router.get('/listAll', authMiddleWares, noteController.listAll)
router.get('/detail/:id', authMiddleWares, noteController.getNoteDetail)
router.delete('/remove/:id', authMiddleWares, noteController.removeNote)

module.exports = router