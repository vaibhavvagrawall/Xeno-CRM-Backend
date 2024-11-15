const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require('cors');
const bodyParser = require('body-parser')
const passport = require('passport');
const session = require('express-session');

dotenv.config();

const connectDB = require("./config/db");
const passportSetup = require('./middleware/passport');

const customerRoutes = require('./routes/customerRoutes');
const orderRoutes = require('./routes/orderRoutes');
const audienceRoutes = require('./routes/audienceRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(express.json());
app.use(bodyParser.json()); 

app.use(session({
  secret: 'secret', 
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use(cors({
  origin: 'http://localhost:5173',
  methods: "GET, POST, PUT, DELETE",
  credentials: true,
}))

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("Server is connected");
});

app.use(authRoutes);

app.use('/api', customerRoutes);
app.use('/api', orderRoutes);
app.use('/api', audienceRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectDB();
});