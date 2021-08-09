const { validationResult } = require('express-validator');
const BlogPost = require('../models/blog');
const path = require('path');
const fs = require('fs');

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
  const currentPage = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage) || 5;
  let totalItems;

  BlogPost.find()
    .countDocuments()
    .then(count => {
      totalItems = count;
      return BlogPost.find()
        .skip((currentPage - 1) * perPage)
        .limit(perPage);
    })
    .then(result => {
      res.status(200).json({
        message: 'Data BlogPost berhasil dipanggil',
        data: result,
        total_data: totalItems,
        per_page: perPage,
        current_page: currentPage,
      });
    })
    .catch(err => {
      next(err);
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

exports.updateBlogPost = (req, res, next) => {
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
  const postId = req.params.postId;

  BlogPost.findById(postId)
    .then(post => {
      if (!post) {
        const err = new Error('Blog Post tidak ditemukan');
        err.errorStatus = 404;

        throw err;
      }

      post.title = title;
      post.body = body;
      post.image = image;

      return post.save().then(result => {
        res.status(200).json({
          message: 'Update Sukses',
          data: result,
        });
      });
    })
    .catch(err => {
      next(err);
    });
};

exports.deleteBlogPost = (req, res, next) => {
  const postId = req.params.postId;

  BlogPost.findById(postId)
    .then(post => {
      if (!post) {
        const error = new Error('Blog Post tidak ditemukan');
        error.errorStatus = 404;

        throw error;
      }

      removeImage(post.image);
      return BlogPost.findByIdAndRemove(postId);
    })
    .then(result => {
      res.status(200).json({
        message: 'Hapus Post berhasil',
        data: result,
      });
    })
    .catch(err => {
      next(err);
    });
};

const removeImage = filePath => {
  console.log('filePath', filePath);
  console.log('dirname', __dirname);

  filePath = path.join(__dirname, '../..', filePath);

  fs.unlink(filePath, err => console.log(err));
};

// DOCS

// Promise bisa nested
// untuk nested, kita bisa then di luar promise itu atau then di dalam promisenya sendiri

// pagination
// skip untuk melewati data
// parameter dari skip adalah hasil pethitungan dari banyak data yang akan di lewati
// terus kita limit data nya (batasi)

// tanpa pagination
// BlogPost.find()
//   .then(result => {
//     res.status(200).json({
//       message: 'Data BlogPost berhasil dipanggil',
//       data: result,
//     });
//   })
//   .catch(err => {
//     next(err); // kirim error ke depan
//   });
