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
		'$scope',
		'$mdSidenav',
		'$rootScope',
		function ($scope, $mdSidenav, $rootScope) {
			$rootScope.siteBannerTitle = 'Home';

			$scope.toggleLeftMenu = function() {
				$mdSidenav('left').toggle();
			};

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
						icon  : 'sort'
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