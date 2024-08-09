const express = require('express')
const router = express.Router()
const Categories = require('../Categories/Categories')

router.get('/', async (req, res) => {
    const allCategories = await Categories.find()
    res.render("index", {categories: allCategories})
})

router.get('/login', (req, res) => {
    res.render("login")
})

router.get('/register', (req, res) => {
    res.render("register")
})

router.get('/profile', (req, res) => {
    res.render("profile")
})

router.get('/admin', (req, res) => {
    res.render("adminProfile")
})

router.get('/new', async (req, res) => {
    const allCategories = await Categories.find()
    res.render("newBlog", {categories: allCategories})
})

router.get('/edit', async (req, res) => {
    const allCategories = await Categories.find()
    res.render("editBlog", {categories: allCategories})
})

module.exports = router