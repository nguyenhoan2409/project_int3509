const express = require('express');
const dotenv = require('dotenv'); 
const moment = require('moment/moment');
const cors = require('cors'); 
const { database } = require('./config/database');
const cookieParser = require('cookie-parser'); 



dotenv.config(); 
const app = express(); 
const port = process.env.PORT; 

app.use(cookieParser())
app.use(express.json()); 
app.use(cors({
  credentials: true, 
  origin: 'http://localhost:3000'
}));

app.use(function(req, res, next) {
  res.header('Content-Type', 'application/json;charset=UTF-8')
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})
 
require('./routes/AccountRoutes')(app); 
require('./routes/ProductRoutes')(app); 
require('./routes/ScoreRoute')(app); 
require('./routes/OrderRoutes')(app); 
require('./routes/UserRoute')(app); 
require('./routes/TimelineRoute')(app); 
require('./routes/CertificateRoutes')(app); 
require('./routes/NotificationRoutes')(app);

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`); 
}); 