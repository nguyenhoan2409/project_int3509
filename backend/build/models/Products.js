"use strict";

var _require = require("sequelize"),
  DataTypes = _require.DataTypes;
var _require2 = require("../config/database"),
  database = _require2.database;
var Products = database.define("products", {
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  product_type: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  product_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  thumbnail: {
    type: DataTypes.STRING,
    allowNull: true
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  timestamps: false
});
module.exports = Products;