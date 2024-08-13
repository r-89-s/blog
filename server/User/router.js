const express = require('express')
const router = express.Router()
const {saveToRead} = require('./controller')

router.post('/api/saveToRead', saveToRead)

module.exports = router