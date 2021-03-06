/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const blogsRouter = require('express').Router();
const config = require('../utils/config');
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.get('/:id', async (request, response) => {
  const { id } = request.params;

  const blog = await Blog.findById(id);
  response.json(blog);
});

blogsRouter.get('/:id/comments', async (request, response) => {
  const { id } = request.params;

  const blog = await Blog.findById(id);
  const { comments } = blog.toJSON();
  response.json(comments);
});

blogsRouter.post('/', async (request, response) => {
  const { body } = request;
  if (body.title === undefined) {
    return response.status(400).json({
      error: 'blog missing',
    });
  }

  const { token } = request;
  if (token === undefined) {
    return response.status(401).json({
      error: 'token missing or invalid',
    });
  }

  const decodedToken = jwt.verify(token, config.SECRET);
  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user.id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog.id);
  await user.save();

  response.json(savedBlog);
});

blogsRouter.put('/:id/comments', async (request, response) => {
  const { body } = request;
  const { id } = request.params;
  if (body.comment === undefined) {
    return response.status(400).json({
      error: 'comment missing',
    });
  }

  const blog = await Blog.findById(id);
  console.log(blog);
  blog.comments.push(body.comment);
  console.log(blog);
  const savedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true });
  response.status(200).json(savedBlog);
});

blogsRouter.delete('/:id', async (request, response) => {
  const { token } = request;
  if (token === undefined) {
    return response.status(401).json({
      error: 'token missing or invalid',
    });
  }

  const decodedToken = jwt.verify(token, process.env.SECRET);
  const user = await User.findById(decodedToken.id);

  const blog = await Blog.findById(request.params.id);
  if (blog.user.toString() !== user.id.toString()) {
    return response.status(401).json({
      error: 'cannot delete other users blogs',
    });
  }

  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
  const { body } = request;
  const { token } = request;

  if (token === undefined) {
    return response.status(401).json({
      error: 'token missing or invalid',
    });
  }

  const decodedToken = jwt.verify(token, process.env.SECRET);
  const user = await User.findById(decodedToken.id);

  const blog = await Blog.findById(request.params.id);
  if (blog.user.toString() !== user.id.toString()) {
    return response.status(401).json({
      error: 'cannot update other users blogs',
    });
  }

  const savedBlog = await Blog.findByIdAndUpdate(request.params.id, body, { new: true });
  response.status(200).json(savedBlog);
});

module.exports = blogsRouter;
