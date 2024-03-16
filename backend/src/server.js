const express = require('express')
const path = require('path')

const app = express()
const port = 8080 
const cors = require('cors')
const _AuthMiddleWare = require("./common/_AuthMiddleWare")

// Cấu hình body - parser
var bodyParser= require('body-parser')
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(express.json())
app.use(cors())

require('./routes/home.router')(app)
require('./routes/account.router')(app)
//app.use(_AuthMiddleWare.isAuth)
require('./routes/product.router')(app)
require('./routes/user.router')(app)
require('./routes/score.router')(app)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})