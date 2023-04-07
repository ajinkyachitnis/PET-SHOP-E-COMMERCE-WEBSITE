var express = require('express');
var router = express.Router();
const mysql_connector = require('mysql');


var connection = {}
async function databaseconnect() {
  connection = await mysql_connector.createConnection({
    host : '10.0.8.207',
    user : 'root',
    password  :'abcd',
    database : 'petshop'
  });
  
  connection.connect(function(err) {
    if (err) {
      return console.error('Error: ' + err.message);
    }
  
    console.log('Connected To The MySQL Server .');
  });
  

}

databaseconnect();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('Landing_Page');
});

// GET Login And SignUP page
router.get('/index', function(req, res, next) {
  res.render('index');
});

// CATS PRODUCTS 
router.get("/cat-foods", async function(req,res) {
  await connection.query("select * from cat_food", function(error, results){
    res.render('Products', {foodArray: results,Text:"Cat Foods"}); 
  })
})

router.get("/cat-toys", async function(req,res) {
  await connection.query("select * from cat_toys", function(error, results){
    res.render('Products', {foodArray: results,Text:"Cat Toys"}); 
  })
})

router.get("/cat-treats", async function(req,res) {
  await connection.query("select * from cat_treats_biscuits", function(error, results){
    res.render('Products', {foodArray: results,Text:"Cat Treats"}); 
  })
})

router.get("/cat-leashes", async function(req,res) {
  await connection.query("select * from cat_leash", function(error, results){
    res.render('Products', {foodArray: results,Text:"Cat Leashes"}); 
  })
})

// DOG PRODUCTS 
router.get("/dog-foods", async function(req,res) {
  await connection.query("select * from dog_food", function(error, results){
    res.render('Products', {foodArray: results,Text:"Dog Foods"}); 
  })
})

router.get("/dog-toys", async function(req,res) {
  await connection.query("select * from dog_toys", function(error, results){
    res.render('Products', {foodArray: results,Text:"Dog Toys"}); 
  })
})

router.get("/dog-treats", async function(req,res) {
  await connection.query("select * from dog_treat_biscuits_chewys", function(error, results){
    res.render('Products', {foodArray: results,Text:"Dog Treats"}); 
  })
})

router.get("/dog-leashes", async function(req,res) {
  await connection.query("select * from dog_leash", function(error, results){
    res.render('Products', {foodArray: results,Text:"Dog Leashes"}); 
  })
})

//BIRD PRODUCTS
router.get("/bird-foods", async function(req,res) {
  await connection.query("select * from bird_food", function(error, results){
    res.render('Products', {foodArray: results,Text:"Bird Foods"}); 
  })
})

router.get("/bird-toys", async function(req,res) {
  await connection.query("select * from bird_toys", function(error, results){
    res.render('Products', {foodArray: results,Text:"Bird Toys"}); 
  })
})

router.get("/bird-treats", async function(req,res) {
  await connection.query("select * from bird_treat", function(error, results){
    res.render('Products', {foodArray: results,Text:"Bird Treats"}); 
  })
})

router.get("/bird-cages", async function(req,res) {
  await connection.query("select * from bird_cage", function(error, results){
    res.render('Products', {foodArray: results,Text:"Bird Cages"}); 
  })
})

module.exports = router;


