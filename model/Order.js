const mongoose = require('mongoose');

// Define a single schema for the order with embedded sub-schemas
const orderSchema = new mongoose.Schema({
  order_id: { type: Number, required: true, unique: true },
  total: { type: Number, required: true },
  status: { type: String, required: true },
  date: { type: Date, required: true },
  customer: {
    name: { type: String, required: true },
    email: { type: String, required: true }
  },
  billing_address: {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    address_1: { type: String, required: true },
    address_2: { type: String },
    city: { type: String, required: true },
    postcode: { type: String, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true }
  },
  shipping_address: {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    address_1: { type: String, required: true },
    address_2: { type: String },
    city: { type: String, required: true },
    postcode: { type: String, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true }
  },
  items: [{
    product_name: { type: String, required: true },
    quantity: { type: Number, required: true },
    subtotal: { type: Number, required: true },
    total: { type: Number, required: true },
    sku: { type: String }
  }],
  store_name: { type: String, required: true },
  store_url: { type: String, required: true }
});

// Create the model from the combined schema
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
