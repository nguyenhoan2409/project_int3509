"use strict";

var _require = require("../controllers/OrderControllers"),
  getAllOrder = _require.getAllOrder,
  getRemainingProductQuantity = _require.getRemainingProductQuantity,
  confirmOrderStatus = _require.confirmOrderStatus,
  getOrderById = _require.getOrderById,
  getOrderByStatus = _require.getOrderByStatus,
  createOrder = _require.createOrder;
var _require2 = require("../middleware/AuthUser"),
  isAuth = _require2.isAuth,
  checkAdmin = _require2.checkAdmin;
module.exports = function (router) {
  router.get('/api/order/getAllOrder', isAuth, checkAdmin, getAllOrder);
  router.get('/api/order/getOrderById/:order_id', isAuth, getOrderById);
  router.get('/api/order/getOrderByStatus/:status', isAuth, getOrderByStatus);
  router.get('/api/order/getRemainingProductQuantity/:product_id', isAuth, getRemainingProductQuantity);
  router.put('/api/order/confirmOrderStatus', isAuth, confirmOrderStatus);
  router.post('/api/order/createOrder', isAuth, createOrder);
};