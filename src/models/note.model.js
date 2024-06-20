const { DataTypes, Model } = require('sequelize')
const db = require('../database/db')
const User = require('./user.model')
class Note extends Model { }

Note.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING,
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

User.hasMany(Note, {
    foreignKey: 'creator_id'
})
Note.belongsTo(User, {
    foreignKey: 'creator_id'
})

module.exports = Note