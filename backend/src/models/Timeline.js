const { DataTypes } = require("sequelize");
const { database } = require("../config/database");

const Timeline = database.define(
  "timelines",
  {
    timeline_id: {
        type: DataTypes.INTEGER, 
        defaultValue: DataTypes.UUIDV4,
        allowNull: false, 
        primaryKey: true
    },
    start_time: {
        type: DataTypes.STRING, 
        allowNull: false,
    },
    end_time: {
        type: DataTypes.STRING, 
        allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Timeline