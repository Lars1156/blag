const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    maxLength: 200
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
