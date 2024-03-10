const { DataTypes } = require("sequelize");
const { database } = require("../config/database");

const Products = database.define(
  "products",
  {
    product_id: {
        type: DataTypes.INTEGER, 
        allowNull: false, 
        primaryKey: true
    },
    category_id: {
        type: DataTypes.INTEGER, 
        allowNull: true,
    },
    product_name: {
        type: DataTypes.STRING, 
        allowNull: true,
    },
    price: {
        type: DataTypes.INTEGER, 
        allowNull: true,
    },
    quantity: {
        type: DataTypes.INTEGER, 
        allowNull: true,
    },
    thumbnail: {
        type: DataTypes.STRING, 
        allowNull: true,
    },
    description: {
        type: DataTypes.STRING, 
        allowNull: true,
    },
    status: {
        type: DataTypes.STRING, 
        allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Products
