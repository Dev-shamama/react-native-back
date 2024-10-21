const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
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
const Order = mongoose.model('Order', orderSchema);

// Export the Order model
module.exports = Order;
