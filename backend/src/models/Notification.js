const { DataTypes } = require("sequelize");
const { database } = require("../config/database");

const Notification = database.define(
  "notification",
  {
    notification_id: {
        type: DataTypes.INTEGER, 
        allowNull: false, 
        primaryKey: true, 
        autoIncrement: true
    },
    title :{
        type: DataTypes.STRING, 
        allowNull: true,
    },
    content :{
        type: DataTypes.STRING, 
        allowNull: true,
    },
    url :{
        type: DataTypes.STRING, 
        allowNull: true,
    },
}
);

module.exports = Notification
