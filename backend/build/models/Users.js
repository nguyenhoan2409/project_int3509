"use strict";

var _require = require("sequelize"),
  DataTypes = _require.DataTypes;
var _require2 = require("../config/database"),
  database = _require2.database;
var User = database.define("users", {
  user_id: {
    type: DataTypes.INTEGER,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true
  },
  fullname: {
    type: DataTypes.STRING,
    allowNull: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: true
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true
  },
  role_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  isVerified: {
    type: DataTypes.TINYINT,
    allowNull: true
  }
}, {
  timestamps: false
});
module.exports = User;