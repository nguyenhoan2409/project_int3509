const Orders = require("../models/Orders");
const Products = require("../models/Products");
const moment = require('moment/moment');
const Timeline = require("../models/Timeline");
const { Op, or, QueryTypes } = require("sequelize");
const { database } = require("../config/database");

exports.getAllOrder = async (req, res) => {
  try {
    const orders = await database.query(`
        SELECT o.*, p.product_name, p.thumbnail, p.product_type, s.description, u.fullname, u.email, u.phone_number
        FROM orders o
        LEFT JOIN products p ON o.product_id = p.product_id
        LEFT JOIN status s ON o.status = s.status_id
        LEFT JOIN users u ON u.user_id = o.user_id
    `, { type: QueryTypes.SELECT });

    return res.status(200).json(orders);
} catch (error) {
    return res.status(400).json({ msg: error });
}
};

exports.getOrderById = async (req, res) => {
  const { order_id } = req.params;
  try {
    const order = await Orders.findOne({
      where: {
        order_id: order_id,
      },
    });
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    return res.status(200).json(order);
  } catch (error) {
    console.error("Error getting order by id:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.getOrderByStatus = async (req, res) => {
  const { status } = req.params;
  try {
    const orders = await Orders.findAll({ where: { status: status } });
    return res.status(200).json(orders);
  } catch (error) {
    console.error("Error getting orders by status:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.getRemainingProductQuantity = async (req, res) => {
  try {
    const { product_id } = req.params;

    // const totalOrderedQuantity = await Orders.sum("quantity", {
    //   where: {
    //     product_id: product_id,
    //     status: 2,
    //   },
    // });

    const product = await Products.findByPk(product_id);

    if (!product) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm." });
    }

    // const remainingQuantity = product.quantity - totalOrderedQuantity;

    return res.status(200).json({ remainingQuantity: product.quantity });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Lỗi Server" });
  }
};

exports.confirmOrderStatus = async (req, res) => {
  const { orderId, productId, quantity, newStatus } = req.body;

  try {
    const order = await Orders.findOne({
      where: {
        order_id: orderId,
      },
    });
    const product = await Products.findOne({
      where: {
        product_id: productId
      }
    })

    if (!order) {
      return res.status(404).json({ error: "Không tìm thấy đơn hàng" });
    }
    if (!product) {
      return res.status(400).json({error: "Không tìm thấy sản phẩm"})
    }

    if (newStatus < 1 || newStatus > 12) {
      return res
        .status(400)
        .json({ error: "Trạng thái đơn hàng không hợp lệ" });
    }


    if (newStatus == 2 || newStatus == 10) {
      let remainingProductQuantity = product.quantity - quantity; 
      product.update({
        quantity: remainingProductQuantity 
      })
    }

    if (newStatus == 4) {
      let quantityAfterReturning = product.quantity + quantity; 
      product.update({
        quantity: quantityAfterReturning
      })
      order.update({
        return_time: moment().format('YYYY-MM-DD HH:mm:ss')
      })
    }

    if (newStatus == 8 || newStatus == 12) {
      order.update({
        return_time: moment().format('YYYY-MM-DD HH:mm:ss')
      })
    }

    await order.update({ status: newStatus });

    return res
      .status(200)
      .json({ success: "Đã cập nhật trạng thái đơn hàng thành công" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Lỗi server" });
  }
};

exports.createOrder = async (req, res) => {
  const {
    user_id,
    product_id,
    quantity,
    total_money,
    timeline_id,
    rental_date, 
    return_date,
    status,
    note
  } = req.body;

  try {
    const product = await Products.findOne({ where: { product_id } });
    if (!product) {
      return res
        .status(404)
        .json({ message: `Không tìm thấy sản phẩm với product_id: ${product_id}` });
    }

    let timeLine = await Timeline.findOne({
      where: {
        timeline_id: timeline_id
      }
    })

    if (!timeLine) {
      timeLine = {
        start_time : moment().locale('vi').format('HH:mm:ss'),
        end_time : moment().locale('vi').add(5, 'days').format('HH:mm:ss')
      }
    }

    const rental_time = rental_date + " " + timeLine.start_time; 
    const return_time = return_date + " " + timeLine.end_time; 

    if (product.product_type == 1 || product.product_type == 2) {
      if (quantity > product.quantity) {
        return res
        .status(400)
        .json({ message: `Số lượng còn lại không đủ để đáp ứng yêu cầu. Vui lòng chọn số lượng nhỏ hơn ${product.quantity}` });
      }
    }
     
    if (product.product_type == 3) {
      const bookedOrders = await Orders.findAll({
        where: {
          status: {
            [Op.or]: [5,6]
          }
        }
      })
  
      for (const bookedOrder of bookedOrders) {
        let bookedOrderRentalDate = moment.utc(bookedOrder.rental_time).format('YYYY-MM-DD'); 
        let bookedOrderReturnDate = moment.utc(bookedOrder.return_time).format('YYYY-MM-DD');
        if (rental_date == bookedOrderRentalDate && timeline_id == bookedOrder.timeline) {
          return res.status(400).json({message: "Đã có lịch được đặt trong khoảng thời gian từ " 
          + rental_time 
          + " tới " 
          + return_time + "."})
        }
      }
    }
    
    const order = await Orders.create({
      order_id: null,
      user_id: user_id,
      product_id: product_id,
      quantity: quantity,
      total_money: total_money,
      timeline: timeline_id,
      rental_time: rental_time,
      return_time: return_time,
      status: status,
      note: note
    });

    return res
      .status(201)
      .json({ success: true, message: "Yêu cầu đã được tạo thành công và vui lòng đợi admin xác nhận.", order: order});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

// exports.createOrderForRentingOrBuying = async (req, res) => {
//   const {
//     user_id,
//     product_id,
//     quantity,
//     total_money,
//     rental_time,
//     return_time,
//     status,
//   } = req.body;

//   try {
//     const product = await Products.findOne({ where: { product_id } });
//     if (!product) {
//       return res
//         .status(404)
//         .json({ error: `Product not found with productId: ${product_id}` });
//     }

//     const totalOrderedQuantity = await Orders.sum("quantity", {
//       where: {
//         product_id: product_id,
//         status: 2,
//       },
//     });

//     const remainingQuantity = product.quantity - totalOrderedQuantity;

  
//     if (remainingQuantity < quantity) {
//       return res
//         .status(400)
//         .json({ error: "Số lượng còn lại không đủ để đặt hàng" });
//     }

//     const order = await Orders.create({
//       order_id: null,
//       user_id: user_id,
//       product_id: product_id,
//       quantity: quantity,
//       total_money: total_money,
//       rental_time: rental_time,
//       return_time: return_time,
//       status: status,
//     });

//     return res
//       .status(201)
//       .json({ success: true, message: "Order was created successfully!" });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Lỗi server" });
//   }
// };

// exports.createOrderForScheduling = async (req, res) => {
//   const {
//     user_id,
//     product_id,
//     quantity,
//     total_money,
//     rental_time,
//     return_time,
//     status,
//   } = req.body;

//   try {
//     const product = await Products.findOne({ where: { product_id } });
//     if (!product) {
//       return res
//         .status(404)
//         .json({ error: `Product not found with productId: ${product_id}` });
//     }

//     const bookingOrders = await Orders.findAll({
//       where: {
//         status: 6
//       }
//     })

//     for (const bookingOrder of bookingOrders) {
//       let bookingOrderRentalTime = moment.utc(bookingOrder.rental_time).format('YYYY-MM-DD HH:mm:ss'); 
//       let bookingOrderReturnTime = moment.utc(bookingOrder.return_time).format('YYYY-MM-DD HH:mm:ss')
//       if(rental_time < bookingOrderReturnTime 
//       && return_time > bookingOrderRentalTime) {
//         if (rental_time < bookingOrderRentalTime && return_time < bookingOrderReturnTime) {
//           return res.status(400).json({ error: 'The schedule was conflicted. You can choose return_time < ' 
//           + moment.utc(bookingOrder.rental_time).hour() 
//           + ":"
//           + moment.utc(bookingOrder.rental_time).minutes()});
//         }

//         if (rental_time > bookingOrderRentalTime && return_time < bookingOrderReturnTime) {
//             return res.status(400).json({ error: 'The schedule was conflicted. There is the renting scheduled from ' 
//             + moment.utc(bookingOrder.rental_time).hour() + ":" + moment.utc(bookingOrder.rental_time).minutes()
//             + " to "
//             + moment.utc(bookingOrder.return_time).hour() + ":" + moment.utc(bookingOrder.return_time).minutes()}) 
//           };

//           if (rental_time > bookingOrderRentalTime && return_time > bookingOrderReturnTime) {
//             return res.status(400).json({ error: 'The schedule was conflicted. You can choose rental_time > ' 
//             + moment.utc(bookingOrder.return_time).hour() + ":" + moment.utc(bookingOrder.return_time).minutes()
//             }) 
//           };
//         }
//       }
    
//   // const lastOrder = await Orders.findOne({ order: [['order_id', 'DESC']] }); 
//   // const lastOrderReturnTime = moment.utc(lastOrder.return_time).format('YYYY-MM-DD HH:mm:ss'); 
//   // if (lastOrder && (rental_time <= lastOrderReturnTime)) {
//   //   return res.status(400).json({ error: 'The schedule was conflicted. Choose another rental_time.' });
//   // }
   
//     const order = await Orders.create({
//       order_id: null,
//       user_id: user_id,
//       product_id: product_id,
//       quantity: quantity,
//       total_money: total_money,
//       rental_time: rental_time,
//       return_time: return_time,
//       status: status,
//     });

//     return res
//       .status(201)
//       .json({ success: true, message: "Order was created successfully!", order: order});
 
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Lỗi server" });
//   }
// };


