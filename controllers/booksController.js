const Book = require('../models/Book');

// Get all books
exports.getAllBooks = async (req, res) => {
  const books = await Book.find();
  res.status(200).json(books);
};

// Get book by ID
exports.getBookById = async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.status(200).json(book);
};

// Create a new book
exports.createBook = async (req, res) => {
  const book = new Book(req.body);
  await book.save();
  res.status(201).json(book);
};

// Update a book
exports.updateBook = async (req, res) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.status(200).json(book);
};

// Delete a book
exports.deleteBook = async (req, res) => {
  const book = await Book.findByIdAndDelete(req.params.id);
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.status(200).json({ message: 'Book deleted successfully' });
};

