// var user = require('../models/user.model')

const { QueryTypes } = require("sequelize")
const { database } = require("../config/database")
const Orders = require("../models/Orders");
const User = require("../models/Users");



// var JWT = require("../common/jwt")

exports.get_list = async function (req, res) {
    try {
        const users = await database.query("SELECT * FROM users", { type: QueryTypes.SELECT })
        return res.status(200).json({user: users});
    } catch (error) {
        return res.status(400).json({ msg: error })
    }
}

exports.userDetail = async function (req, res) {
    try {
        const user_id = req.params.id;

        const userDetail = await database.query("SELECT * FROM users WHERE user_id = :user_id", {
            replacements: {
                user_id: user_id
            }, type: QueryTypes.SELECT
        })

        const orderListOfUser = await Orders.findAll({
            where: {
                user_id: userDetail[0].user_id
            }, 
            attributes: 
            ['order_id', 
            'product_id',
            'quantity',
            'total_money',
            'rental_time',
            'return_time',
            'status'] 
        })

        userDetail[0].orders = orderListOfUser; 
        return res.status(200).json(userDetail);
    } catch (error) {
        return res.status(400).json({ msg: error })
    }
}

exports.getMe = async function (req, res) {
    try {
        const user = await User.findOne({
            where: {
                user_id: req.authData.data.user_id
            }
        })
        if (!user) return res.status(400).json({msg: 'Không lấy được thông tin người dùng'}); 
        const orderListOfMe = await database.query(`
            SELECT o.order_id, p.product_name, o.quantity, o.total_money, o.rental_time, o.return_time, s.description
            FROM orders o
            LEFT JOIN products p ON o.product_id = p.product_id
            LEFT JOIN status s ON o.status = s.status_id
            WHERE o.user_id = :user_id
            `, {replacements: {
                user_id: user.user_id
            }}, { type: QueryTypes.SELECT });
        const result = {
            user_id: user.user_id,
            fullname: user.fullname,
            email: user.email,
            phone_number: user.phone_number,
            address: user.address,
            role_id: user.role_id,
            orderList: orderListOfMe[0]
        }
        return res.status(200).json(result); 
    } catch (error) {
        return res.status(400).json({ msg: error })
    }
}

exports.remove_user = async function (req, res) {
    try {
        var user_id = req.params.id
        await database.query("DELETE FROM users WHERE user_id=:user_id", {
            replacements: {
                user_id: user_id
            }, type: QueryTypes.DELETE
        })
        return res.status(200).json({ msg: "Đã xóa người dùng thành công" });
    } catch (error) {
        return res.status(400).json({ msg: error })
    }

}

exports.update_user = async function (req, res) {
    try {
        await database.query("UPDATE users SET password=:password, fullname=:fullname, email=:email, phone_number=:phone_number, address=:address, role_id =:role_id WHERE user_id =: user_id ",
            {
                replacements: {
                    password: req.body.password,
                    fullname: req.body.fullname,
                    email: req.body.email,
                    phone_number: req.body.phone_number,
                    address: req.body.address,
                    role_id: req.body.role_id,
                    user_id: req.params.id
                }, type: QueryTypes.UPDATE
            })
        return res.status(200).json({ msg: "Đã cập nhật người dùng thành công" })
    } catch (error) {
        return res.status(400).json({ msg: error })
    }
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
