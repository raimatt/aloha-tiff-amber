const bcrypt = require('bcryptjs')

const plaintext = process.argv[2]

if (!plaintext) {
    console.error('Usage: node utils/hashPassword.js <your-password>')
    process.exit(1)
}

bcrypt.hash(plaintext, 12).then((hash) => {
    console.log(hash)
})
