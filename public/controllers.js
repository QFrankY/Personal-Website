/**
 * @fileOverview Defines main controller and imports other controllers
 */

define([
	'angular',

	// Importing other controllers
	'home/home-ctrl',
	'chatter/chatter-ctrl',

	// Controller resources
	'services/index'
], function (ng, HomeCtrl, ChatterCtrl) {
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
						icon  : 'messages'
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

	return ng.module('allControllers', ['allServices'])
		.controller('HomeCtrl', HomeCtrl)
		.controller('ChatterCtrl', ChatterCtrl)
		.controller('MainCtrl', MainCtrl);
});