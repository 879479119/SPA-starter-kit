var express = require('express');
var router = express.Router();
var sourcePort = require('../config').dev.sourcePort;
if(process.env.npm_lifecycle_event === "start") sourcePort = 8888;
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'RockSAMA - (<ゝω·)Kira☆~',page: "video",sourcePort: sourcePort });
});

module.exports = router;
