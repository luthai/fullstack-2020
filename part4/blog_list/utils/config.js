require('dotenv').config();

const { MONGODB__URI } = process.env;
const { PORT } = process.env;

module.exports = {
  MONGODB__URI,
  PORT,
};
