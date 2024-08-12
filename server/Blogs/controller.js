const Blog = require('./Blog')
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

module.exports = {
    createBlog,
    editBlog
}




// file: {
//     fieldname: 'blogImg',
//     originalname: '72x108.webp',
//     encoding: '7bit',
//     mimetype: 'image/webp',
//     destination: './public/images/blogs',
//     filename: '1723458035081.webp',
//     path: 'public\\images\\blogs\\1723458035081.webp',
//     size: 3188
//   },