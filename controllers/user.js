const validator = require('../modules/validator');

/**
 * STORE
 */
module.exports.validate = (req, res) => {
  // var { db } = req.app.locals;


  const validate = async() => {
    res.send(validator.user(req.body));
  };

  validate()
    .catch(err => {
      if (err.code !== '422' && err.code !== '409') {
        console.log('Ocorreu um erro: ' + err);
        res.status(500).json('Erro processando requisição.');
      }
    });
};
/**
 * INDEX
 */
module.exports.index = async(req, res) => {
  var { db } = req.app.locals;
  const find = async() => {
    const users = await db.collection('users').find().toArray();
    return users;
  };

  return find()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      console.log(`An error occurred: ${err.error}`);
      res.status(err.status).json(err.message);
    },
    );
};
