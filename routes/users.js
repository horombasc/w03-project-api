const express = require('express');
const { body, param, validationResult } = require('express-validator');
const router = express.Router();
const usersController = require('../controllers/usersController');
const asyncHandler = require('../middlewares/asyncHandler');
const auth = require('../middlewares/auth');

// ------------------- Validation -------------------
const userValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

function handleValidation(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
}

// ------------------- PUBLIC ROUTES -------------------
// Register a new user
router.post('/register', userValidation, handleValidation, asyncHandler(usersController.registerUser));

// Login a user
router.post('/login',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required')
  ],
  handleValidation,
  asyncHandler(usersController.loginUser)
);

// ------------------- PROTECTED / DYNAMIC ROUTES -------------------
// Get all users
router.get('/', auth, asyncHandler(usersController.getAllUsers));

// Get user by ID
router.get('/:id', 
  [param('id').isMongoId().withMessage('Invalid ID')], 
  handleValidation, 
  auth, 
  asyncHandler(usersController.getUserById)
);

// Update user by ID
router.put('/:id', userValidation, handleValidation, auth, asyncHandler(usersController.updateUser));

// Delete user by ID
router.delete('/:id', auth, asyncHandler(usersController.deleteUser));

module.exports = router;








