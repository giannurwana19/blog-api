const express = require('express');

const app = express();
const port = 4000;

app.use(() => {
  console.log('Hello server');
});

app.listen(port);
