const { validationResult } = require('express-validator');
const BlogPost = require('../models/blog');

exports.createBlogPost = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err = new Error('Invalid Value');
    err.errorStatus = 400;
    err.data = errors.array();

    throw err;
  }

  if (!req.file) {
    const err = new Error('Image harus diupload');
    err.errorStatus = 422;

    throw err;
  }

  const { title, body } = req.body;
  const image = req.file.path;

  const Posting = new BlogPost({
    title,
    body,
    image,
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

exports.getAllBlogPost = (req, res, next) => {
  BlogPost.find()
    .then(result => {
      res.status(200).json({
        message: 'Data BlogPost berhasil dipanggil',
        data: result,
      });
    })
    .catch(err => {
      next(err); // kirim error ke depan
    });
};

exports.getBlogPostById = (req, res, next) => {
  const postId = req.params.postId;

  BlogPost.findById(postId)
    .then(result => {
      if (!result) {
        const error = new Error('BlogPost tidak ditemukan');
        error.errorStatus = 404;

        throw error;
      }

      res.status(200).json({
        message: 'Data BlogPost berhasil dipanggil',
        data: result,
      });
    })
    .catch(err => {
      next(err);
    });
};
