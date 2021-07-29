const express = require('express');
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')
const path = require('path');

const app = express();

app.use(express.static(__dirname + '/public'));

// Passport config
require('./config/passport')(passport)

// DB Config
const db = require('./config/keys').MONGOURI

// Connection to MongoDB
mongoose.connect(db, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
    .then(() => console.log('MongoDB connected Successfully!'))
    .catch(err => console.log(err))

// EJS
app.use(expressLayouts)
app.set('view engine', 'ejs')

// Body-Parser
app.use(express.urlencoded({ extended: false }))

// Express-Session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}))

// Passport Middleware
app.use(passport.initialize())
app.use(passport.session())

// Connect-Flash
app.use(flash())

// Global Variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    next()
})

// Routes
app.use('/', require('./routes/index'))

app.use('/users', require('./routes/users'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on Port ${PORT}`))