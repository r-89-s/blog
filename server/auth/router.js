const express = require('express')
const router = express.Router()

router.post('/api/signup', () => {
    console.log(req.body)
    resizeBy.send('ok')
})

module.exports = router