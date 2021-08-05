const express = require('express');

const router = express.Router();

const productsController = require('../controllers/products');

router.post('/product', productsController.createProduct);

router.get('/products', productsController.getAllProduct);

module.exports = router;
