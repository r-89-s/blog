const Blog = require('./Blog')
const User = require('../auth/User')
let currentDate = new Date()
let dayMonthYear = `${currentDate.getDate()}.${currentDate.getMonth() + 1}.${currentDate.getFullYear()}`
const fs = require('fs')
const path = require('path')

const createBlog = async (req, res) => {
    if(req.file && 
        req.body.title.length > 2 && 
        req.body.category.length > 2 && 
        req.body.description.length > 2)
        {
        await new Blog({
            title: req.body.title,
            category: req.body.category,
            description: req.body.description,
            blogImg: `/images/blogs/${req.file.filename}`,
            author: req.user._id,
            blogDate: dayMonthYear
        }).save()
        res.redirect(`/admin/${req.user._id}`)
    }else{
        res.redirect('/new?error=1')
    }
}

const editBlog = async (req, res) => {
    
    if(
        req.file && 
        req.body.title.length > 2 &&
        req.body.category.length > 2 &&
        req.body.description.length > 2
    ){
        const blogs = await Blog.findById(req.body.id)
        fs.unlinkSync(path.join(__dirname + '../../../public' + blogs.blogImg))
        // blog.title = req.body.title
        // blog.category = req.body.category
        // blog.description = req.body.description
        // blog.blogImg = `/images/blogs/${req.file.filename}`
        // blog.save()
        await Blog.findByIdAndUpdate(req.body.id, {
            title: req.body.title,
            category: req.body.category, 
            description: req.body.description,
            blogImg: `/images/blogs/${req.file.filename}`,
            author: req.user._id
        })
        res.redirect('/admin/' + req.user._id)
    }else{
        res.redirect(`/edit/${req.body.id}?error=1`)
    }
}

const deleteBlog = async(req, res) => {
    const blog = await Blog.findById(req.params.id)
    if(blog){
        fs.unlinkSync(path.join(__dirname + '../../../public' + blog.blogImg))
        await Blog.deleteOne({_id: req.params.id})
        res.status(200).send('ok')
    }else{
        res.status(404).send('Not found')
    }
}

const saveBlog = async(req, res) => {
    if(req.user && req.body.id){
        const user = await User.findById(req.user.id)
        const findBlog = user.toRead.filter(item => item._id == req.body.id)
        // user.toRead = []
        if(findBlog.length == 0){
            user.toRead.push(req.body.id)
            user.save()
            res.send('Blog succesfuly saved')
        }else{
            res.send('Blog already saved')
        }
    }
    
}

const deleteFromToRead = async(req, res) => {
    if(req.user && req.params.id){
        const user = await User.findById(req.user.id)
        for(let i = 0; i < user.toRead.length; i++){
            if(user.toRead[i] == req.params.id){
                user.toRead.splice(i , 1)
                user.save()
                res.send('Succesfuly deleted')
            }
            
        }
        // res.send('Data not found')
    }
}

module.exports = {
    createBlog,
    editBlog,
    deleteBlog,
    saveBlog,
    deleteFromToRead
}