const express = require('express');
const { placeOrder, getUserOrders } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');
const app = express.Router();


app.post('/', protect, placeOrder);

app.get('/', protect, getUserOrders);

module.exports = router;
