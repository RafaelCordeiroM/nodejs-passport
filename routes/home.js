const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('home');
});

router.get('/dashboard', async(req, res) => {
  res.render('dashboard');
});

module.exports = router;
