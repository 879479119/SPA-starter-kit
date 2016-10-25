var fs =require('fs');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', sourcePort: 8888, page: "video"});
});

/**
 * API - getFunImages
 * @param size {number}
 * @param page {number} from 0 to max
 * @param rand {bool}
 */

router.get('/getFunImages', function (req, res, next) {
  var data = JSON.parse(fs.readFileSync('./static/fun_images.json','utf8')).fix;

  var size = req.query.size || 28,
      page = req.query.page || 0,
      rand = req.query.rand || false;
  var result = [];

  if(rand){
    var len = data.length, i = size;
    while(i --)
      result.push(data[Math.floor(Math.random() * len)]);
  }else{
    result = data.splice(page * size, size);
  }

  res.send(result);
  res.end();
})

module.exports = router;
