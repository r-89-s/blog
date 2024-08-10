const express = require('express')
const router = express.Router()
const Categories = require('../Categories/Categories')

router.get('/', async (req, res) => {
    console.log(req.user, 'main page')
    const allCategories = await Categories.find()
    res.render("index", {categories: allCategories, user: req.user ? req.user: {}})
})

router.get('/login', (req, res) => {
    res.render("login", {user: req.user ? req.user: {}})
})

router.get('/register', (req, res) => {
    res.render("register", {user: req.user ? req.user: {}})
})

router.get('/profile/:id', (req, res) => {
    console.log(req.user, 'profile page')
    res.render("profile", {user: req.user ? req.user: {}})
})

router.get('/admin', (req, res) => {
    console.log(req.user, 'admin page')
    res.render("adminProfile", {user: req.user ? req.user: {}})
})

router.get('/new', async (req, res) => {
    const allCategories = await Categories.find()
    res.render("newBlog", {categories: allCategories, user: req.user ? req.user: {}})
})

router.get('/edit', async (req, res) => {
    const allCategories = await Categories.find()
    res.render("editBlog", {categories: allCategories, user: req.user ? req.user: {}})
})

module.exports = router