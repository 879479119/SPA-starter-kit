let express = require('express');
let router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', sourcePort: 8888, page: "music"});
});

module.exports = router;
