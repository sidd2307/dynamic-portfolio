const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport')

// Users model
const User = require('../models/User')

// Login Page
router.get('/login', (req, res) => res.render('login'));

// Register Page
router.get('/register', (req, res) => res.render('register'));

// Register Handle
router.post('/register', (req, res) => {
    const { name, email, branch, year, domain, skill_1, skill_2, skill_3, skill_4, skill_5, skill_6, skill_7, skill_8, skill_9, skill_10, project1head, project1description, project2head, project2description, project3head, project3description, instagram, twitter, password, password2 } = req.body;
    let errors = [];

    // Check required fields
    if(!name || !email || !branch || !year || !domain || !password || !password2){
        errors.push({ msg: 'Please fill in all fields' });
    }

    // Check Passwords Match
    if(password !== password2){
        errors.push({ msg: 'Passwords do not match!' });
    }

    // Check pass length
    if(password.length < 6){
        errors.push({ msg: 'Password should be atleast 6 characters' });
    }

    if(errors.length > 0){
        res.render('register', {
            errors,
            name,
            email,
            branch,
            year,
            domain,
            skill_1,
            skill_2,
            skill_3,
            skill_4,
            skill_5,
            skill_6,
            skill_7,
            skill_8,
            skill_9,
            skill_10,
            project1head,
            project1description,
            project2head,
            project2description,
            project3head,
            project3description,
            instagram,
            twitter,
            password,
            password2
        })
    } else {
    // Validation Passed
    User.findOne({ email: email })
        .then(user => {
            if(user){
                // User exists
                errors.push({ msg: 'Email is already registered' });
                res.render('register', {
                    errors,
                        name,
                        email,
                        branch,
                        year,
                        domain,
                        skill_1,
                        skill_2,
                        skill_3,
                        skill_4,
                        skill_5,
                        skill_6,
                        skill_7,
                        skill_8,
                        skill_9,
                        skill_10,
                        project1head,
                        project1description,
                        project2head,
                        project2description,
                        project3head,
                        project3description,
                        instagram,
                        twitter,
                        password,
                        password2
                });
            } else {
                const newUser = new User({
                    name,
                        email,
                        branch,
                        year,
                        domain,
                        skill_1,
                        skill_2,
                        skill_3,
                        skill_4,
                        skill_5,
                        skill_6,
                        skill_7,
                        skill_8,
                        skill_9,
                        skill_10,
                        project1head,
                        project1description,
                        project2head,
                        project2description,
                        project3head,
                        project3description,
                        instagram,
                        twitter,
                        password,
                });
                // Hash Password
                bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    
                    // Set password to hashed
                    newUser.password = hash;

                    // Save the user
                    newUser.save()
                    .then(user => {
                        req.flash('success_msg', 'Congeatulations! You have registered successfully! You can login now.');
                        res.redirect('/users/login');
                    })
                    .catch(err => console.log(err));
                }))
            }
        });
    }
})

// Login Handle
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

// Logout Handle
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out successfully!');
    res.redirect('/users/login')
});

module.exports = router;