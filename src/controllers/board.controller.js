const Board = require('../models/board.model')
const User = require('../models/user.model')
const BoardList = require('../models/board_list.model')
const Note = require('../models/note.model')

const boardStatus = ['open', 'closed', 'delete']

const createBoard = async (req, res) => {
    try {

        const { id } = req.user
        const { name } = req.body

        const newBoard = Board.build({
            name: name,
            admin_id: id,

        })
        const data = await newBoard.save();
        res.success('ok', data)
    } catch (error) {
        res.error('internal error', error, 500);
    }
}

const updateBoard = async (req, res) => {
    try {
        const { id } = req.params
        const { name, description } = req.body
        const board = await Board.findByPk(id)
        if (!board) {
            res.error('Board is not found', new Error('Board is not found'), 404)
        }
        board.name = name
        board.description = description
        const data = await board.save()
        res.success('ok', {
            ...data,
            status: data[data.status]
        })
    } catch (error) {
        console.log(error)
        res.error('internal error', error, 500);
    }
}



const getBoardInfo = async (req, res) => {
    try {
        const { id } = req.params
        const board = await Board.findByPk(id)
        if (!board) {
            res.error('Board is not found', new Error('Board is not found'), 404)
        }
        const { admin_id } = board
        const admin = await User.findByPk(admin_id)
        if (!admin) {
            res.error('Board admin is not found', new Error('Board admin is not found'), 404)
        }
        const data = {
            id: board.id,
            name: board.name,
            description: board.description,
            status: boardStatus[board.status],
            admin: {
                id: admin.id,
                first_name: admin.first_name,
                last_name: admin.last_name,
                email: admin.email
            }
        }
        res.success('ok', data)
    } catch (error) {
        res.error('internal error', error, 500);
    }
}

const closeBoard = async (req, res) => {
    try {
        const { id } = req.user
        const { board_id } = req.params
        console.log(`board id: ${board_id}`)
        const board = await Board.findByPk(board_id)
        if (!board) {
            return res.error('Board is not found', new Error('Board is not found'), 404)
        }
        if (id !== board.admin_id) {
            return res.error('unauthorize',
                new Error('unauthorize'),
                401)
        }
        Board.setClosed(board)
        const data = await board.save()
        res.success('ok', {
            id: data.id,
            name: data.name,
            description: data.description,
            status: boardStatus[data.status]
        })
    } catch (error) {
        // console.log(error)
        res.error('internal error', error, 500);
    }
}

const openBoard = async (req, res) => {
    try {
        const { id } = req.user
        const { board_id } = req.params
        const board = await Board.findByPk(board_id)
        if (!board) {
            return res.error('Board is not found', new Error('Board is not found'), 404)
        }
        if (id !== board.admin_id) {
            return res.error('unauthorize',
                new Error('unauthorize'),
                401)
        }
        Board.setOpened(board)
        const data = await board.save()
        res.success('ok', {
            id: data.id,
            name: data.name,
            description: data.description,
            status: boardStatus[data.status]
        })
    } catch (error) {
        console.log(error)
        res.error('internal error', error, 500);
    }
}

const addList = async (req, res) => {
    try {
        const { board_id } = req.params
        const { name } = req.body
        const board = await Board.findByPk(board_id)
        if (!board) {
            return res.error('Board is not found', new Error('Board is not found'), 404)
        }
        const index = board.listIndex++;
        const list = BoardList.build({
            name: name,
            order: index,
            boardId: board.id
        })
        const data = await list.save()
        await board.save()
        res.success('ok', data)
    } catch (error) {
        console.error(error)
        res.error('internal error', error, 500);
    }
}

const getBoardLists = async (req, res) => {
    try {

        const { board_id } = req.params
        const board = await Board.findByPk(board_id)
        if (!board) {
            return res.error('Board is not found', new Error('Board is not found'), 404)
        }
        const boardList = await BoardList.findAll({
            where: {
                boardId: board_id
            }
        })
        res.success('ok', boardList)

    } catch (error) {
        res.error('internal error', error, 500);
    }
}

const getNotesOfList = async (req, res) => {
    try {
        const { list_id } = req.params
        const boardList = await BoardList.findByPk(list_id)
        if (!boardList) {
            return res.error('List is not found', new Error('List is not found'), 404)
        }
        const notes = await Note.findAll({
            where: {
                boardListId: list_id
            }
        })
        res.success('ok', notes)

    } catch (error) {
        res.error('internal error', error, 500);
    }
}

const updateList = async (req, res) => {
    try {
        const { list_id } = req.params
        const { list_name } = req.body
        const list = await BoardList.findByPk(list_id)
        if (!list) {
            return res.error('List is not found', new Error('List is not found'), 404)
        }
        list.name = list_name
        const data = await list.save();
        res.success('ok', data)

    } catch (error) {
        res.error('internal error', error, 500);
    }
}

module.exports = {
    createBoard,
    updateBoard,
    getBoardInfo,
    closeBoard,
    openBoard,
    addList,
    getBoardLists,
    getNotesOfList,
    updateList
}