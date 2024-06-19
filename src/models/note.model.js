const { DataTypes, Model } = require('sequelize')
const db = require('../database/db')

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
    }
}, {
    sequelize: db,
    modelName: 'notes',
    timestamps: true
})

module.exports = Note