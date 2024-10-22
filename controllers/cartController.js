const Cart = require('../models/Cart');
const Product = require('../models/Product');

const addToCart = async (req, res) => {
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
        const newCart = new Cart({
            user: req.user._id,
            cartItems: [{ product: productId, quantity }],
            totalPrice: product.price * quantity
        });
        await newCart.save();
        return res.status(201).json(newCart);
    }
};

const getCart = async (req, res) => {
    const cart = await Cart.findOne({ user: req.user._id }).populate('cartItems.product');
    if (!cart) return res.status(404).json({ message: "Cart is empty" });
    res.json(cart);
};

module.exports = { addToCart, getCart };
