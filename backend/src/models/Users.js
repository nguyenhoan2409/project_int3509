const db = require('../common/connect')
const user = function(user) {
        this.user_id = user.user_id
        this.username = user.username
        this.password = user.password
        this.fullname = user.fullname
        this.email = user.email
        this.phone_number = user.password
        this.address = user.address
        this.role_id = user.role_id
}

module.exports = user