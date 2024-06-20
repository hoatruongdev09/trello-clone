const { DataTypes, Model } = require('sequelize')

const db = require('../database/db.js')

class User extends Model {

    static async updateUserRefreshToken(userId, refreshToken) {
        return await User.update({ refresh_token: refreshToken }, {
            where: {
                id: userId
            }
        })
    }
    static async findUserByEmail(email) {
        return await User.findOne({
            where: {
                email
            }
        })
    }
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    refresh_token: {
        type: DataTypes.STRING,
        allowNull: true
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
    modelName: 'users'
})




module.exports = User