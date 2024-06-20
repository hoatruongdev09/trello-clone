const { DataTypes, Model } = require('sequelize')
const User = require('./user.model')
const db = require('../database/db')
class Board extends Model {

}

Board.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
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
    modelName: 'boards'
})

User.hasMany(Board, {
    foreignKey: 'admin_id'
})
Board.belongsTo(User, {
    foreignKey: 'admin_id'
})

module.exports = Board