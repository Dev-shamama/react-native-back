const mongoose = require('mongoose');

// Define the main order schema directly, embedding the address and line items within it
const orderSchema = new mongoose.Schema({
    id: Number,
    date: String,
    status: String,
    total: String,

    // Billing and shipping addresses are directly embedded
    billing: {
        first_name: String,
        last_name: String,
        email: String,
        phone: String,
        address_1: String,
        address_2: String,
        city: String,
        state: String,
        postcode: String,
        country: String
    },
    
    shipping: {
        first_name: String,
        last_name: String,
        address_1: String,
        address_2: String,
        city: String,
        state: String,
        postcode: String,
        country: String
    },

    // Line items array embedded directly within the order schema
    line_items: [
        {
            product_id: Number,
            product_name: String,
            quantity: Number,
            price: String
        }
    ]
});

// Create the Order model
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
