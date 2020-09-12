const router = require('express').Router();
const BLog = require('../models/blog');
const User = require('../models/user');

router.post('/reset', async (request, response) => {
  await BLog.deleteMany({});
  await User.deleteMany({});

  response.status(204).end();
});

module.exports = router;
