const express = require('express')
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth')

// Welcome Page
router.get('/', (req, res) => res.render('welcome'))

// Dashboard Page
router.get('/dashboard', ensureAuthenticated, (req, res) => res.render('dashboard', {
    name: req.user.name,
    branch: req.user.branch,
    year: req.user.year,
    domain: req.user.domain,
    email: req.user.email,
    skill_1: req.user.skill_1,
    skill_2: req.user.skill_2,
    skill_3: req.user.skill_3,
    skill_4: req.user.skill_4,
    skill_5: req.user.skill_5,
    skill_6: req.user.skill_6,
    skill_7: req.user.skill_7,
    skill_8: req.user.skill_8,
    skill_9: req.user.skill_9,
    skill_10: req.user.skill_10,
    project1head: req.user.project1head,
    project2head: req.user.project2head,
    project3head: req.user.project3head,
    project1description: req.user.project1description,
    project2description: req.user.project2description,
    project3description: req.user.project3description,
    instagram: req.user.instagram,
    twitter: req.user.twitter,
}))

module.exports = router;