const { Pool } = require('pg');

const pool = new Pool({
    user:"postgres",
    host:"localhost",
    password:"Social@123#",
    database:"link_united",
    port:5432
})

pool.connect()
    .then(() => console.log("postgre connection successfull."))
    .catch(err => console.error(err));

module.exports = pool;