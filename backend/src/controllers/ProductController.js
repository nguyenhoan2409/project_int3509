// var product = require('../models/product.model')
const { QueryTypes, DataTypes } = require("sequelize");
const { database } = require("../config/database")
const fs = require('fs')


exports.getProductList = async function(req, res){
exports.getList = async function(req, res){
    try {
        const productList = await database.query("SELECT * FROM products", {type: QueryTypes.SELECT})
    return res.status(200).json(productList);
    } catch (error) {
        return res.status(400).json({msg: error})
    }
}
exports.getProductDetail = async function(req, res){
exports.getDetail = async function(req, res){
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

exports.addProduct = async function(req,res) {
exports.createProduct = async function(req,res) {
    try {
        const product_name = req.body.product_name
        const price = req.body.price
        const quantity = req.body.quantity
        const thumbnail = req.body.thumbnail
        const description = req.body.description
        const product_type = req.body.product_type
        const check = await database.query("SELECT * FROM products WHERE product_name = :product_name", {
            replacements: {
                product_name: product_name
            }, type: QueryTypes.SELECT
        })
        if(check.length != 0) {
            return res.status(400).json("Tên sản phẩm đã tồn tại, vui lòng nhập tên khác")
        }  
        else await database.query("INSERT INTO products (product_name,price,quantity,thumbnail,description,product_type) VALUES (:product_name,:price,:quantity,:thumbnail,:description,:product_type)", {
            replacements: {
                product_name: product_name, 
                price: price, 
                quantity: quantity, 
                thumbnail: thumbnail, 
                description: description, 
                product_type : product_type
            }, type: QueryTypes.INSERT
        })
        return res.status(200).json({msg: "Đã thêm sản phẩm thành công"});
    } catch (error) {
        return res.status(400).json({msg: error})
    }
}

exports.removeProduct = async function(req,res) {
    try  {
        var product_id = req.params.id
        await database.query("DELETE FROM products WHERE product_id=:product_id", {
            replacements: {
                product_id: product_id
            }, type: QueryTypes.UPDATE
        }) 
        return res.status(200).json({msg: "Đã xóa sản phẩm thành công"});
    } catch (error) {
        return res.status(400).json({msg: error})
    }
    
}

exports.updateProduct = async function(req,res) {
    try {
        await database.query("UPDATE products SET price=:price,product_type=:product_type, quantity=:quantity, thumbnail=:thumbnail, description=:description WHERE product_id = :product_id", 
        {
            replacements: {
                price: req.body.price,
                quantity: req.body.quantity, 
                thumbnail: req.body.thumbnail, 
                description: req.body.description, 
                product_type : req.body.product_type,
                product_id: req.params.id
            }, type: QueryTypes.UPDATE
        })
        return res.status(200).json({msg: "Đã cập nhật sản phẩm thành công"}); 
    } catch (error) {
        return res.status(400).json({msg: error})
    }
    
}
