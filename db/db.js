const mongoose = require('mongoose');

const databaseUrl = process.env.DB_URL;

const connectDB = async () => {
  const connect = await mongoose.connect(databaseUrl);
  if (connect) {
    console.log('connection successfully');
  } else {
    console.log('connection not successfully');
  }
};

module.exports = connectDB;
