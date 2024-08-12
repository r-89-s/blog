const express = require('express')
const router = express.Router()
const Categories = require('../Categories/Categories')
const User = require('../auth/User')
const Blog = require('../Blogs/Blog')

router.get('/', async (req, res) => {
    const allCategories = await Categories.find()
    const blogs = await Blog.find().populate('category').populate('author')
    res.render("index", {categories: allCategories, user: req.user ? req.user: {}, blogs})
})

router.get('/login', (req, res) => {
    res.render("login", {user: req.user ? req.user: {}})
})

router.get('/register', (req, res) => {
    res.render("register", {user: req.user ? req.user: {}})
})

router.get('/profile/:id', async (req, res) => {
    const allCategories = await Categories.find()
    const blogs = await Blog.find().populate('category').populate('author')
    const user = await User.findById(req.params.id)
    if(user){
        res.render("profile", {categories: allCategories, user: user, loginUser: req.user, blogs})
    }else{
        res.redirect('/not-found')
    }
})

router.get('/admin/:id', async (req, res) => {
    const allCategories = await Categories.find()
    const user = await User.findById(req.params.id)
    const blogs = await Blog.find().populate('category').populate('author')
    res.render("adminProfile", {categories: allCategories, user: user, loginUser: req.user, blogs})
})

router.get('/new', async (req, res) => {
    const allCategories = await Categories.find()
    res.render("newBlog", {categories: allCategories, user: req.user ? req.user: {}})
})

router.get('/edit/:id', async (req, res) => {
    const allCategories = await Categories.find()
    const blog = await Blog.findById(req.params.id)
    res.render("editBlog", {categories: allCategories, user: req.user ? req.user: {}, blog})
})

router.get('/not-found', (req, res) => {
    res.render("notFound")
})

module.exports = router