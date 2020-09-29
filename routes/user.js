const express = require('express');
const router = express.Router();
const controller = require('../controllers/user');

// routes
router.route('/api/user')
  .post(controller.validate)
  .get(controller.index);

module.exports = router;
