const express = require('express');
const connectDB = require('./db/db');
const User = require('./model/Data');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;

// DB connection
connectDB();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// APIs Router
app.get('/api/v1/get', async (req, res) => {
  const data = await User.find();
  res.json({success: true, data});
});

app.post('/api/v1/save', async (req, res) => {
  const data = User(req.body);
  await data.save();
  res.json({success: true, message: 'data save successfully'});
});

app.listen(port, () =>
  console.log('> Server is up and running on port : http://localhost:' + port),
);
