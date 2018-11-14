/* importa o módulo do mysql */
var mysql = require('mysql');

var mysqlConnection = function(){
  return mysql.createConnection({
    host      : 'localhost',
    user      : 'root',
    password  : 'root',
    database  : 'syspaefi'
  });
}

module.exports = function(){
  return mysqlConnection;
}
