/**
 * Home sort services
 */

define(function () {
	'use strict';

	return [
		'$http',
		'$q',
		'errorSvc',
		function ($http, $q, errorSvc) {

			const getProjects = function () {
				var deferred = $q.defer();

				$http.get('/api/home/projects').then(function (res) {
					deferred.resolve(res.data.projects);
				}, errorSvc.promptHandler(deferred));

				return deferred.promise;
			};

			const getProjectUpdates = function (projectID) {
				var deferred = $q.defer();

				$http.get('/api/home/updates/' + projectID).then(function (res) {
					deferred.resolve(res.data);
				}, errorSvc.promptHandler(deferred));

				return deferred.promise;
			};

			const parseProjectTags = function (projects) {
				var allTags = [];
				var tempHashTable = {};

				for (var i = 0; i < projects.length; i++) {
					var tags = projects[i].tags.split(', ');

					for (var j = 0; j < tags.length; j++) {
						if (tempHashTable[tags[j]]) {
							tempHashTable[tags[j]]++;
						} else {
							tempHashTable[tags[j]] = 1;
						}
					}
				}

				for (var key in tempHashTable) {
					if (!tempHashTable.hasOwnProperty(key)) continue;

					var tag = {
						name  : key,
						count : tempHashTable[key]
					}

					allTags.push(tag);
				}

				allTags.sort(function (a, b) {
					if (a.name.toUpperCase() > b.name.toUpperCase()) {
						return 1;
					} else if (a.name.toUpperCase() < b.name.toUpperCase()) {
						return -1;
					}

					return 0;
				});

				return allTags;
			};

			return {
				getProjects       : getProjects,
				getProjectUpdates : getProjectUpdates,
				parseProjectTags  : parseProjectTags
			};
		}
	];
});