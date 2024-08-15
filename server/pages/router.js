const express = require('express')
const router = express.Router()
const Categories = require('../Categories/Categories')
const User = require('../auth/User')
const Blog = require('../Blogs/Blog')

router.get('/', async (req, res) => {
    const options = {}
    const categories = await Categories.findOne({key : req.query.category})
    if(categories){
        options.category = categories._id
        res.locals.category = req.query.category
    }
    let page = 0
    const limit = 2
    if(req.query.page && req.query.page > 0){
        page = req.query.page
    }
    if(req.query.search && req.query.search.length > 0){
        options.$or = [
            {
                title: new RegExp(req.query.search, 'i')
            },
            {
                description: new RegExp(req.query.search, 'i')
            }
        ]
        res.locals.search = req.query.search
    }

    const totalBlogs = await Blog.countDocuments(options)
    const allCategories = await Categories.find()
    const blogs = await Blog.find(options).skip(page * limit).limit(limit).populate('category').populate('author')
    const user = req.user ? await User.findById(req.user._id) : {}
    res.render("index", {categories: allCategories, user, blogs, pages: Math.ceil(totalBlogs / limit)})
})

router.get('/login', (req, res) => {
    res.render("login", {user: req.user ? req.user: {}})
})

router.get('/register', (req, res) => {
    res.render("register", {user: req.user ? req.user: {}})
})

router.get('/profile/:id', async (req, res) => {
    const allCategories = await Categories.find()
    const user = await User.findById(req.params.id).populate('toRead').
    populate({path: 'toRead', populate: {path: 'category'}}).
    populate({path: 'toRead', populate: {path: 'author'}})
    if(user){
        res.render("profile", {categories: allCategories, user, loginUser: req.user})
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

router.get('/detail/:id', async (req, res) => {
    const allCategories = await Categories.find()
    const blog = await Blog.findById(req.params.id).populate('category').populate('author')
    const user = await User.findById(req.params.id)
    res.render("detail", {categories: allCategories, user: req.user ? req.user: {}, blog: blog})
})

module.exports = router