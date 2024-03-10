module.exports = function (router) {
    var JWT = require("../middleware/jwt")

    router.get('/token', async function(req, res) {
        var user = {
            email : "20020483@vnu.edu.vn",
            password : "123456"
        }
        const _token = await JWT.make(user)
        res.send({token: _token})
    })

    router.get('/checktoken', async function(req, res) {
       try {
        var _token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiMjAwMjA0ODNAdm51LmVkdS52biIsInBhc3N3b3JkIjoiMTIzNDU2In0sImlhdCI6MTcwOTMwMTY5NiwiZXhwIjoxNzA5MzAxNzU2fQ.wBzCV7q_yLMScmdv6Wvb348BoAHaDrwCDUoZGfo8s5g"
        const data = await JWT.check(_token)
        res.send({data: data})
       }
       catch(err) {
        res.send("Mã token không hợp lệ")
       }
    })
}