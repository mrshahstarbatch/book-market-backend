// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'https://mrshahstarbatch.github.io',
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected successfully'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Book schema and model
const bookSchema = new mongoose.Schema({
  name: String,
  imageUrl: String,
  location: String,
  contact: String,
  uploadedAt: { type: Date, default: Date.now }
});

const Book = mongoose.model('Book', bookSchema);

// Routes
app.get('/', (req, res) => {
  res.send('📚 Welcome to Think X Book Marketplace Backend!');
});

// Upload a book
app.post('/api/books', async (req, res) => {
  const { name, imageUrl, location, contact } = req.body;

  if (!name || !imageUrl || !location || !contact) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const book = new Book({ name, imageUrl, location, contact });
    await book.save();
    res.status(201).json({ message: 'Book uploaded successfully!', book });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading book', error });
  }
});

// Get all books
app.get('/api/books', async (req, res) => {
  try {
    const books = await Book.find().sort({ uploadedAt: -1 });
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books', error });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
