const db = require('../common/connect')
const product = function(product) {
    this.product_id = product.product_id
    this.category_id = product.category_id
    this.product_name = product.product_name
    this.price = product.price
    this.quantity = product.quantity
    this.thumbnail = product.thumbnail
    this.description = product.description
    this.status = product.status
}


module.exports = product

