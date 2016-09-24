var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index');
});

router.get('/template/:name', function(req, res, next) {
	var template = path.join(req.params.name,'template.jade');
	res.render(template);
});

router.all('/project/*', function(req, res, next) {
	res.render('index');
});

router.all('/home/*', function(req, res, next) {
	res.render('index');
});

module.exports = router;
