const conn = {
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: 'postgres',
    database: 'ggl',
  },
};

const knexPg = require('knex')(conn);

module.exports = knexPg;
