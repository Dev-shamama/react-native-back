const mongoose = require('mongoose');

// Define schema for address
const addressSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  address_1: { type: String, required: true },
  address_2: { type: String },
  city: { type: String, required: true },
  postcode: { type: String, required: true },
  country: { type: String, required: true },
  state: { type: String, required: true }
});

// Define schema for items
const itemSchema = new mongoose.Schema({
  product_name: { type: String, required: true },
  quantity: { type: Number, required: true },
  subtotal: { type: Number, required: true },
  total: { type: Number, required: true },
  sku: { type: String, required: false }
});

// Define schema for order
const orderSchema = new mongoose.Schema({
  order_id: { type: Number, required: true, unique: true },
  total: { type: Number, required: true },
  status: { type: String, required: true },
  date: { type: Date, required: true },
  customer_name: { type: String, required: true },
  customer_email: { type: String, required: true },
  billing_address: addressSchema,
  shipping_address: addressSchema,
  items: [itemSchema],
  store_name: { type: String, required: true },
  store_url: { type: String, required: true }
});

// Create the Order model
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
