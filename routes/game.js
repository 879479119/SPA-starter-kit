/**
 * Created by zi on 2017/1/13.
 */
let fs =require('fs');
let express = require('express');
let router = express.Router();

router.get('/', function(req, res) {
	res.render('index', { title: 'GameCenter', sourcePort: 8888, page: "game"});
});

module.exports = router;