const express = require('express');
const dotenv = require('dotenv'); 
const { default: orderRoute } = require('./routes/OrderRoutes');


dotenv.config(); 
const app = express(); 
const port = 8080; 


// app.get('/', (req, res) => {
//   res.send('Hello manh Hoan')
// }); 
app.use(express.json()); 
require('./routes/OrderRoutes')(app); 
require('./routes/UserRoute')(app); 

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`); 
}); 