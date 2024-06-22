const { Model, DataTypes, Sequelize } = require('sequelize')
const Board = require('../models/board.model')
const db = require('../database/db')
const { v4 } = require('uuid')

class BoardList extends Model {

}

BoardList.init({
    id: {
        type: DataTypes.UUID,
        allowNull: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    boardId: {
        field: 'board_id',
        type: DataTypes.UUID,
        allowNull: false
    },
    status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    order: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    createdAt: {
        field: 'created_at',
        type: DataTypes.DATE
    },
    updatedAt: {
        field: 'updated_at',
        type: DataTypes.DATE
    },
},
    {
        sequelize: db,
        modelName: 'board_lists',
        timestamps: true
    }
)

BoardList.beforeCreate((board) => {
    board.id = v4()
})

BoardList.belongsTo(Board, {
    foreignKey: 'board_id'
})
Board.hasMany(BoardList, {
    foreignKey: 'board_id'
})

module.exports = BoardList