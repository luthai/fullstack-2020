const dummy = () => 1;

const totalLikes = (blogs) => blogs
  .map((blog) => blog.likes)
  .reduce((total, item) => total + item);

module.exports = {
  dummy,
  totalLikes,
};
