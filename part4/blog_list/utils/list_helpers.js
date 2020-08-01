const _ = require('lodash');

const dummy = () => 1;

const totalLikes = (blogs) => blogs
  .map((blog) => blog.likes)
  .reduce((total, item) => total + item);

const favoriteBlog = (blogs) => blogs.reduce((acc, cur) => (cur.likes > acc.likes ? cur : acc));

const mostBlogs = (blogs) => _(blogs)
  .countBy('author')
  .map((count, author) => (
    {
      author,
      blogs: count,
    }
  ))
  .maxBy('blogs');

const mostLikes = (blogs) => _(blogs)
  .groupBy('author')
  .map((value, key) => (
    {
      author: key, likes: _.sumBy(value, 'likes'),
    }
  ))
  .maxBy('likes');

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
