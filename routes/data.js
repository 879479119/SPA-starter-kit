var express = require('express');
var router = express.Router();
var sourcePort = require('../config').dev.sourcePort;
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', sourcePort: sourcePort, page: "data"});
});

module.exports = router;
