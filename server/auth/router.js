const express = require('express')
const passport = require('passport')
const router = express.Router()
const {signUp, signIn, signOut} = require('./controller')
const createAdmin = require('../Admin/seed')

router.post('/api/signup', signUp)
router.post('/api/signin', passport.authenticate('local', {failureRedirect: '/login?error=1'}), signIn)
router.get('/api/signout', signOut)
router.get('/api/auth/google', passport.authenticate('google'), (req, res) => {
    res.redirect('/profile/' + req.user.id)
})
router.get('/api/auth/github', passport.authenticate('github'), (req, res) => {
    res.redirect('/profile/' + req.user.id)
})
createAdmin()
module.exports = router