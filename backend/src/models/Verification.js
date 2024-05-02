const { DataTypes } = require("sequelize");
const { database } = require("../config/database");

const Verification = database.define(
  "verification",
  {
    user_id: {
        type: DataTypes.INTEGER, 
        allowNull: false, 
        primaryKey: true
    },
    code: {
        type: DataTypes.STRING, 
        allowNull: true,
    },
  },
  {
    tableName: 'verification',
    timestamps: false,
  }
);

module.exports = Verification
