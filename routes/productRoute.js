const express = require('express');

const {getAllProducts, getProductById, createProduct, updateProduct, deleteProduct} = require('../controllers/productController');

const router = express.Router();

router.get('/allprod', getAllProducts);

router.get('/prod/:id', getProductById);

router.post('/newprod', createProduct);

router.put('/updateprod/:id', updateProduct);

router.delete('/deleteprod/:id', deleteProduct);

module.exports = router;    