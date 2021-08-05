const express = require('express');

const app = express();
const port = 4000;

const productRoutes = require('./src/routes/products');

app.use('/', productRoutes);

app.listen(port);
