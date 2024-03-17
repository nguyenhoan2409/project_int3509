const { database } = require("../common/connect");

const { DataTypes } = require("sequelize");
const user = database.define(
        "users",
        {
                user_id: {
                        type: DataTypes.INTEGER, 
                        allowNull: false, 
                        primaryKey: true
                },
                username: {
                        type: DataTypes.STRING, 
                        allowNull: true,
                },
                password: {
                        type: DataTypes.STRING, 
                        allowNull: true,
                },
                fullname: {
                        type: DataTypes.STRING, 
                        allowNull: true,
                },
                email: {
                        type: DataTypes.STRING, 
                        allowNull: true,
                },
                phone_number: {
                        type: DataTypes.STRING, 
                        allowNull: true,
                },
                address: {
                        type: DataTypes.STRING, 
                        allowNull: true,
                },
                role_id: {
                        type: DataTypes.INTEGER, 
                        allowNull: true,
                }
        }
)

module.exports = user