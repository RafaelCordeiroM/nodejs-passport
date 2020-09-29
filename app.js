const express = require('express');
const app = express();

const database = require('./database/db').init;
const routes = require('./config/routes');
const view = require('./config/view');

// passport
const passport = require('passport');
const passportSetup = require('./services/passport');

const compression = require('compression');
const helmet = require('helmet');
const cookieSession = require('cookie-session');


app.use(compression());
app.use(helmet());

const {COOKIE_SECRET} = process.env;

app.use(cookieSession({
  maxAge: 24 * 60 * 1000,
  keys: [COOKIE_SECRET],
}));

app.use(passport.initialize());
app.use(passport.session());

// setup database
database(app);

// setup views
view(app);

// setup routes
routes(app);

// passport
passportSetup(app);

module.exports = () => app;
