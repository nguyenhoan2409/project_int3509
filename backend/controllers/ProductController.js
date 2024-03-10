// var product = require('../models/product.model')
exports.get_list = function(req, res){
    db.query("SELECT * FROM products", function(err, product)
    { if(err) {
        return res.json(err)
    } else {
        return res.send(product)
    }
    })
}
exports.detail = function(req, res){
    const product_id = rq.params.id
    db.query("SELECT * FROM products WHERE product_id = ?",product_id, function(err, product) {
        if(err || product.length == 0) {
            return res.json("Không tồn tại sản phẩm")
        } else {
            return res.send(product)
        }
       })
}

exports.add_product = function(req,res) {
    const category_id = req.body.category_id
    const product_name = req.body.product_name
    const price = req.body.price
    const quantity = req.body.quantity
    const thumbnail = req.body.thumbnail
    const description = req.body.description
    const status = req.body.status
    db.query("INSERT INTO products (category_id, product_name, price, quantity, thumbnail, description, status) VALUES (?,?,?,?,?,?,?)", [category_id, product_name, price, quantity, thumbnail, description, status], (err, result) => {
            if(err) {console.log(err)}
            else res.json("Bạn đã thêm sản phẩm thành công")
    })
}

exports.remove_product = function(req,res) {
    var product_id = req.params.id
    db.query("DELETE FROM products WHERE product_id=?", product_id, function(err, products) {
        if(err) {
           return res.json(null)
        } else {
            return res.json("Xóa sản phẩm thành công")
        }
    }) 
}

exports.update_product = function(req,res) {
    db.query("UPDATE products SET category_id=?, product_name=?, price=?, quantity=?, thumbnail=?, description=?, status=? WHERE product_id = ?", [req.boy.category_id, req.body.product_name, req.body.price,req.body.quantity, req.body.thumbnail, req.body.description, data.status, req.body.product_id], function(err, product) {
        if(err) {
           return res.json(err, null)
        } else {
            return res.send("Cập nhật sản phẩm thành công")
        }
    }) 
}