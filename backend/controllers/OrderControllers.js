const Orders = require("../models/Orders");
const Products = require("../models/Products");

exports.getAllOrder = async (req, res) => {
  try {
    const orderList = await Orders.findAll({});
    return res.status(200).json(orderList);
  } catch (error) {
    return res.status(500).json({ msg: "Lỗi không lấy được các order." });
  }
};

exports.getRemainingProductQuantity = async (req,res) => {
  try {
    const { product_id } = req.params;

    const totalOrderedQuantity = await Orders.sum("quantity", {
      where: { 
        product_id: product_id, 
        status: 2
     },
    });

    const product = await Products.findByPk(product_id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const remainingQuantity = product.quantity - totalOrderedQuantity;
   
    return res.status(200).json({ remainingQuantity: remainingQuantity});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


exports.confirmOrder = async (req, res) => {
    const { orderId, newStatus } = req.body;
  
    try {
      const order = await Orders.findOne({
        where: {
            order_id: orderId
        }
      });
      if (!order) {
        return res.status(404).json({ error: 'Không tìm thấy đơn hàng' });
      }
  
      if (newStatus < 1 || newStatus > 4) {
        return res.status(400).json({ error: 'Trạng thái đơn hàng không hợp lệ' });
      }
  
      await order.update({ status: newStatus });
  
      return res.status(200).json({ success: 'Đã cập nhật trạng thái đơn hàng thành công' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Lỗi server' });
    }
  };

 exports.createOrder = async (req, res) => {
    const { user_id, product_id, quantity, total_money, rental_time, return_time, status } = req.body;
  
    try {
      const product = await Products.findOne({ where: { product_id } });
      if (!product) {
        return res.status(404).json({ error: `Product not found with productId: ${product_id}` });
      }

      const totalOrderedQuantity = await Orders.sum("quantity", {
        where: { 
          product_id: product_id, 
          status: 2
       },
      });

      const remainingQuantity = product.quantity - totalOrderedQuantity;
  
      // Kiểm tra số lượng còn lại có đủ để đặt hàng không
      if (remainingQuantity < quantity) {
        return res.status(400).json({ error: 'Số lượng còn lại không đủ để đặt hàng' });
      }
  
      // Tạo đơn hàng
      const order = await Orders.create({
        order_id: null,
        user_id: user_id,
        product_id: product_id,
        quantity: quantity,
        total_money: total_money,
        rental_time: rental_time,
        return_time: return_time,
        status: status,
      });
  
      return res.status(201).json({ success: true , message: 'Order was created successfully!'});
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Lỗi server' });
    }
  };