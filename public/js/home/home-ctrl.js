/**
 * @fileOverview Main controller for Chatter project
 */
define([
	'angular'
], function (ng) {
	'use strict';

	return [
		'$http',
		'$location',
		'$rootScope',
		'$sce',
		'$scope',
		'homeSvc',
		function ($http, $location, $rootScope, $sce, $scope, homeSvc) {
			$rootScope.siteBannerTitle = 'Home';
			$rootScope.lockLeftMenu(true);

			$scope.sorted = false;
			var projects;

			$scope.welcomeMsgOpen = true;
			$scope.closeWelcomeMsg = function () {
				$scope.welcomeMsgOpen = false;
			};

			homeSvc.getProjects().then(function(_projects) {
				projects = _projects;
				$scope.projects = _projects;
				$scope.tags = homeSvc.parseProjectTags(_projects);
			});

			$scope.sortProjects = function (name) {
				$scope.projects = [];
				var re = new RegExp("(^|, )" + name + "(,|$)");

				for (var i = 0; i < projects.length; i++) {
					if (re.test(projects[i].tags)) {
						$scope.projects.push(projects[i]);
					}
				}

				$scope.sorted = true;
			};

			$scope.showAllProjects = function () {
				$scope.projects = projects;
				$scope.sorted   = false;
				$scope.project  = null;
				$scope.updates  = null;
			};

			$scope.showProjectUpdates = function (project) {
				$location.url("/project/" + project.id);
			};
		}
	];
});