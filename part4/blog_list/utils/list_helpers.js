const dummy = () => 1;

const totalLikes = (blogs) => blogs
  .map((blog) => blog.likes)
  .reduce((total, item) => total + item);

const favoriteBlog = (blogs) => blogs.reduce((acc, cur) => (cur.likes > acc.likes ? cur : acc));

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
