// routes/users.js
const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const usersController = require('../controllers/usersController');
const asyncHandler = require('../middlewares/asyncHandler');

const userValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required')
];

function handleValidation(req, res, next) {
  const { validationResult } = require('express-validator');
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
}

router.get('/', asyncHandler(usersController.getAllUsers));
router.post('/', userValidation, handleValidation, asyncHandler(usersController.createUser));

module.exports = router;
