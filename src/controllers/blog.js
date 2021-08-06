exports.createBlogPost = (req, res, next) => {
  const title = req.body.title;
  // const image = req.body.image;
  const body = req.body.body;

  const result = {
    message: 'Create Blog Post Success',
    data: {
      post_id: 1,
      title,
      image: 'image.jpg',
      body,
      created_at: '6/08/2021',
      author: {
        uid: 1,
        name: 'testing',
      },
    },
  };

  res.status(201).json(result);
};
