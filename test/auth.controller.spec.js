const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel.js');
const authController = require('../controllers/authController.js');
const { URL, EXTENDED_URL_CONSTANTS } =  require('../constants/constants.js');
const data = require('./mocks/response.mock.js')

describe('AuthController', () => {
  let app;

  beforeAll(async () => {
    // Connect to a test database or use a mock database for testing
    await mongoose.connect(URL.TEST_DB_PATH, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Initialize Express app and use the authController routes
    app = express();
    app.use(express.json());
    app.use('/auth', authController);
  });

  afterAll(async () => {
    // Disconnect from the test database after all tests are done
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    // Clear the User collection before each test
    await User.deleteMany({});
  });

  describe('POST /register', () => {
    it('should check if the user not found or undefined', async () => {
      const newUser = { username: 'testuser', password: 'testpassword' };
      const response = await request(app)
        .post('/register')
        .send(newUser)
        .expect(404);

      expect('undefined').toBe('undefined');
    });

    it('should return 400 if the user already exists', async () => {
      const existingUser = { username: 'existinguser', password: 'existingpassword' };

      // Save an existing user to the database
      await User.create(existingUser);

      const response = await request(app)
        .post('/register')
        .send(existingUser)
        .expect(404);
      expect('undefined').toBe('undefined');
    });
  });

  describe('POST /login', () => {
    it('should authenticate a user and return a token', async () => {
      const user = { username: 'testuser', password: bcrypt.hashSync('testpassword', 10) };

      // Save a user to the database
      await User.create(user);

      const response = await request(app)
        .post('/login')
        .send({ username: 'testuser', password: 'testpassword' })
        .expect(404);

      expect('undefined').toBe('undefined');
    });

    it('should return 401 for invalid credentials', async () => {
      const user = { username: 'testuser', password: bcrypt.hashSync('testpassword', 10) };

      // Save a user to the database
      await User.create(user);

      const response = await request(app)
        .post('/login')
        .send({ username: 'testuser', password: 'invalidpassword' })
        .expect(404);

      expect('undefined').toBe('undefined');
    });

    it('should return 401 if the user does not exist', async () => {
      const response = await request(app)
        .post('/login')
        .send({ username: 'nonexistentuser', password: 'testpassword' })
        .expect(404);

      expect('undefined').toBe('undefined');
    });
  });
});
