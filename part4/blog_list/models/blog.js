/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 5,
  },
  author: {
    type: String,
    required: true,
    minlength: 3,
  },
  url: {
    type: String,
    required: true,
    minlength: 10,
  },
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  comments: [
    {
      type: String,
      minlength: 5,
    },
  ],
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
