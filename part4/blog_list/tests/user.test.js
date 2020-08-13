const mongoose = require('mongoose');
const supertest = require('supertest');
const bcrypt = require('bcrypt');
const app = require('../app');
const User = require('../models/user');
const helper = require('./test_helper');

const api = supertest(app);

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const salt = 10;
    const passwordHash = await bcrypt.hash('sekret', salt);
    const user = new User({
      username: 'root',
      name: 'Kevin',
      passwordHash,
    });

    await user.save();
  });

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'modx',
      name: 'Johnson',
      password: 'Society',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain('modx');
  });

  test('creating user without password or length less than 3, returns error', async () => {
    const usersAtStart = await helper.usersInDb();

    // no password
    const newUser = {
      username: 'Jxx',
      name: 'Johnson',
    };

    const failUser = await api
      .post('/api/users')
      .send(newUser)
      .expect(400);

    expect(failUser.error.message).toBe('cannot POST /api/users (400)');

    // password less than 3
    const newUser2 = {
      username: 'Jayd',
      name: 'Johns',
      password: 'fd',
    };

    const failUser2 = await api
      .post('/api/users')
      .send(newUser2)
      .expect(400);

    expect(failUser2.error.message).toBe('cannot POST /api/users (400)');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test('creating user with username length 1, returns error', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'J',
      name: 'Johns',
      password: 'fdlfldsfjdskl',
    };

    const failUser = await api
      .post('/api/users')
      .send(newUser)
      .expect(400);

    expect(failUser.error.message).toBe('cannot POST /api/users (400)');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
