const Order = require('../models/Order');
const Cart = require('../models/Cart');

const placeOrder = async (req, res) => {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart || cart.cartItems.length === 0) {
        return res.status(400).json({ message: 'No items in cart' });
    }

    const { shippingAddress } = req.body;
    const order = new Order({
        user: req.user._id,
        orderItems: cart.cartItems,
        totalPrice: cart.totalPrice,
        shippingAddress,
        paymentStatus: 'paid' 
    });

    await order.save();
    await Cart.findByIdAndRemove(cart._id); 

    res.status(201).json(order);
};

const getUserOrders = async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
};

module.exports = { placeOrder, getUserOrders };
