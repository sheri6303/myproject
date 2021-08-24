var express = require('express');
const services=require('../services/service');
const { model } = require('mongoose');
var router=express.Router();

router.get('/', function(req, res)
{
    res.render('form')
});

router.post('/', function(req, res)
{
    
    services.insertRecord(req,res);
});
router.get('/home', function(req, res)
{
    
    res.sendFile(__dirname + '/static/index.html');
});

router.get('/signup', (req, res) => {
    res.sendFile(__dirname + '/static/signup.html');
  });
  router.post('/signup', (req, res) => {
    // Insert Login Code Here
    //let username = req.body.username;
    //let password = req.body.password;
    //res.send(`Username: ${username} Password: ${password}`);
    services.signup(req,res);
  });
  router.get('/reset',function(req,res){
    res.sendFile(__dirname + '/static/resetPassword.html');
  });
  router.post('/reset',(req,res)=>{
    services.reset(req,res);
});
  router.get('/login',(req,res)=>{
    res.sendFile(__dirname + '/static/login.html');

});
router.post('/login',(req,res)=>{
    services.login(req,res);
});

  module.exports=router;