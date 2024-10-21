const mongoose = require('mongoose');

// Define a single schema for the order with embedded sub-schemas
const orderSchema = new mongoose.Schema({
  order_id: { type: Number },
  total: { type: Number },
  status: { type: String },
  date: { type: Date },
  customer: {
    name: { type: String },
    email: { type: String }
  },
  billing_address: {
    first_name: { type: String },
    last_name: { type: String },
    address_1: { type: String },
    address_2: { type: String },
    city: { type: String },
    postcode: { type: String },
    country: { type: String },
    state: { type: String }
  },
  shipping_address: {
    first_name: { type: String },
    last_name: { type: String },
    address_1: { type: String },
    address_2: { type: String },
    city: { type: String },
    postcode: { type: String },
    country: { type: String },
    state: { type: String }
  },
  items: [{
    product_name: { type: String },
    quantity: { type: Number },
    subtotal: { type: Number },
    total: { type: Number },
    sku: { type: String }
  }],
  store_name: { type: String },
  store_url: { type: String }
});

// Create the model from the combined schema
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
