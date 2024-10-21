const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  status: {
    type: String,
    required: true,
  },
  total: {
    type: String,
    required: true,
  },
  customer: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  
});

// Create a User model based on the schema
const User = mongoose.model('User', userSchema);

// Export the User model
module.exports = User;
