const Board = require('../models/board.model')
const BoardList = require('../models/board_list.model')
const Note = require('../models/note.model')

const create = async (req, res) => {
    try {
        const { id } = req.user
        const { list_board_id, title = 'new note', description = '' } = req.body
        const newNote = Note.build({
            title,
            description,
            boardListId: list_board_id,
            creator_id: id
        })
        await newNote.save()
        res.success('', newNote)
    } catch (error) {
        res.error('internal-error', error);
    }
}

const listAll = async (req, res) => {
    try {
        const notes = await Note.findAll()
        res.success('', notes)
    } catch (error) {
        res.error('internal-error', error);
    }
}

const getNoteDetail = async (req, res) => {
    try {
        const { id } = req.params
        const note = await Note.findByPk(id)
        if (!note) {
            return res.error("note-is-not-found", null, 404)
        }
        res.success('', note)
    } catch (error) {
        res.error('internal-error', error);
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
        res.success('ok', null)
    } catch (error) {
        res.error('internal-error', error);
    }
}

const updateNote = async (req, res) => {
    try {
        const { id } = req.params
        const { title, description } = req.body
        const note = await Note.findByPk(id)
        if (!note) {
            return res.error("note-is-not-found", null, 404)
        }
        note.title = title
        note.description = description
        const data = await note.save()
        res.success('ok', note)
    } catch (error) {
        res.error('internal-error', error);
    }
}

const moveNoteToList = async (req, res) => {
    try {
        const { note_id, list_id } = req.body
        const note = await Note.findByPk(note_id)
        if (!note) {
            return res.error("note-is-not-found", null, 404)
        }
        const boardList = await BoardList.findByPk(list_id)
        if (!boardList) {
            return res.error("list-is-not-found", null, 404)
        }
        note.boardListId = list_id
        const data = await note.save()
        res.success('ok', data)
    } catch (error) {
        res.error('internal-error', error);
    }
}

module.exports = {
    create,
    listAll,
    getNoteDetail,
    removeNote,
    updateNote,
    moveNoteToList
}