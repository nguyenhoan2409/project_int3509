const { QueryTypes } = require("sequelize");
const { database } = require("../config/database");
const JWT = require("../middleware/jwt");
const argon2 = require("argon2");
const User = require("../models/Users");
const Verification = require("../models/Verification");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

exports.login = async function (req, res) {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!user) {
      return res
        .status(400)
        .json({ msg: "Tài khoản không tồn tại, vui lòng kiểm tra lại email" });
    }

    const match = await argon2.verify(user.password, req.body.password);
    
    if (!match) {
      return res
        .status(400)
        .json({ msg: "Mật khẩu nhập sai, vui lòng kiểm tra lại." });
    }

    if (!user.isVerified) {
			let code = await Verification.findOne({
        where: {
          user_id: user.user_id
        }
      });
			if (!code) {
				code = await Verification.create({
					user_id: user.user_id,
					code: crypto.randomBytes(32).toString('hex')
				});
				const url = `http://14.225.218.250/user/${user.user_id}/verify/${code.code}`;
				await sendEmail(user.email, "Xác thực tài khoản", url);
			}

			return res
				.status(400)
				.json({ msg: "Link xác thực đã được gửi tới email, vui lòng nhấn vào link để xác thực." });
		}
    // req.session.userId = user.user_id;
    const token = await JWT.make({
      user_id: user.user_id,
      role_id: user.role_id,
    });
    res.cookie("access_token", token, { 
      httpOnly: true,
      // maxAge: 30 * 60 * 60 * 1000,
    });
    res.cookie("isLoggedIn", true, { 
      httpOnly: false,
      // maxAge: 30 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      success: true,
      msg: "Đăng nhập thành công",
      user: user,
      token: token,
    });
  } catch (error) {
    console.log(error);
    return  res.status(400).json({ msg: "Đăng nhập thất bại", error: error });
  }
};

exports.register = async function (req, res) {
  try {
    const checkEmail = await database.query(
      "SELECT *FROM users WHERE email=:email",
      {
        replacements: {
          email: req.body.email,
        },
        type: QueryTypes.SELECT,
      }
    );
    // const checkMSSV = await User.findOne({
    //   where: {
    //     user_id: req.body.user_id,
    //   },
    // });
    // if (checkMSSV) {
    //   return res.status(400).json({ msg: "Mã số sinh viên đã tồn tại, vui lòng kiểm tra lại." });
    // }
    if (checkEmail.length > 0) {
      return res.status(400).json({ msg: "Tài khoản đã tồn tại, vui lòng lựa chọn email khác." });
    }

    const hashPassword = await argon2.hash(req.body.password);
    
    const user = await database.query(
      "INSERT INTO users (password, fullname, email, phone_number, address, role_id, isVerified) VALUES (:password, :fullname, :email, :phone_number, :address, :role_id, :isVerified)",
      {
        replacements: {
          password: hashPassword,
          fullname: req.body.fullname,
          email: req.body.email,
          phone_number: req.body.phone_number,
          address: req.body.address,
          role_id: 2,
          isVerified: 0
        },
        type: QueryTypes.INSERT,
      }
    );


    const code = await Verification.create({
      user_id: user[0],
      code: crypto.randomBytes(32).toString('hex')
    });
    const url = `http://14.225.218.250/user/${user[0]}/verify/${code.code}`;
    await sendEmail(req.body.email, "Xác thực tài khoản", url);
    return res
      .status(201)
      .json({ success: true, msg: "Link xác thực đã được gửi tới email, vui lòng click để xác nhận", user: user});
  } catch (error) {
    return res.status(400).json({ msg: "Tạo tài khoản thất bại"});
  }
};

exports.logOut = async function (req, res) {
  try {
    res.clearCookie('access_token', { httpOnly: true, sameSite: 'None', secure: true });
    res.clearCookie('isLoggedIn', { httpOnly: false, sameSite: 'None', secure: true });
    res.status(200).json({ message: 'Đăng xuất thành công'});
  } catch (error) {
    return res.status(400).json({ msg: error + " Đăng xuất không thành công" });
  }
};

exports.getToken = async function (req, res) {
  try {
    var user = {
      email: "20020483@vnu.edu.vn",
      password: "123456",
    };
    const _token = await JWT.make(user);

    res.status(200).json({ token: _token });
  } catch (error) {
    res.status(400).json({ msg: "Lỗi lấy mã token" });
  }
};

exports.checkToken = async function (req, res) {
  try {
    var _token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiMjAwMjA0ODNAdm51LmVkdS52biIsInBhc3N3b3JkIjoiMTIzNDU2In0sImlhdCI6MTcxMTQzMzM5OCwiZXhwIjoxNzExNDM0Mjk4fQ.5mIejhw8HuedKONKIvZssD-VpSCNYdVHQeTNaJm6sr8";
    const data = await JWT.check(_token);
    res.status(200).json({ data: data });
  } catch (err) {
    res.status(400).json({ msg: "Mã token không hợp lệ" });
  }
};
