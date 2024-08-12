const express = require('express')
const router = express.Router()
const {upload} = require('./multer')
const {createBlog, editBlog} = require('./controller')
const {isAuth} = require('../auth/middlewares')

router.post('/api/blogs/new', isAuth, upload.single('blogImg'), createBlog)
router.post('/api/blogs/edit', isAuth, upload.single('blogImg'), editBlog)

module.exports = router