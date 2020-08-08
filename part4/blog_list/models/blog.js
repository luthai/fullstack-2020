/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const config = require('../utils/config');
const logger = require('../utils/logger');

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

logger.info(`connected to ${config.MONGODB_URI}`);

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.info('error connecting to MongoDB', error.message);
  });

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

blogSchema.plugin(uniqueValidator);

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    const newObject = returnedObject;
    newObject.id = returnedObject._id.toString();
    delete newObject._id;
    delete newObject.__v;
  },
});

module.exports = mongoose.model('Blog', blogSchema);
