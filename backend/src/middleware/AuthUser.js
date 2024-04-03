const jwt = require("./jwt");

let isAuth = async function (req, res, next) {
  
  try {
    const token = req.cookies.access_token;
    if (!token) {
      return res.status(403).json({msg: "Bạn chưa đăng nhập, vui lòng đăng nhập để tiếp tục."});
    }
    const authData = await jwt.check(token);
    if (!authData) {
      return res.status(400).json({msg: 'Lỗi xác thực token'});
    }
    req.authData = authData; 
    console.log(authData); 
    return next(); 
  } catch (error) {
    return res.status(403).json({ msg: error });
  }
};

let checkAdmin = async function (req, res, next) {
  try {
    if (req.authData.role_id != 1) {
      return res.status(400).json({msg: 'Chức năng chỉ khả dụng với tài khoản admin.'})
    }
    return next(); 
  } catch (error) {
    return res.status(400).json({ msg: error });
  }
}

module.exports = {
  isAuth: isAuth,
  checkAdmin: checkAdmin,
};
