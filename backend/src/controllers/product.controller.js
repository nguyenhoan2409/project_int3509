var {database} = require("../common/connect")
const { QueryTypes } = require("sequelize")

exports.get_list = async function(req, res){
    try {
        const productList = await database.query("SELECT * FROM products", {type: QueryTypes.SELECT})
    return res.status(200).json(productList);
    } catch (error) {
        return res.status(400).json({msg: error})
    }
}

exports.detail = async function(req, res){
    try {
        const product_id = req.params.id
        const productDetail = await database.query("SELECT * FROM products WHERE product_id = :product_id", {
            replacements: {
                product_id: product_id
            }, type: QueryTypes.SELECT
        })
        return res.status(200).json(productDetail);
    } catch (error) {
        return res.status(400).json({msg: error})
    }
}

exports.add_product = async function(req,res) {
    try {
        await database.query("INSERT INTO products (category_id, product_name, price, quantity, thumbnail, description, status) VALUES (:category_id,:product_name,:price,:quantity,:thumbnail,:description,:status)", {
            replacements: {
                category_id: req.body.category_id, 
                product_name: req.body.product_name, 
                price: req.body.price, 
                quantity: req.body.quantity, 
                thumbnail: req.body.thumbnail, 
                description: req.body.description, 
                status: req.body.status
            }, type: QueryTypes.INSERT
        })
        return res.status(200).json({msg: "Đã thêm sản phẩm thành công"});
    } catch (error) {
        return res.status(400).json({msg: error})
    }
}

exports.update_product = async function(req,res) {
    try {
        await database.query("UPDATE products SET category_id=:category_id, product_name=:product_name, price=:price, quantity=:quantity, thumbnail=:thumbnail, description=:description, status=:status WHERE product_id = :product_id", 
        {
            replacements: {
                category_id: req.body.category_id, 
                product_name: req.body.product_name, 
                price: req.body.price,
                quantity: req.body.quantity, 
                thumbnail: req.body.thumbnail, 
                description: req.body.description, 
                status: req.body.status, 
                product_id: req.body.product_id
            }, type: QueryTypes.UPDATE
        })
        return res.status(200).json({msg: "Đã cập nhật sản phẩm thành công"}); 
    } catch (error) {
        return res.status(400).json({msg: error})
    }
    
}