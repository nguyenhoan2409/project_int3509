var JWT = require("../common/jwt")
var { database } = require("../common/connect")
const { QueryTypes } = require("sequelize")

exports.get_list = async function (req, res) {
    try {
        const users = await database.query("SELECT * FROM users", { type: QueryTypes.SELECT })
        return res.status(200).json(users);
    } catch (error) {
        return res.status(400).json({ msg: error })
    }
}

exports.userDetail = async function (req, res) {
    try {
        const user_id = req.params.id
        const userDetail = await database.query("SELECT * FROM users WHERE user_id = :user_id", {
            replacements: {
                user_id: user_id
            }, type: QueryTypes.SELECT
        })
        return res.status(200).json(userDetail);
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

exports.login = async function (req, res) {
    try {
        const user = await database.query("SELECT * FROM users WHERE email=:email AND password=:password",
            {
                replacements: {
                    email: req.body.email,
                    password: req.body.password
                },
                type: QueryTypes.SELECT
            })
        if (user.length > 0) return res.status(200).json({ msg: "Bạn đã đăng nhập thành công" })
        else return res.status(200).json({ msg: "Bạn chưa tạo tài khoản" })
    } catch (error) {
        return res.status(400).json({ msg: error })
    }
}

exports.register = async function (req, res) {
    try {
        var checkEmail = await database.query("SELECT *FROM users WHERE email=:email", {
            replacements: {
                email : req.body.email
            }, type: QueryTypes.SELECT
        })
        console.log(checkEmail)
        if(checkEmail.length > 0 ) {
            return res.status(200).json({ msg: "Tài khoản đã tồn tại" })
        } 
        else {
             try {
                await database.query("INSERT INTO users (password, fullname, email, phone_number, address, role_id) VALUES (:password, :fullname, :email, :phone_number, :address, :role_id)", {
                    replacements: {
                        password: req.body.password,
                        fullname: req.body.fullname,
                        email: req.body.email,
                        phone_number: req.body.phone_number,
                        address: req.body.address,
                        role_id: 2
                    }, type: QueryTypes.INSERT
                })
                return res.status(200).json({ msg: "Bạn đã tạo tài khoản thành công" })}
             catch(error) {
                return res.status(400).json({ msg: error })
            }
        }
    } catch(error) {
        return res.status(400).json({ msg: error })
    }
    }
