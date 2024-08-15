const express = require('express')
const router = express.Router()
const {upload} = require('./multer')
const {createBlog, editBlog, deleteBlog, saveBlog, deleteFromToRead} = require('./controller')
const {isAuth, isAdmin} = require('../auth/middlewares')

router.post('/api/blogs/new', isAdmin, upload.single('blogImg'), createBlog)
router.post('/api/blogs/edit', isAdmin, upload.single('blogImg'), editBlog)
router.delete('/api/blogs/:id', isAdmin, deleteBlog)
router.post('/api/blogs/save', isAuth, saveBlog)
router.delete('/api/blogs/save/:id', isAuth, deleteFromToRead)

module.exports = router