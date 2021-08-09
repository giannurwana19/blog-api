const express = require('express');
const { body } = require('express-validator');

const router = express.Router();

const blogController = require('../controllers/blog');

const validate = [
  body('title').isLength({ min: 5 }).withMessage('Input title tidak sesuai'),
  body('body').isLength({ min: 5 }).withMessage('Input body tidak sesuai'),
];

router.post('/post', validate, blogController.createBlogPost);
router.get('/posts', blogController.getAllBlogPost);
router.get('/post/:postId', blogController.getBlogPostById);
router.put('/post/:postId', validate, blogController.updateBlogPost);
router.delete('/post/:postId', blogController.deleteBlogPost);

module.exports = router;

// DOCS
// kita akan buat query params seperti ini
// router.get('/posts?page=1&perPage=5', blogController.getAllBlogPost);
