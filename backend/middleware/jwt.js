const jwt = require("jsonwebtoken")
const app = require("./app")

let make = function (user) {
    return new Promise(function (resolve, reject) {
        jwt.sign(
            { data: user },
            app.ACCESS_TOKEN,
            {
                algorithm: "HS256",
                expiresIn: app.TOKEN_TIMELIFE
            },
            function (err, _token) {
                if (err) {
                    return reject(err)
                } else {
                    return resolve(_token)
                }
            }
        )
    })
}

let check = function(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, app.ACCESS_TOKEN, function(err, data) {
            if(err) {
                return reject(err)
            } 
             return resolve(data)
        })
    })

}
module.exports = {
    make: make,
    check: check,
}