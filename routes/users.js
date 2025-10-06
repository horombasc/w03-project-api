const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const usersController = require('../controllers/usersController');
const asyncHandler = require('../middlewares/asyncHandler');

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

router.get('/', asyncHandler(usersController.getAllUsers));
router.get('/:id', asyncHandler(usersController.getUserById));
router.post('/', userValidation, handleValidation, asyncHandler(usersController.createUser));
router.put('/:id', userValidation, handleValidation, asyncHandler(usersController.updateUser));
router.delete('/:id', asyncHandler(usersController.deleteUser));

module.exports = router;


