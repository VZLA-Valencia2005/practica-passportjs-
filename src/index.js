const express = require('express');
const exphbs = require('express-handlebars');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const dotenv = require('dotenv').config();
const path = require('path');

// Initializations
const app = express();
require('./passport');
const { isAuthenticated } = require('./auth');

// Middlewares
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({ 
    secret: process.env.SECRET, 
    resave: true, 
    saveUninitialized: true 
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan('dev'));
app.use(cors());

// Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

// Rutas
app.get('/', isAuthenticated, (req, res) => {
    res.send("Hello World");
});

app.get('/login', (req, res) => {
    res.status(200).render('formulario');
});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

// Server Starting

app.listen(app.get('port'), () => {
    console.log(`>>> Server On Port ${app.get('port')}`);
})
