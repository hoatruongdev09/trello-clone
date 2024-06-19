const Note = require('../models/note.model')

const create = async (req, res) => {
    try {
        const { title = 'new note', description = '' } = req.body
        const newNote = Note.build({
            title,
            description
        })
        const data = await newNote.save()
        res.success('', data, 200)
    } catch (error) {
        res.error('internal error', error, 500);
    }
}

const listAll = async (req, res) => {
    try {
        const notes = await Note.findAll()
        res.success('', notes, 200)
    } catch (error) {
        res.error('internal error', error, 500);
    }
}

const getNoteDetail = async (req, res) => {
    try {
        const { id } = req.params
        const note = await Note.findByPk(id)
        if (!note) {
            return res.error("note is note found", null, 404)
        }
        res.success('', note, 200)
    } catch (error) {
        res.error('internal error', error, 500);
    }
}

const removeNote = async (req, res) => {
    try {
        const { id } = req.params
        const data = await Note.destroy({
            where: {
                id
            }
        })
        res.success('ok', null, 200)
    } catch (error) {
        res.error('internal error', error, 500);
    }
}

module.exports = {
    create,
    listAll,
    getNoteDetail,
    removeNote
}