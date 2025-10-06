const express = require('express');
const { body, param, validationResult } = require('express-validator');
const router = express.Router();
const booksController = require('../controllers/booksController');
const asyncHandler = require('../middlewares/asyncHandler');

const bookValidation = [
  body('title').notEmpty().withMessage('Title is required'),
  body('author').notEmpty().withMessage('Author is required'),
  body('isbn').isISBN().withMessage('A valid ISBN is required'),
  body('pages').optional().isInt({ min: 1 }).withMessage('Pages must be a positive integer'),
  body('rating').optional().isFloat({ min: 0, max: 5 }).withMessage('Rating must be between 0 and 5')
];

function handleValidation(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
}

router.get('/', asyncHandler(booksController.getAllBooks));
router.get('/:id', [param('id').isMongoId().withMessage('Invalid ID')], handleValidation, asyncHandler(booksController.getBookById));
router.post('/', bookValidation, handleValidation, asyncHandler(booksController.createBook));
router.put('/:id', [param('id').isMongoId().withMessage('Invalid ID'), ...bookValidation], handleValidation, asyncHandler(booksController.updateBook));
router.delete('/:id', [param('id').isMongoId().withMessage('Invalid ID')], handleValidation, asyncHandler(booksController.deleteBook));

module.exports = router;

