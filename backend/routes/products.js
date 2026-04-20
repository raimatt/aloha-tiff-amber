const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Wraps async route handlers so thrown errors flow to Express's error
// middleware (see server.js) without every route needing its own try/catch.
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

router.get('/', asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.json(products);
}));

router.get('/category/:category', asyncHandler(async (req, res) => {
  const products = await Product.find({ category: req.params.category });
  res.json(products);
}));

router.get('/:id', asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
}));

module.exports = router;
