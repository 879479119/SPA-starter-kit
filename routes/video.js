var fs =require('fs');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', sourcePort: 8888, page: "video"});
});

router.get('/getFunImages', function (req, res, next) {
  var data = fs.readFileSync('./static/fun_images.json','utf8');
  res.send(data);
  res.end();
})

module.exports = router;
