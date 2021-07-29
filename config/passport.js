// Create Local Strategy
const LocalStrategy = require('passport-local').Strategy;
// Require database
const mongoose = require('mongoose');
// Require decrypting password
const bcrypt = require('bcryptjs')

// Load User Model
const User = require('../models/User')

module.exports = function(passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            // Check if there is a user with that email
            User.findOne({ email: email })
                .then(user => {
                    if(!user) {
                        return done(null, false, { message: "This Email is not registered!" })
                    }

                    // Deal with Password matching
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if(err) throw err;

                        if(isMatch){
                            return done(null, user)
                        }
                        else {
                            return done(null, false, { message: "Password Incorrect" })
                        }
                    })
                })
                .catch(err => console.log(err))
        })
    )

    // Serialise and Deserialise User
    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser((id, done) => {
        User.findById(id, function(err, user){
            done(err, user)
        })
    })
}
