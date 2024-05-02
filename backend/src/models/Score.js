const { DataTypes } = require("sequelize");
const { database } = require("../config/database");
const Score = database.define(
  "physicalscore",
  {
    mssv: {
        type: DataTypes.INTEGER, 
        allowNull: false, 
        primaryKey: true
    },
    fullname: {
        type: DataTypes.STRING, 
        allowNull: true,
    },
    class: {
        type: DataTypes.STRING, 
        allowNull: true,
    },
    university: {
        type: DataTypes.STRING, 
        allowNull: true,
    },
    football_score: {
        type: DataTypes.DOUBLE, 
        allowNull: true,
    },
    badminton_score: {
        type: DataTypes.DOUBLE, 
        allowNull: true,
    },
    tabletennis_score: {
        type: DataTypes.DOUBLE, 
        allowNull: true,
    },
    basketball_score: {
        type: DataTypes.DOUBLE, 
        allowNull: true,
    },
    air_volleyball_score: {
        type: DataTypes.DOUBLE, 
        allowNull: true,
    },
    volleyball_score: {
        type: DataTypes.DOUBLE, 
        allowNull: true
    }, 
    taekwondo_score: {
        type: DataTypes.DOUBLE, 
        allowNull: true
    }, 
    golf_score: {
        type: DataTypes.DOUBLE, 
        allowNull: true
    }, 
    CDR: {
        type: DataTypes.STRING, 
        allowNull: true
    }
  },
  {
    tableName: 'physicalscore',
    timestamps: false,
  }
);

module.exports = Score
