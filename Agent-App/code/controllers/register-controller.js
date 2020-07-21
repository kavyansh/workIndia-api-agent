var Cryptr = require('cryptr');
var express=require("express");
var connection = require('./../config');
// cryptr = new Cryptr('myTotalySecretKey');
 
module.exports.register=function(req,res){
    var today = new Date();
  var encryptedString = cryptr.encrypt(req.body.password);
    var users={
        "agent_id":req.body.agent_id,
        "password":encryptedString,
        "created_at":today
    }
    connection.query('INSERT INTO users SET ?',users, function (error, results, fields) {
      if (error) {
        res.json({
            status:'failure',
            status_code:401
        })
      }else{
          res.json({
            status:'success',
            agent_id: req.body.agent_id,
            status_code:200
        })
      }
    });
}