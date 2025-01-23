const mongoose = require('mongoose')

const authoritySchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const authoritymodel = mongoose.model('authorities',authoritySchema)

module.exports = authoritymodel