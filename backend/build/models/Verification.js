"use strict";

var _require = require("sequelize"),
  DataTypes = _require.DataTypes;
var _require2 = require("../config/database"),
  database = _require2.database;
var Verification = database.define("verification", {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  code: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'verification',
  timestamps: false
});
module.exports = Verification;