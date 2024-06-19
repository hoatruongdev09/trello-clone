const { Router } = require('express')
const noteController = require('../controllers/note.controller')
const router = Router()

router.post('/create', noteController.create)
router.get('/listAll', noteController.listAll)
router.get('/detail/:id', noteController.getNoteDetail)
router.delete('/remove/:id', noteController.removeNote)

module.exports = router