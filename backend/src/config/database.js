const { Sequelize } = require("sequelize");
const dotenv = require('dotenv'); 
 

dotenv.config(); 
const database = new Sequelize(
    process.env.DATABASE_NAME, 
    process.env.DATABASE_USERNAME, 
    process.env.DATABASE_PASSWORD, 
    {
        port: process.env.DATABSE_PORT,
        dialect: process.env.DATABASE_DIALECT,
        host: process.env.DATABASE_HOST
    }
); 

database.authenticate().then(() => {
    console.log('Successfully connected to the databse!')
}).catch(err => {
    console.log('Unable to connect to the databse: '+ err)
})


module.exports = {database}; 
