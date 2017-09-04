const router = require('express').Router();
const async = require('async');

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

	async.parallel([
		// Fetching project
		function (callback) {
			Project.findAll({
				attributes: ['id', 'name'],
				where: {
					id: projectID
				}
			}).then(function (project) {
				dev.log('Successfully fetched project');
				callback(null, project[0])
			}, function (err) {
				callback(err);
			});
		},
		
		// Fetching project updates
		function (callback) {
			ProjectUpdate.findAll({
				attributes: ['title', 'content', 'link', 'type', 'created_at'],
				where: {
					project_id: projectID
				}
			}).then(function (updates) {
				dev.log('Successfully fetched project updates');
				callback(null, updates);
			}, function(err) {
				callback(err);
			});
		}
	], function (err, results) {
		if (err) {
			dev.err(err);
			res.status(500).end();
		}
		res.status(200).send({ project: results[0], updates: results[1]});
	});
});

module.exports = router;