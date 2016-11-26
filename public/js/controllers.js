/**
 * @fileOverview Defines main controller and imports other controllers
 */

define([
	'angular',

	// Importing other controllers
	'home/home-ctrl',
	'chatter/chatter-ctrl',
	'graph/graph-ctrl',	

	// Controller resources
	'services/index',
	'directives/index'
], function (ng, HomeCtrl, ChatterCtrl, GraphCtrl) {
	'use strict';

	var MainCtrl = [
		'$mdSidenav',
		'$rootScope',
		'$route',
		'$scope',
		function ($mdSidenav, $rootScope, $route, $scope) {
			$rootScope.siteBannerTitle = 'Home';

			$scope.toggleLeftMenu = function() {
				$mdSidenav('left').toggle();
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
					},
					{
						link  : '/home/portfolio',
						title : 'Portfolio',
						icon  : 'dashboard',
						hide  : true
					}
				],

				projects : [
					{
						link  : '/projects/chatter',
						title : 'Chatter',
						icon  : 'chat_bubble'
					},
					{
						link  : '/projects/graphsort',
						title : 'Graph Sort',
						icon  : 'timeline'
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
		.controller('ChatterCtrl', ChatterCtrl)
		.controller('GraphCtrl', GraphCtrl)
		.controller('MainCtrl', MainCtrl);
});