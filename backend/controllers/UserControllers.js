// var user = require('../models/user.model')

const { QueryTypes } = require("sequelize")
const { database } = require("../config/database")


// var JWT = require("../common/jwt")

exports.get_list = async function(req, res) {
    try {
        var userList = await database.query("SELECT * FROM users", {type: QueryTypes.SELECT})
        return res.status(200).json(userList); 
    } catch (err) {
        return res.status(400).json({message: err})
    }
}
exports.detail = function (req, res) {
    const user_id = req.params.id
    database.query("SELECT * FROM users WHERE user_id = ?",user_id, function(err, user) {
        if(err || user.length == 0) {
           return res.json("Không tồn tại người dùng")
        } else {
           return res.send(user)
        }
       })
}

exports.remove_user = function (req, res) {
    var user_id = req.params.id
    database.query("DELETE FROM users WHERE user_id=?", user_id, function(err) {
        if(err) {
            return res.json(null)
        } else {
            return res.json("Xóa người dùng thành công")
        }
    }) 
}

exports.update_user = function (req, res) {
    database.query("UPDATE users SET password=?, fullname=?, email=?, phone_number=?, address=?, role_id=? WHERE user_id = ?", [req.body.password, req.body.fullname, req.boy.email, req.body.phone_number, req.body.address, req.body.role_id, req.body.user_id], function(err, users) {
        if(err) {
            return res.json(err,null)
        } else {
            return res.send("Cập nhật người dùng thành công")
        }
    }) 
}

/*  
exports.login = function (req, res) {
    var data = req.body
    user.check_login(data, async function (response) {
        if (response) {
            const _token = await JWT.make(response)
            res.send({ result: _token })
        }
        res.send({ result: response })
    })
}
*/

exports.login = function(req,res) {
    const sql = "SELECT * FROM users WHERE email=? AND password=?"
    database.query(sql,[req.body.email, req.body.password], (err, data) => {
        if(err) return res.json("Lỗi đăng nhập")
        if(data.length > 0 ) {
            return res.json("Đăng nhập thành công")
        } else {
            return res.json("Bạn chưa tạo tài khoản")
        }
    })
       
}
/*
user.check_login = function(data, result) {
    database.query("SELECT * FROM users WHERE email = ? AND password = ?", [data.email, data.password], function(err, user) {
        if(err || user.length == 0) {
            result(null)
        } else {
            result(user)
        }
       })
}*/

exports.register = function(req, res) {
    const password = req.body.password
    const fullname = req.body.fullname
    const email = req.body.email
    const phone_number = req.body.phone_number
    const address = req.body.address
    const role_id = 2
    database.query("INSERT INTO users (password, fullname, email, phone_number, address, role_id) VALUES (?,?,?,?,?,?)", [password, fullname, email, phone_number, address, role_id], (err, ressult) => {
            if(err) {console.log(err)}
            else res.json("Bạn đã tạo tài khoản thành công")
    })
}