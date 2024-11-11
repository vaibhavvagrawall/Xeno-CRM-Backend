const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require('cors');
const bodyParser = require('body-parser')
const connectDB = require("./config/db");
const customerRoutes = require('./routes/customerRoutes');
const orderRoutes = require('./routes/orderRoutes');

dotenv.config();

const app = express();

app.use(express.json());
app.use(bodyParser.json()); 

app.get("/", (req, res) => {
  res.send("Server is connected");
});


app.use('/api', customerRoutes);
app.use('/api', orderRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectDB();
});
