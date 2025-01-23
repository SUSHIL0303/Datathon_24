const mongoose = require('mongoose')

const complaintSchema = new mongoose.Schema({
    name: String,
    phonenumber: String,
    address: String,
    distname: String,
    review: String,
    images : [String]
})

const complaintmodel = mongoose.model('complaints',complaintSchema)

module.exports = complaintmodel