const express = require('express');
const dotenv = require('dotenv'); 
const moment = require('moment/moment');



dotenv.config(); 
const app = express(); 
const port = 8080; 


// app.get('/', (req, res) => {
//   res.send('Hello manh Hoan')
// }); 
app.use(express.json()); 
require('./src/routes/HomeRoutes')(app); 
require('./src/routes/ProductRoutes')(app); 
require('./src/routes/ScoreRoute')(app); 
require('./src/routes/OrderRoutes')(app); 
require('./src/routes/UserRoute')(app); 

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`); 
}); 