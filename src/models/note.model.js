const { v4 } = require('uuid')
const { DataTypes, Model } = require('sequelize')
const db = require('../database/db')
const User = require('./user.model')
const BoardList = require('./board_list.model')

class Note extends Model { }

Note.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: true,
    },
    title: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING,
    },
    boardListId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'board_list_id'
    },
    createdAt: {
        field: 'created_at',
        type: DataTypes.DATE
    },
    updatedAt: {
        field: 'updated_at',
        type: DataTypes.DATE
    },
    creator_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    }
}, {
    sequelize: db,
    modelName: 'notes',
    timestamps: true
})

Note.beforeCreate((note) => {
    note.id = v4()
})

User.hasMany(Note, {
    foreignKey: 'creator_id'
})
Note.belongsTo(User, {
    foreignKey: 'creator_id'
})

Note.belongsTo(BoardList, {
    foreignKey: 'board_list_id'
})
BoardList.hasMany(Note, {
    foreignKey: 'board_list_id'
})

module.exports = Note