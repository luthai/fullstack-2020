const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const blogsRouter = require('./controllers/blogs');
const middleware = require('./utils/middleware');
const config = require('./utils/config');
const logger = require('./utils/logger');

const app = express();

logger.info(`connected to ${config.MONGODB_URI}`);

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.info('error connecting to MongoDB', error.message);
  });

app.use(express.json());
app.use(cors());

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/blogs', blogsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
