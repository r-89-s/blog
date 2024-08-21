const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new mongoose.Schema({
    email: String,
    full_name: String,
    password: String,
    isAdmin: Boolean,
    googleId: String,
    githubId: String,
    toRead: [{type: Schema.Types.ObjectId, ref: 'blog'}],
    readed: [{type: Schema.Types.ObjectId, ref: 'blog'}]
})

module.exports = mongoose.model('user', UserSchema)