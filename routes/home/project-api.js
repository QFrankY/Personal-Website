const router = require('express').Router();

const dev   = require('../utils').Dev('home:projects');

const Project       = require('./mysql/project');
const ProjectUpdate = require('./mysql/project-update');

router.get('/projects', function (req, res) {
	Project.findAll({
		attributes: ['id', 'name', 'description', 'links', 'tags']
	}).then(function (projects) {
		dev.log('Successfully fetched projects');
		res.status(200).send({ projects: projects });
	}, function (err) {
		dev.err(err);
		res.status(500).end();
	});
});

router.get('/updates/:projectID', function (req, res) {
	var projectID = parseInt(req.params.projectID);

	ProjectUpdate.findAll({
		attributes: ['title', 'content', 'link', 'type', 'created_at'],
		where: {
			project_id: projectID
		}
	}).then(function (updates) {
		dev.log('Successfully fetched project updates');
		res.status(200).send({ updates: updates });
	}, function(err) {
		dev.err(err);
		res.status(500).end();
	});
});

module.exports = router;