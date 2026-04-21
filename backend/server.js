const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({ origin: process.env.FRONTEND_ORIGIN }))
app.use(express.json())

app.use('/api/products', require('./routes/products'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/upload', require('./routes/upload'))

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ MongoDB Connected'))
    .catch((err) => console.log('❌ MongoDB Error:', err))

app.get('/', (req, res) => {
    res.json({ message: 'Backend is working!' })
})

app.use((err, req, res, next) => {
    console.error(err)
    const status = err.status || err.statusCode || 500
    const message = process.env.NODE_ENV === 'production' ? 'Something went wrong' : err.message
    res.status(status).json({ message })
})

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`)
})
