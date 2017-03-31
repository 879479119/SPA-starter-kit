/**
 * Created by zi on 2017/1/13.
 */
var fs =require('fs');
var express = require('express');
var router = express.Router();
var sourcePort = require('../config').dev.sourcePort;

router.get('/', function(req, res) {
	res.render('index', { title: '(<ゝω·)Kira☆~', sourcePort: sourcePort, page: "game"});
});

module.exports = router;