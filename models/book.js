const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  name: String,
  author: String,
  subject: String,
  location: String,
  imageUrl: String, // ✅ changed from image → imageUrl
  contact: String,
}, { timestamps: true });

const Book = mongoose.model('book', bookSchema);
module.exports = Book;
