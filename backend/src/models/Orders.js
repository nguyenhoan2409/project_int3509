const { DataTypes } = require("sequelize");
const { database } = require("../config/database");

const Orders = database.define(
  "orders",
  {
    order_id: {
        type: DataTypes.INTEGER, 
        defaultValue: DataTypes.UUIDV4,
        allowNull: true, 
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER, 
        allowNull: true,
    },
    product_id: {
        type: DataTypes.INTEGER, 
        allowNull: true,
    },
    quantity: {
        type: DataTypes.INTEGER, 
        allowNull: true,
    },
    total_money: {
        type: DataTypes.INTEGER, 
        allowNull: true,
    },
    timeline: {
        type: DataTypes.STRING, 
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
    status: {
        type: DataTypes.STRING, 
        allowNull: true,
    },
    note: {
        type: DataTypes.STRING, 
        allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Orders
