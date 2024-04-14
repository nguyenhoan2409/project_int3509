const { getAllOrder, getRemainingProductQuantity, confirmOrderStatus, getOrderById, getOrderByStatus, createOrder } = require("../controllers/OrderControllers");
const { isAuth, checkAdmin } = require("../middleware/AuthUser");

module.exports = function (router) {
    router.get('/order/getAllOrder', isAuth, checkAdmin, getAllOrder); 
    router.get('/order/getOrderById/:order_id', isAuth ,getOrderById); 
    router.get('/order/getOrderByStatus/:status',isAuth ,getOrderByStatus); 
    router.get('/order/getRemainingProductQuantity/:product_id',isAuth, getRemainingProductQuantity); 
    router.put('/order/confirmOrderStatus',isAuth, confirmOrderStatus);  
    router.post('/order/createOrder',isAuth, createOrder); 
}