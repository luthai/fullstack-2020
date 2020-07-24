/* eslint-disable no-console */
const express = require('express');
const cors = require('cors');
const Blog = require('./models/blogs');

const app = express();

app.use(express.json());
app.use(cors());

app.use(cors());
app.use(express.json());

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then((blogs) => {
      response.json(blogs);
    });
});

app.post('/api/blogs', (request, response) => {
  const { body } = request;
  console.log(body);
  if (body.title === undefined) {
    return response.status(400).json({
      error: 'title missing',
    });
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  });

  blog
    .save()
    .then((result) => {
      response.status(201).json(result);
    });
});

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
