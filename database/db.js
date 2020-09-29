require('dotenv').config();
const mongoClient = require('mongodb').MongoClient;
const port = process.env.port || 4000;


module.exports.init = app => {
  mongoClient.connect(process.env.MONGO_URI,
    { useUnifiedTopology: true }
  )
    .then(
      database => {
        app.locals.db = database.db();
        app.listen(port, function() {
          console.log(`server is running on port: ${port}`);
        }
        );
      }
    ).catch(
      err => {
        console.log(`An error occurred while connecting to database:${err}`);
      },
    );
};

function getDb() {
  return mongoClient.connect(process.env.MONGO_URI,
    { useUnifiedTopology: true }
  )
    .then(
      database => database.db()
    ).catch(
      err => {
        console.log(`An error occurred while connecting to database:${err}`);
      },
    );
}

module.exports.db = getDb();
