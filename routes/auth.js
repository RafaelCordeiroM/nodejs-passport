const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth');
const passport = require('passport');

router.get('/google', passport.authenticate('google', {
  scope: ['profile'],
}));

router.get('/google/callback', passport.authenticate('google'), (req, res) => {
  res.send("hg");
});


router.get('/email', controller.email.login);


router.get('/logout', (req, res) => {
  res.send('logging out');
});


module.exports = router;
