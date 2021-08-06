exports.createProduct = (req, res, next) => {
  const { name, price } = req.body;

  res.json({
    message: 'Create product success!',
    data: {
      id: 1,
      name,
      price,
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
