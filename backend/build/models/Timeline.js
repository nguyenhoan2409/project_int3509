"use strict";

var _require = require("sequelize"),
  DataTypes = _require.DataTypes;
var _require2 = require("../config/database"),
  database = _require2.database;
var Timeline = database.define("timelines", {
  timeline_id: {
    type: DataTypes.INTEGER,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  start_time: {
    type: DataTypes.STRING,
    allowNull: false
  },
  end_time: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false
});
module.exports = Timeline;