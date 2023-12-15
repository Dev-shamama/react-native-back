const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  data: [
    {
      key: {
        type: String,
        required: true,
      },
      task: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create a User model based on the schema
const Task = mongoose.model('Task', userSchema);

// Export the User model
module.exports = Task;
