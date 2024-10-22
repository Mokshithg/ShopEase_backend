const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    image: { type: String },
    category: { type: String },
    // brand: { type: String },
    reviews: [
      {
        user: { type: String, required: true },
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      }
    ],
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
  });
  
  
const Product = mongoose.model('Product', productSchema);
  
module.exports = Product;