const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require('cors');
const bodyParser = require('body-parser')
const passport = require('passport');
const session = require('express-session');

dotenv.config();

const connectDB = require("./config/db");
const auth = require('./middleware/auth');

const customerRoutes = require('./routes/customerRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

app.use(express.json());
app.use(bodyParser.json()); 

app.use(session({
  secret: 'secret', 
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Use `secure: true` in production with HTTPS
}));

// Initialize passport and passport session
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("Server is connected");
});

app.use('/api', customerRoutes);
app.use('/api', orderRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectDB();
});

app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }),(req, res) => {
  res.redirect('/profile');
});

app.get('/profile', (req, res) =>{
  res.send(`Welcome ${req.user.displayName}`);
});

app.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
});
});