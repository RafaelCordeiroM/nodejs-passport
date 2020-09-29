const authController = require('../controllers/auth');
const {ObjectId} = require('mongodb');

module.exports = (app) => {

  const passport = require('passport');
  const GoogleStrategy = require('passport-google-oauth20').Strategy;
  const LocalStrategy = require('passport-local').Strategy;

  const {GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET} = process.env;

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async(id, done) => {
    const db = await require('../database/db').db;
    try {

      const user = await db.collection('users').findOne({_id: ObjectId(id)});
      if (!user) done('user not found');

      done(null, user);

    } catch (error) {
      done(error);
    }
  });


  passport.use('google',
    new GoogleStrategy({
    // options fot the google strategies
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    }, async(accessToken, refreshToken, profile, done) => {
    // passport callback function
      authController.google.login(profile)
        .then(user => {
          done(null, user);
        })
        .catch(err => {
          console.error(err);
          done(err);
        });
    })
  );

  passport.use(new LocalStrategy(
    function(username, password, done) {
      
    }
  ));
  // passport.use('local', new LocalStrategy());


};
