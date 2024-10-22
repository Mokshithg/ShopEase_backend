const express = require('express');
const { addToCart, getCart } = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');
const app = express.Router();


app.post('/', protect, addToCart);

app.get('/', protect, getCart);

module.exports = router;
