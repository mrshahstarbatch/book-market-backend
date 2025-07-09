// book.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  name: String,
  imageUrl: String,
  location: String,
  contact: String
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
