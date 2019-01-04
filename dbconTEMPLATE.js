// Code has been inspired by the model code in CS 340 (although altered significantly)


var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : '127.0.0.1',
  user            : '*****',
  password        : '*****',
  database        : '*****'
});
module.exports.pool = pool;