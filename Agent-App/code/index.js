var express=require("express");
var bodyParser=require('body-parser');
var todo = require('./models/todo');
var con = require ('./config.js');

var connection = require('./config');
var app = express();
 
var authController=require('./controllers/authenticate-controller');
var regController=require('./controllers/register-controller');
 
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', function (req, res) {  
   res.sendFile( __dirname + "/" + "index.html" );  
})  


 
app.get('/login.html', function (req, res) {  
   res.sendFile( __dirname + "/" + "login.html" );  
})  


 
/* route to handle login and registration */
app.post('/app/agent',regController.register);
app.post('/app/agent/auth',authController.authenticate);
 
console.log(authController);
app.post('/controllers/register-controller', regController.register);
app.post('/controllers/authenticate-controller', authController.authenticate);


app.get('/app/sites/list/:agent',function(req,res){
   con.query('select name, description from todo where agent_id = ? order by date', agent_id, function(err,result) {
      con.release();
      res.send(result);
      console.log("Get by ID successful");
    });

 });


 


 app.post('/app/sites/:agent',function(req,res) {
   con.query('insert into todo set ?', todo, function(err,result) {
      con.release();
      if (err) {
        res.send({status:1, message:'TODO creation fail'});
      } else {
        res.send({status:0, message:'TODO create success'});
        console.log("Post successful");
      }
    });
 });


app.listen(4000);

