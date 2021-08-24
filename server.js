require('./models/db');
var express = require('express');
var app = express();
const controller=require('./controllers/controller');
app.use(express.urlencoded({extended: true}));
app.use(express.json())

app.use('/',controller)

app.set('view engine', 'pug');
app.set('views','./views');

  app.listen(process.env.PORT || 3002,function(req,res)
{
  
  console.log('server is running');
});
  