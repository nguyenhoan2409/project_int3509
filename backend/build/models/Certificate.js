"use strict";

var _require = require("sequelize"),
  DataTypes = _require.DataTypes;
var _require2 = require("../config/database"),
  database = _require2.database;
var Certificate = database.define("certificate", {
  certificate_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  mssv: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  fullname: {
    type: DataTypes.STRING,
    allowNull: true
  },
  "class": {
    type: DataTypes.STRING,
    allowNull: true
  },
  university: {
    type: DataTypes.STRING,
    allowNull: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true
  },
  phonenumber: {
    type: DataTypes.STRING,
    allowNull: true
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true
  },
  rental_time: {
    type: DataTypes.STRING,
    allowNull: true
  },
  return_time: {
    type: DataTypes.STRING,
    allowNull: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: "certificate",
  timestamps: false
});
module.exports = Certificate;