const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 4000;

const authRoutes = require('./src/routes/auth');
const blogRoutes = require('./src/routes/blog');

app.use(bodyParser.json()); // type JSON

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

app.listen(port);

// h: DOCS
// * artinya mengizinkan semua akses origin untuk masuk ke aplikasi
