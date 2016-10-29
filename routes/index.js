const path    = require('path');
const router  = require('express').Router();

const dev        = require('./utils').Dev('router');
const chatterApi = require('./chatter');

/* Sitewide routes */
router.get('/', function(req, res, next) {
	res.render('index');
});

router.get('/template/:name', function(req, res, next) {
	var template = path.join(req.params.name,'template.jade');
	res.render(template);
});

router.all('/projects/*', function(req, res, next) {
	res.render('index');
});


/* Import Api */
router.use('/api/chatter/', chatterApi);


/** Catch all to fix refresh issue */
router.all('/home/*', function(req, res, next) {
	res.render('index');
});

module.exports = router;