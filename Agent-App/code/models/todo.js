var connection = require ('../config.js');

module.exports=function Todo(){
this.getByID = function(agent_id,res){
con.query('select name, description from todo where agent_id = ? order by date', agent_id, function(err,result) {
        con.release();
        res.send(result);
        console.log("Get by ID successful");
      });
    
  };

  this.create = function(todo,res){
   
      con.query('insert into todo set ?', todo, function(err,result) {
        con.release();
        if (err) {
          res.send({status:1, message:'TODO creation fail'});
        } else {
          res.send({status:0, message:'TODO create success'});
          console.log("Post successful");
        }
      });
    
  };
};
