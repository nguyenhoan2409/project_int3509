// var user = require('../models/user.model')

const { QueryTypes } = require("sequelize")
const { database } = require("../config/database")
const Orders = require("../models/Orders");
const User = require("../models/Users");
const argon2 = require("argon2");



// var JWT = require("../common/jwt")

exports.get_list = async function (req, res) {
    try {
        const users = await database.query("SELECT * FROM users", { type: QueryTypes.SELECT })
        return res.status(200).json({users});
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
            SELECT o.order_id, p.product_id, p.product_name, o.quantity, o.total_money, o.rental_time, o.return_time, s.description, o.status
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
            password: user.password,
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
        await database.query("UPDATE users SET password=:password, fullname=:fullname, email=:email, phone_number=:phone_number, address=:address, role_id =:role_id WHERE user_id =:user_id ",
            {
                replacements: {
                    password: await argon2.hash(req.body.password),
                    fullname: req.body.fullname,
                    email: req.body.email,
                    phone_number: req.body.phone_number,
                    address: req.body.address,
                    user_id: user_id
                }, type: QueryTypes.UPDATE
            })
        return res.status(200).json({ msg: "Đã cập nhật người dùng thành công" })
    } catch (error) {
        return res.status(400).json({ msg: error })
    }
}

exports.statisticaldata = async function(req, res) {
    try {
        const orderList = await Orders.findAll(); 
        const totalRevenue = await Orders.sum('total_money', {
            where: {
                status: [4, 8, 12]
            }
        })
        const recentlyOrders = await Orders.findAll({
            order: [['rental_time', 'DESC']], 
            limit: 5,
        })
        const result = {}; 
        result.totalOrders = orderList.length; 
        result.totalAwaitingOrders = (orderList.filter(order => order.status == 1 || order.status == 5 || order.status == 9)).length
        result.totalAcceptedOrders = (orderList.filter(order => order.status == 2 || order.status == 6 || order.status == 10)).length
        result.totalDeniedOrders = (orderList.filter(order => order.status == 3 || order.status == 7 || order.status == 11)).length
        result.totalCompletedOrders = (orderList.filter(order => order.status == 4 || order.status == 8 || order.status == 12)).length
        result.totalRevenue = totalRevenue; 
        result.recentlyOrders = recentlyOrders; 
        return res.status(200).json(result); 
    } catch (error) {
        return res.status(400).json({ msg: error })
    }
}

exports.updatePassword = async function (req, res) {
    try {
        const user_id = req.body.user_id

        const user = await database.query("SELECT * FROM users WHERE user_id = :user_id", {
            replacements: {
                user_id: user_id
            }, type: QueryTypes.SELECT
        })
        const olderPassword = user[0].password

        const password = req.body.password

        const newPassword = await argon2.hash(req.body.newPassword)

        const match = await argon2.verify(olderPassword, password)
        console.log(match)
        if(!match) {
            return res.status(400).json({ msg: "Mật khẩu không đúng" })
        } else {
            await database.query("UPDATE users SET password = :password WHERE user_id = :user_id", {
                replacements: {
                    user_id: user_id,
                    password: newPassword
                }, type: QueryTypes.UPDATE
            })
        }
        return res.status(200).json({ msg: "Đã cập nhật mật khẩu thành công" })
    } catch (error) {
        return res.status(400).json({ msg: error })
    }
}
