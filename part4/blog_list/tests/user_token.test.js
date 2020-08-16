const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const User = require('../models/user');

const api = supertest(app);

let TOKEN;

describe('testing user and blog list with token authorization', () => {
  test('blogs and users are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('create new user successful', async () => {
    await User.deleteMany({});

    const newUser = {
      username: 'root',
      name: 'Kevin',
      password: 'sekret',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200);
  });

  test('user login successful', async () => {
    const newUser = {
      username: 'root',
      password: 'sekret',
    };

    const login = await api
      .post('/api/login')
      .send(newUser)
      .expect(200);

    TOKEN = login.body.token;
  });

  test('user create new note successfully', async () => {
    await Blog.deleteMany({});

    const newBlog = {
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${TOKEN}`)
      .expect(200);
  });

  test('user create new note without token, return unsuccessful', async () => {
    const newBlog = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
