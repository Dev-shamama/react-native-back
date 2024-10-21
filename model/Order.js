const mongoose = require('mongoose');
// Define the schema for order items (optional, based on your use case)
const lineItemSchema = new mongoose.Schema({
    product_id: Number,
    product_name: String,
    quantity: Number,
    price: String
});

// Define the schema for billing and shipping details
const addressSchema = new mongoose.Schema({
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
});

// Define the main order schema
const orderSchema = new mongoose.Schema({
    id: Number,
    date: String,
    status: String,
    total: String,
    billing: addressSchema,
    shipping: addressSchema,
    line_items: [lineItemSchema]
});

// Create the Order model
const Order = mongoose.model('Order', orderSchema);
module.exports = Order;

