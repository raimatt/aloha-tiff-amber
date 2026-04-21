const express = require('express')
const router = express.Router()
const cloudinary = require('cloudinary').v2
const multer = require('multer')
const { requireAdmin } = require('../middleware/auth')

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

const upload = multer({ storage: multer.memoryStorage() })

router.post('/', requireAdmin, upload.single('image'), async (req, res, next) => {
    try {
        const result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { folder: 'alohatiffamber', allowed_formats: ['jpg', 'jpeg', 'png', 'webp'] },
                (error, result) => {
                    if (error) reject(error)
                    else resolve(result)
                }
            )
            stream.end(req.file.buffer)
        })
        res.json({ url: result.secure_url })
    } catch (err) {
        next(err)
    }
})

module.exports = router
