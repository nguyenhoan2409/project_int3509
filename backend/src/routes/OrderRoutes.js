const { getAllOrder, getRemainingProductQuantity, confirmOrderStatus, getOrderById, getOrderByStatus, createOrder } = require("../controllers/OrderControllers");
const { isAuth, checkAdmin } = require("../middleware/AuthUser");

module.exports = function (router) {
    router.get('/api/order/getAllOrder', isAuth, checkAdmin, getAllOrder); 
    router.get('/api/order/getOrderById/:order_id', isAuth ,getOrderById); 
    router.get('/api/order/getOrderByStatus/:status',isAuth ,getOrderByStatus); 
    router.get('/api/order/getRemainingProductQuantity/:product_id',isAuth, getRemainingProductQuantity); 
    router.put('/api/order/confirmOrderStatus',isAuth, confirmOrderStatus);  
    router.post('/api/order/createOrder',isAuth, createOrder); 
}