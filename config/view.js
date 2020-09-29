const {join} = require('path');

module.exports = app => {

  app.set('view engine', 'hbs');
  app.set('views', join(__dirname, '../views/'));

};
