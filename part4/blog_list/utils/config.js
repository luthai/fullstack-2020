require('dotenv').config();

const { MONGODB_URI } = process.env;
const { PORT } = process.env;

if (process.env.NODE_ENV === 'test') {
  process.env.MONGODB_URI = process.env.TEST_MONGODB_URI;
}

module.exports = {
  MONGODB_URI,
  PORT,
};
