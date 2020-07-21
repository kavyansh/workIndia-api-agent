var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : "localhost",
  user     : "root",
  password : "root",
  database : "mydb",
  port: 3306
});
connection.connect(function(err){
if(!err) {
    console.log("Database is connected");
} else {
    console.log(err);
}
});
module.exports = connection; 