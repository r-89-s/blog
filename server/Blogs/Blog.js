const mongoose = require('mongoose')

const BlogSchema = new mongoose.Schema({
    title: String,
    category: String,
    description: String,
    blogImg: String
})

module.exports = mongoose.model('blog', BlogSchema)