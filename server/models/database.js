const { Pool } = require('pg')

const pool = new Pool({
    host:'localhost',
    user :'postgres', 
    password:'elimora', 
    database:'eventosCientificosUjgh', 
    port:'5432'

})

module.exports = {
  query: (text, params) => pool.query(text, params),
}