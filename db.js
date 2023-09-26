// db.js
import mysql from 'mysql';

const Connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'goomerlistarango'
});

export default Connection;
