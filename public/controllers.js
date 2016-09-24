/**
 * @fileOverview Defines main controller and imports other controllers
 */

define([
	'angular',

	// Importing other controllers
	'home/HomeCtrl',
	'chatter/ChatterCtrl'
], function (ng, HomeCtrl, ChatterCtrl) {
	'use strict';

	var MainCtrl = [
		'$scope',
		'$mdSidenav',
		function ($scope, $mdSidenav) {
			$scope.siteBannerTitle = 'Home';

			$scope.toggleLeftMenu = function() {
				$mdSidenav('left').toggle();
			};

			$scope.sideBar = {
				menu : [
					{
						link  : '',
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
						link  : '/project/chatter',
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
						link  : 'http://frank-yu.com/old/',
						title : 'Old Website',
						icon  : 'web'
					}
				]
			};

			$scope.changeSiteTitle = function (newTitle) {
				$scope.siteBannerTitle = newTitle;
				$scope.toggleLeftMenu();
			};
		}
	]

	return ng.module('allControllers', [])
		.controller('HomeCtrl', HomeCtrl)
		.controller('ChatterCtrl', ChatterCtrl)
		.controller('MainCtrl', MainCtrl);
});