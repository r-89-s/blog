const Blog = require('./Blog')
const createBlog = (req, res) => {
    if(req.file && 
        req.body.title.length > 2 && 
        req.body.category.length > 2 && 
        req.body.description.length > 2)
        {
        new Blog({
            title: req.body.title,
            category: req.body.category,
            description: req.body.description,
            blogImg: `${req.file.destination}/${req.file.filename}`,
            author: req.user._id
        }).save()
        res.redirect(`/admin/${req.user._id}`)
    }else{
        res.redirect('/new?error=1')
    }
}

module.exports = {createBlog}




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