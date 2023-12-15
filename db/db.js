const mongoose = require('mongoose');


const connectDB = async () => {
  const databaseUrl = process.env.DB_URL;
  const connect = await mongoose.connect(databaseUrl);
  if (connect) {
    console.log('connection successfully');
  } else {
    console.log('connection not successfully');
  }
};

module.exports = connectDB;
