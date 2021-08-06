const { validationResult } = require('express-validator');
const BlogPost = require('../models/blog');

exports.createBlogPost = (req, res, next) => {
  const title = req.body.title;
  // const image = req.body.image;
  const body = req.body.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err = new Error('Invalid Value');
    err.errorStatus = 400;
    err.data = errors.array();

    throw err;
  }

  const Posting = new BlogPost({
    title,
    body,
    author: {
      uid: 1,
      name: 'Gian',
    },
  });

  Posting.save()
    .then(result => {
      res.status(201).json({
        message: 'Create Blog Post Success',
        data: result,
      });
    })
    .catch(err => console.log(err));
};
