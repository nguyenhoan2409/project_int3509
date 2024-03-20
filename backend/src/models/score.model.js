const { database } = require("../common/connect");
const { DataTypes } = require("sequelize");
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
        univercity: {
            type: DataTypes.STRING, 
            allowNull: true,
        },
        football_score: {
            type: DataTypes.FLOAT, 
            allowNull: true,
        },
        bedminton_score: {
            type: DataTypes.FLOAT, 
            allowNull: true,
        },
        tabletennis_score: {
            type: DataTypes.FLOAT, 
            allowNull: true,
        },
        basketball_score: {
            type: DataTypes.FLOAT, 
            allowNull: true,
        },
        air_volleyball_score: {
            type: DataTypes.FLOAT, 
            allowNull: true,
        },
        volleyball_score: {
            type: DataTypes.FLOAT, 
            allowNull: true,
        },
        taekwondo_score: {
            type: DataTypes.FLOAT, 
            allowNull: true,
        },
        golf_score: {
            type: DataTypes.FLOAT, 
            allowNull: true,
        },
        CDR : {
            type: DataTypes.INTEGER, 
            allowNull: true,
        }
    }
)
module.exports = Score
