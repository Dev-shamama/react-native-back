const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    id: Number,
    date: String,
    status: String,
    total: String,
    customer: String
});

// Create the Order model
const Order = mongoose.model('Order', orderSchema);
module.exports = Order;

