const express = require('express');
const { body } = require('express-validator');

const router = express.Router();

const blogController = require('../controllers/blog');

const validate = [
  body('title').isLength({ min: 5 }).withMessage('Input title tidak sesuai'),
  body('body').isLength({ min: 5 }).withMessage('Input body tidak sesuai'),
];

router.post('/post', validate, blogController.createBlogPost);

module.exports = router;
