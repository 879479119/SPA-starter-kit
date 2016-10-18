var express = require('express');
var router = express.Router();
var sourcePort = require('../config').dev.sourcePort;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express',page: "index",sourcePort: sourcePort });
});

module.exports = router;
