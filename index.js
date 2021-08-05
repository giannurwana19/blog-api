const express = require('express');

const app = express();
const router = express.Router();
const port = 4000;

router.use('/products', (req, res, next) => {
  res.json({ name: 'Gian Nurwana', email: 'gian@gmail.com' });
  next();
});

router.use('/price', (req, res, next) => {
  res.json({ price: 150000 });
  next();
});

router.get('/customers', (req, res, next) => {
  res.json({ title: 'Customer' });
  next();
});

app.use('/', router);

app.listen(port);
