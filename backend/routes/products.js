const express = require('express')
const router = express.Router()
const Product = require('../models/Product')
const { requireAdmin } = require('../middleware/auth')
const { validateObjectId } = require('../middleware/validateObjectId')

const asyncHandler = (fn) => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next)

router.get('/', asyncHandler(async (req, res) => {
    const products = await Product.find()
    res.json(products)
}))

router.get('/category/:category', asyncHandler(async (req, res) => {
    const products = await Product.find({ category: req.params.category })
    res.json(products)
}))

router.get('/:id', validateObjectId, asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (!product) return res.status(404).json({ message: 'Product not found' })
    res.json(product)
}))

router.post('/', requireAdmin, asyncHandler(async (req, res) => {
    const product = await Product.create(req.body)
    res.status(201).json(product)
}))

router.put('/:id', requireAdmin, validateObjectId, asyncHandler(async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!product) return res.status(404).json({ message: 'Product not found' })
    res.json(product)
}))

router.delete('/:id', requireAdmin, validateObjectId, asyncHandler(async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id)
    if (!product) return res.status(404).json({ message: 'Product not found' })
    res.json({ message: 'Product deleted' })
}))

module.exports = router
