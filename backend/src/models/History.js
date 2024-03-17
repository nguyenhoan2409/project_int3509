const { DataTypes } = require("sequelize");
const { database } = require("../config/database");

const History = database.define(
  "history",
  {
    history_id: {
        type: DataTypes.INTEGER, 
        allowNull: false, 
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER, 
        allowNull: true,
    },
    order_id: {
        type: DataTypes.INTEGER, 
        allowNull: true,
    },
    rental_time: {
        type: DataTypes.STRING, 
        allowNull: true,
    },
    return_time: {
        type: DataTypes.STRING, 
        allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Products
