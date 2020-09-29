const express = require('express');
const userRouter = require('../routes/user');
const authRouter = require('../routes/auth');
const homeRouter = require('../routes/home');
const validateReq = require('../modules/validate_req');

module.exports = app => {

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(validateReq);

  // routes
  app.use(homeRouter);
  app.use('user', userRouter);
  app.use('/auth', authRouter);


  // 404 page
  app.use(function(req, res, next) {
    res.status(404);
    // respond with json
    if (req.accepts('json')) {
      return res.send({ error: 'Not found' });
    }

    // default to plain-text. send()
    res.type('txt').send('Not found');
  });

};

