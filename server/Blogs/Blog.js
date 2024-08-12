const mongoose = require('mongoose')
const Schema = mongoose.Schema
const BlogSchema = new mongoose.Schema({
    title: String,
    category: {type: Schema.Types.ObjectId, ref: 'category'},
    description: String,
    blogImg: String,
    author: {type: Schema.Types.ObjectId, ref: 'user'},
    blogDate: String
})

module.exports = mongoose.model('blog', BlogSchema)