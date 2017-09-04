/**
 * @fileOverview Defines main controller and imports other controllers
 */

define([
	'angular',

	// Importing other controllers
	'home/home-ctrl',
	'home/project-ctrl',
	'chatter/chatter-ctrl',

	// Controller resources
	'services/index',
	'./directives'
], function (ng, HomeCtrl, ProjectCtrl, ChatterCtrl) {
	'use strict';

	var MainCtrl = [
		'$mdMedia',
		'$mdSidenav',
		'$rootScope',
		'$route',
		'$scope',
		'$timeout',
		function ($mdMedia, $mdSidenav, $rootScope, $route, $scope, $timeout) {
			$rootScope.siteBannerTitle = 'Home';

			$rootScope.lockLeftMenu = function (value) {
				$scope.leftMenuLockedOpen = value; 
				var sidenav = document.getElementById("sidebar");
				if (value) {
					if (!sidenav.classList.contains("md-locked-open")) {
						sidenav.classList.add("md-locked-open");
					}
				} else {
					sidenav.classList.remove("md-locked-open");
					$mdSidenav('left').close();
				}
			}

			$scope.$watch(function() { return $mdMedia('gt-sm') }, function(value) {
				$rootScope.lockLeftMenu(value);
			});

			$scope.toggleLeftMenu = function() {
				if (!$scope.leftMenuLockedOpen) {
					$mdSidenav('left').toggle();
				}
			};

			$rootScope.$on("$routeChangeSuccess", function(currentRoute, previousRoute){
				$rootScope.pageTitle = $route.current.title;
				delete $rootScope.projectSourceCode;
			});

			$scope.sideBar = {
				menu : [
					{
						link  : '/',
						title : 'Home',
						icon  : 'home'
					}
				],

				projects : [
					{
						link  : '/chatter',
						title : 'Chatter',
						icon  : 'chat_bubble'
					}
				],

				additional: [
					{
						link  : 'https://github.com/QFrankY',
						title : 'Github',
						icon  : 'code'
					},
					{
						link  : '/old/',
						title : 'Old Website',
						icon  : 'web'
					}
				]
			};
		}
	]

	return ng.module('allControllers', ['directives', 'services'])
		.controller('HomeCtrl', HomeCtrl)
		.controller('ProjectCtrl', ProjectCtrl)
		.controller('ChatterCtrl', ChatterCtrl)
		.controller('MainCtrl', MainCtrl);
});