const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 4000;

const authRoutes = require('./src/routes/auth');
const blogRoutes = require('./src/routes/blog');

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + '-' + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(bodyParser.json()); // type JSON
app.use('/images', express.static(path.join(__dirname, 'images'))); // mengakses image
app.use(multer({ storage: fileStorage, fileFilter }).single('image'));

// mencegah cors origin
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE, OPTIONS'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Route Group
app.use('/v1/auth', authRoutes);
app.use('/v1/blog', blogRoutes);

app.use((err, req, res, next) => {
  const status = err.errorStatus || 500;
  const message = err.message;
  const data = err.data;

  res.status(status).json({ message, data });
});

mongoose
  .connect('mongodb+srv://gian:passwordmongo@cluster0.ry4cf.mongodb.net/blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    app.listen(port, () => console.log('Connection Success'));
  })
  .catch(err => console.log(err));

// h: DOCS
// * artinya mengizinkan semua akses origin untuk masuk ke aplikasi
// mongodb+srv://gian:passwordmongo@cluster0.ry4cf.mongodb.net/blog
// blog adalah nama database
// multer adalah middleware untuk menghandle multipart/form-data
