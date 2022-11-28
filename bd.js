const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'admin',
  password: '1111',
  host: 'localhost',
  port: 5432,
  database: 'for_test'
});

module.exports = pool;