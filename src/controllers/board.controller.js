const Board = require('../models/board.model')
const User = require('../models/user.model')

const createBoard = async (req, res) => {
    try {

        const { id } = req.user
        const { name } = req.body

        const newBoard = Board.build({
            name: name,
            admin_id: id
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
        res.success('ok', data)
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
            name: board.name,
            description: board.description,
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

module.exports = {
    createBoard,
    updateBoard,
    getBoardInfo
}