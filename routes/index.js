var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'github源码', projects: ["indexzero/http-server"] });
});

module.exports = router;
