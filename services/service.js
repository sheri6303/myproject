const mongoose = require('mongoose');
const Sheri = mongoose.model('Sheri');
const Login = mongoose.model("Login");
const Signup=mongoose.model("Signup");
const bcrypt= require("bcrypt");
function insertRecord(req, res)
{
    var sheri = new Sheri();
    sheri.name = req.body.aname;
    sheri.address = req.body.address;
    sheri.contact = req.body.contact;

    sheri.save((err, doc)=>{
        if(!err){
            console.log("success");
        }else{
            console.log("error during record insersion: "+err);
        }
    });
}
 function signup(req,res)
{
    var signup = new Signup();
    signup.username = req.body.username;
    signup.password=bcrypt.hashSync(req.body.password, 10,function(err,hash){
    });
    Signup.find({username:signup.username},function(err,result){
        if (result==0)
        {
            signup.save((err, doc)=>{
                if(!err)
                    console.log("Signup success");
                else
                    console.log("error during record insersion: "+err);
            });
        }
        else
        console.log("user name already exists");
    });
    }
function login(req,res)
{
    var login;
    login=req.body.username;
    Signup.find({username:login},function(err,result){
        if (result.length>0)
        {
            bcrypt.compare(req.body.password,result[0].password,function(err,hash){
            if (hash)
                console.log("login success");
            else
                console.log("password does not match");
            });
        
        }
        else 
        console.log("user not find");
    });
}
function reset(req,res)
{
    var login;
    login=req.body.username;
    var signup=new Signup();
    Signup.find({username:login},function(err,result){
        if (result.length>0)
        {
            bcrypt.compare(req.body.password,result[0].password,function(err,hash){
            if (hash)
            {
                var passwordd=bcrypt.hashSync(req.body.newpassword, 10,function(err,hash){});
            Signup.updateOne({username :req.body.username},{$set:{username:req.body.username,password:passwordd}},function (err,result){
                console.log("Password updated");
            } 
                
            );
            }
            else
                console.log("password does not match");
            });
        
        }
        else 
        console.log("user not find");
    });
}
module.exports = {insertRecord,signup,login,reset}