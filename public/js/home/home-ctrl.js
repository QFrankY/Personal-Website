/**
 * @fileOverview Main controller for Chatter project
 */
define([
	'angular'
], function (ng) {
	'use strict';

	return [
		'$http',
		'$rootScope',
		'$sce',
		'$scope',
		'homeSvc',
		function ($http, $rootScope, $sce, $scope, homeSvc) {
			$rootScope.siteBannerTitle = 'Home';
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
				$scope.project = project;

				homeSvc.getProjectUpdates(project.id).then(function (updates) {
					for (var i = 0; i < updates.length; i++) {
						updates[i].content =  $sce.trustAsHtml(updates[i].content);

						if (updates[i].type === 'video') {
							updates[i].link = $sce.trustAsHtml(updates[i].link);
						}
					}

					$scope.updates = updates;
				});
			};

			// var dialog = $mdDialog.show(
			// 	$mdDialog.alert()
			// 		.clickOutsideToClose(true)
			// 		.title('Home page under construction.')
			// 		.textContent('Redirecting to latest completed project...')
			// 		.ariaLabel('Redirect prompt')
			// 		.ok('Got it!')
			// ).finally(function () {
			// 	$location.path('/projects/chatter');
			// });

			// $timeout(function () {
			// 	$mdDialog.hide();
			// 	$location.path('/projects/chatter');
			// }, 3000)
		}
	];
});