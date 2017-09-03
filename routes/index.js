const path    = require('path');
const router  = require('express').Router();

const dev        = require('./utils').Dev('router');
const homeApi    = require('./home');
const chatterApi = require('./chatter');

/* Sitewide routes */
router.get('/', function(req, res, next) {
	res.render('index');
});

router.get('/template/:name', function(req, res, next) {
	var template = path.join(req.params.name,'template.jade');
	res.render(template);
});

router.get('/directive/:folder/:name', function(req, res, next) {
	var directive = path.join(req.params.folder, 'directives', req.params.name + '.jade');
	res.render(directive);
});

/* Import Api */
router.use('/api/home', homeApi);
router.use('/api/chatter/', chatterApi);

/** Catch all routes to fix refresh issue */
router.all('*', function(req, res, next) {
	res.render('index');
});

module.exports = router;