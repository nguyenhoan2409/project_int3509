"use strict";

var _require = require("sequelize"),
  DataTypes = _require.DataTypes;
var _require2 = require("../config/database"),
  database = _require2.database;
var Notification = database.define("notification", {
  notification_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: true
  },
  content: {
    type: DataTypes.STRING,
    allowNull: true
  },
  url: {
    type: DataTypes.STRING,
    allowNull: true
  },
  create_time: {
    type: DataTypes.STRING,
    allowNull: true
  }
});
module.exports = Notification;