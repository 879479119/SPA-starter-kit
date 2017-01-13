/**
 * Created by zi on 2017/1/13.
 */
var fs =require('fs');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.render('index', { title: 'GameCenter', sourcePort: 8888, page: "game"});
});

module.exports = router;