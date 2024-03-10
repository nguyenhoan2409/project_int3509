const { Sequelize } = require("sequelize");
const dotenv = require('dotenv'); 
 

dotenv.config(); 
const database = new Sequelize(
    process.env.DATABASE_NAME, 
    process.env.DATABASE_USERNAME, 
    process.env.DATABASE_PASSWORD, 
    {
        dialect:'mysql',
        host:'localhost'
    }
); 

database.authenticate().then(() => {
    console.log('Successfully connected to the databse!')
}).catch(err => {
    console.log('Unable to connect to the databse: '+ err)
})


module.exports = {database}; 
