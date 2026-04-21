const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const rateLimit = require('express-rate-limit')

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: { message: 'Too many login attempts, try again later' }
})

router.post('/login', loginLimiter, async (req, res) => {
    const { email, password } = req.body

    if (email !== process.env.ADMIN_EMAIL) {
        return res.status(401).json({ message: 'Invalid credentials' })
    }

    const match = await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH)
    if (!match) {
        return res.status(401).json({ message: 'Invalid credentials' })
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '8h' })
    res.json({ token })
})

module.exports = router
