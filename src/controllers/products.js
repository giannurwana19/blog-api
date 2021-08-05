exports.createProduct = (req, res, next) => {
  res.json({
    message: 'Create product success!',
    data: {
      id: 1,
      name: 'Mie Ayam',
      price: 8000,
    },
  });
  next();
};

exports.getAllProduct = (req, res, next) => {
  res.json({
    message: 'Get all product success',
    data: [
      {
        id: 1,
        name: 'Mie Ayam',
        price: 8000,
      },
    ],
  });
  next();
};
