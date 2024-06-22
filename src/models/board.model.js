const { DataTypes, Model } = require('sequelize')
const User = require('./user.model')
const db = require('../database/db')
const { v4 } = require('uuid')
class Board extends Model {
    static setClosed(board) {
        board.status = 1
    }
    static setOpened(board) {
        board.status = 0
    }
}


Board.init({
    id: {
        type: DataTypes.UUID,
        allowNull: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    admin_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    listIndex: {
        field: 'list_index',
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    createdAt: {
        field: 'created_at',
        type: DataTypes.DATE
    },
    updatedAt: {
        field: 'updated_at',
        type: DataTypes.DATE
    }
}, {
    sequelize: db,
    timestamps: true,
    modelName: 'boards',
    hooks: {
        beforeCreate: (board) => {
            console.log("before create")
            board.id = v4()
        }
    }
})

User.hasMany(Board, {
    foreignKey: 'admin_id'
})
Board.belongsTo(User, {
    foreignKey: 'admin_id'
})

module.exports = Board