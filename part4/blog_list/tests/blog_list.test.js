const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const helper = require('./test_helper');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObject = helper.initialBlogs
    .map((blog) => new Blog(blog));
  const promiseArray = blogObject.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('there is an identifier id', async () => {
  const result = await api.get('/api/blogs');

  expect(result.body[0].id).toBeDefined();
});

test('creating a new blog successful', async () => {
  const newBlog = {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  const url = blogsAtEnd.map((r) => r.url);

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
  expect(url).toContain(
    'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
  );
});

test('blog without likes returned 0', async () => {
  const newBlog = {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200);

  const blogsAtEnd = await helper.blogsInDb();

  expect(blogsAtEnd[helper.initialBlogs.length].likes).toBe(0);
});

test('blog without title and url is not added', async () => {
  const newBlog = {
    author: 'Robert C. Martin',
    likes: 0,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400);

  const blogsAtEnd = await helper.blogsInDb();

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
});

test('delete a single blog post', async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToDelete = blogsAtStart[0];

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

  const url = blogsAtEnd.map((r) => r.url);
  expect(url).not.toContain(blogToDelete.url);
});

test('update a single blog', async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToUpdate = blogsAtStart[0];

  blogToUpdate.likes = 20;

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(blogToUpdate)
    .expect(200);

  const blogsAtEnd = await helper.blogsInDb();

  expect(blogsAtEnd[0].likes).toBe(20);
});

afterAll(() => {
  mongoose.connection.close();
});
