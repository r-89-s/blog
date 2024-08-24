const passport = require('passport')
const User = require('../auth/User')
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const GitHubStrategy = require('passport-github2').Strategy

passport.use(new LocalStrategy(
    {
        usernameField: 'email'
    },
    function(email, password, done){
        User.findOne({email}).then(user => {
            bcrypt.compare(password, user.password, function(err, result) {
                if (err) {
                    return done(err)
                }
                if(result){return done(null, user)}
            });
        }).catch(e => {
            return done(e)
        })
    }
))

passport.use(new GoogleStrategy({
    clientID: '835052626651-qi9on9hnv8jqm8d7knodbeg9ma27uef6.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "http://localhost:8000/api/auth/google",
    scope: ['openid', 'email', 'profile']
  },
  async function(accessToken, refreshToken, profile, cb) {
    const user = await User.find({googleId: profile.id})
    const newUser = await new User({
        googleId: profile.id,
        full_name: profile.displayName,
        email: profile.emails[0].value
    }).save()
    return cb(null, newUser);
  }
));

passport.use(new GitHubStrategy({
    clientID: 'Ov23lidoB284pm9NHpou',
    clientSecret: '94635813eceb693fbbd39e7a577ff9e6d1f32598',
    callbackURL: "http://localhost:8000/api/auth/github",
    scope: ['openid', 'email', 'profile']
  },
  async function(accessToken, refreshToken, profile, cb) {
    const user = await User.find({githubId: profile.id})
    const newUser = await new User({
        githubId: profile.id,
        full_name: profile.username,
    }).save()
    return cb(null, newUser);
  }
));

passport.serializeUser(function(user, done){
    done(null, user._id)
})

passport.deserializeUser(function(id, done){
    User.findById(id).then((user, err) => {
        done(err, user)
    })
})