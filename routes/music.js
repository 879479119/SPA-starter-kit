var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', sourcePort: 8888, page: "video"});
});

module.exports = router;
