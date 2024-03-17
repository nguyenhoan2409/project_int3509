const jwt = require("./jwt")

let isAuth = async function(req, res, next) {
    var _token = req.headers.authorization
    if(_token) {
        try {
                var authData = await jwt.check(_token)
                req.auth = authData
                next()
        } catch(err) {
            return res.send("Mã token không hợp lệ")
        }
    } else {
        return res.send("Bạn chưa gửi mã token")
    }

}

module.exports =  {
    isAuth : isAuth
}