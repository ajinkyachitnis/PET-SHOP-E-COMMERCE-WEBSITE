var express = require('express');
var router = express.Router();

var database = require('../database');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.session);
  res.render('Landing_Page', { title: 'Express', session : req.session });
});

// GET Login And SignUP page
router.get('/login', function(req, res, next) {
  res.render('login');
});

// CATS PRODUCTS 
router.get("/cat-foods", async function(req,res) {
  await database.query("select * from cat_food", function(error, results){
    res.render('Products', {foodArray: results,Text:"Cat Foods", session:req.session}); 
  })
})

router.get("/cat-toys", async function(req,res) {
  await database.query("select * from cat_toys", function(error, results){
    res.render('Products', {foodArray: results,Text:"Cat Toys", session:req.session}); 
  })
})

router.get("/cat-treats", async function(req,res) {
  await database.query("select * from cat_treats_biscuits", function(error, results){
    res.render('Products', {foodArray: results,Text:"Cat Treats", session:req.session}); 
  })
})

router.get("/cat-leashes", async function(req,res) {
  await database.query("select * from cat_leash", function(error, results){
    res.render('Products', {foodArray: results,Text:"Cat Leashes", session:req.session}); 
  })
})

// DOG PRODUCTS 
router.get("/dog-foods", async function(req,res) {
  await database.query("select * from dog_food", function(error, results){
    res.render('Products', {foodArray: results,Text:"Dog Foods", session:req.session}); 
  })
})

router.get("/dog-toys", async function(req,res) {
  await database.query("select * from dog_toys", function(error, results){
    res.render('Products', {foodArray: results,Text:"Dog Toys", session:req.session}); 
  })
})

router.get("/dog-treats", async function(req,res) {
  await database.query("select * from dog_treat_biscuits_chewys", function(error, results){
    res.render('Products', {foodArray: results,Text:"Dog Treats", session:req.session}); 
  })
})

router.get("/dog-leashes", async function(req,res) {
  await database.query("select * from dog_leash", function(error, results){
    res.render('Products', {foodArray: results,Text:"Dog Leashes", session:req.session}); 
  })
})

//BIRD PRODUCTS
router.get("/bird-foods", async function(req,res) {
  await database.query("select * from bird_food", function(error, results){
    res.render('Products', {foodArray: results,Text:"Bird Foods", session:req.session}); 
  })
})

router.get("/bird-toys", async function(req,res) {
  await database.query("select * from bird_toys", function(error, results){
    res.render('Products', {foodArray: results,Text:"Bird Toys", session:req.session}); 
  })
})

router.get("/bird-treats", async function(req,res) {
  await database.query("select * from bird_treat", function(error, results){
    res.render('Products', {foodArray: results,Text:"Bird Treats", session:req.session}); 
  })
})

router.get("/bird-cages", async function(req,res) {
  await database.query("select * from bird_cage", function(error, results){
    res.render('Products', {foodArray: results,Text:"Bird Cages", session:req.session}); 
  })
})

router.post("/login", function(req,res){
  console.log("req" + req.body.username);
  var username = req.body.username;
  var password = req.body.password;
  console.log(username);
  console.log(password);
  
  database.query("select * from user where user_email = ? and user_password = ?",[username,password],function(error,results,fields){
      if (results.length > 0) {
        for(var count = 0; count < results.length; count++)
        {
        console.log(results);
        console.log("login successful");
        req.session.user_id = results[count].user_id;
        req.session.user_email = results[count].user_email;
          res.redirect("/");
        }
      } else {
        console.log(error);
        res.render('login');
      }
      res.end();
  })
})

router.post("/signup", function(req,res){
  console.log("req" + req.body.username);
  var username = req.body.username1;
  var password = req.body.password1;
  var confirmPassword = req.body.confirmpassword; 
  console.log(username);
  console.log(password);
  console.log(confirmPassword);
  
  database.query(
    "select user_email from user where user_email=?",
    [username],
    async (error, result) => {
      if (error) {
        console.log(error);
      }

      if (result.length > 0) {
        return res.render("login", {
          msg: "Email id already Taken",
          msg_type: "error",
        });
      } else if (password !== confirmPassword) {
        return res.render("login", {
          msg: "Password do not match",
          msg_type: "error",
        });
      }

      database.query(
        "insert into user set ?",
        { user_email: username,user_password: password,user_session_id:'' },
        (error, result) => {
          if (error) {
            res.render("login");
          } else {
            res.render("login");
          }
        }
  )
      });
});


router.get('/logout', function(request, response, next){

  request.session.destroy();

  response.redirect("/");

});

module.exports = router;