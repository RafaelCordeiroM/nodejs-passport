// const validator = require('../modules/validator');

module.exports.google = {
  async login(profile){
    // instance of db
    const db = await require('../database/db').db;

    const checkIfExists = async() => {
      try {
        const user = await db.collection('users')
          .findOne({googleId: profile.id});

        // if user exists
        if (user) return user;
        // create if user does not exist
        else return createUser();

      } catch (error) {
        throw new Error(error);
      }
    };

    const createUser = async() => {
      try {
        const user = await db.collection('users').insertOne({
          googleId: profile.id,
          username: profile.displayName,
        });
        return user.ops[0];

      } catch (error) {
        throw new Error(error);
      }
    };

    return checkIfExists();


  },
};

module.exports.email = {
  login(req, res){

  },
};
