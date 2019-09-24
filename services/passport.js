const passport = require('passport')
const GoogleStrategy= require('passport-google-oauth20').Strategy
const mongoose = require('mongoose');
const keys = require('../config/keys')
//const User = require('../models/user')

const User = mongoose.model('users')

passport.serializeUser((user, done) => {
    done(null, user.id) 
})

passport.deserializeUser((id, done) => {
    User.findById(id)
      .then(user => {
          done(null, user)
      })
})


passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy:true
    },
     (accessToken, refreshToken, profile, done) => {
        // after we have exchanged the 'code' with the actual user info
        console.log('profile', profile)
        User.findOne({googleId: profile.id})
          .then((existingUser) => {
            if(existingUser){
                //we already have a record with the given profile id
                done(null, existingUser)
            } 
            else {
                new User({googleId: profile.id}).save()
                .then(user => done(null, user))
            }
          })
         
      
    
  })
      
      
)
      