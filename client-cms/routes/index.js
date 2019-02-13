var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('dashboard');
});

router.get('/line', function(req, res, next) {
  res.render('line');
});

router.get('/pie', function(req, res, next) {
  res.render('pie');
});

router.get('/bar', function(req, res, next) {  
  res.render('bar');
});

router.get('/displaymap', function(req, res, next) {
  res.render('displaymap');
  
});

router.get('/login', function(req, res, next) {
  res.render('register_login',{registerPage:false});
});

router.get('/register', function(req, res, next) {
  res.render('register_login',{registerPage:true});
});

router.get('/home', function(req, res, next) {
  res.render('home');
});
router.get('/logout', function(req, res, next) {
  localStorage.clear()
  res.redirect('/login')
});

router.get('/data', function(req, res, next) {
  res.render('data');
});

router.get('/dataDate', function(req, res, next) {
  res.render('datadate');
});

router.get('/maps', function(req, res, next) {
  res.render('maps');
});

router.get('/logout', function(req, res, next) {
  res.render('index');
});

module.exports = router;
