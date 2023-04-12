var express = require('express');
var path = require('path');

const mysql= require('mysql');

var indexRouter = require('./routes/index');
const { Console } = require('console');

var app = express();

const connection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password  :'abcd',
  database : 'petshop'
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);


    
app.post("/login", function(req,res){
  console.log("req" + req.body.username);
  var username = req.body.username;
  var password = req.body.password;
  console.log(username);
  console.log(password);
  
  connection.query("select * from user where user_email = ? and user_password = ?",[username,password],function(error,results,fields){
      if (results.length > 0) {
        console.log(results);
        console.log("login successful");
          res.redirect("/");
      } else {
        console.log(error);
          res.redirect("/error");
      }
      res.end();
  })
})

app.listen('3000', function(req, res) {
  console.log("App running on port: 3000")
})


module.exports = app;