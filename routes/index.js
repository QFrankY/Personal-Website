const path    = require('path');
const router  = require('express').Router();

const dev        = require('./utils').Dev('router');
const homeApi    = require('./home');
const chatterApi = require('./chatter');
const s3         = require('../config/s3');

/* Sitewide routes */
router.get('/', function(req, res, next) {
	res.render('index');
});

router.get('/template/:feature/:name?', function(req, res, next) {
	var name = req.params.name ? req.params.name + ".jade" : "template.jade"; 
	
	var template = path.join(req.params.feature, name);
	res.render(template);
});

router.get('/directive/:folder/:name', function(req, res, next) {
	var directive = path.join(req.params.folder, 'directives', req.params.name + '.jade');
	res.render(directive);
});

router.get('/resume', function (req, res, next) {
	s3.getObject({
		Bucket: process.env.AWS_S3_BUCKET_NAME,
		Key: "private/resume.pdf"
	}, function (err, data) {
		if (err) {
			dev.err(err);
			res.status(500).end();
		}

		res.setHeader('Content-Type', data.ContentType);
		res.status(200).send(data.Body);
	});
});

/* Import Api */
router.use('/api/home', homeApi);
router.use('/api/chatter/', chatterApi);

/** Catch all routes to fix refresh issue */
router.all('*', function(req, res, next) {
	res.render('index');
});

module.exports = router;