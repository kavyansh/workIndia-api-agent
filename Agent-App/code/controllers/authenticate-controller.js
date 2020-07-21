var Cryptr = require('cryptr');
cryptr = new Cryptr('myTotalySecretKey');
 
var connection = require('./../config');
module.exports.authenticate=function(req,res){
    var agent_id=req.body.agent_id;
    var password=req.body.password;
   
   
    connection.query('SELECT * FROM users WHERE agent_id = ?',[agent_id], function (error, results, fields) {
      if (error) {
          res.json({
            status:'failure',
            status_code: 401
            })
      }else{
        if(results.length >0){
  decryptedString = cryptr.decrypt(results[0].password);
            if(password==decryptedString){
                res.json({
                    status:'success',
                    agent_id:results[0].agent_id,
                    status_code: 200
                })
            }else{
              res.json({
                status:'failure',
                status_code: 401
                })
            }
          
        }
        else{
          res.json({
              status:false,    
            message:"Agent does not exits"
          });
        }
      }
    });
}