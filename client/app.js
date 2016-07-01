/**
 * @fileOverview Main application
 */
require([
	'angular',
	'angular-material',
	'angular-route',
	'angular-resource'
], function (ng) {
	'use strict';

	var app = ng.module('MainApp', ['ngMaterial','ngRoute','ngResource']);

	/** Angular Material Set up*/
	app.config(
		['$mdThemingProvider', '$locationProvider', '$routeProvider',
		function ($mdThemingProvider, $locationProvider, $routeProvider) {
		/** Setting html5 */
		$locationProvider.html5Mode(true);

		/** Theme Configuration */
		var customBlue = $mdThemingProvider.extendPalette('blue', {
			'100' : '#ffffff' // Adding white to the palette
		});

		$mdThemingProvider.definePalette('customBlue', customBlue);

		$mdThemingProvider.theme('default')
			.primaryPalette('customBlue', {
				'default' : '600',
				'hue-2'   : '700',
				'hue-1'   : '100'
			})
			.accentPalette('pink')
			.warnPalette('red')
			.backgroundPalette('grey')
	}]);

	/** Main Controller */
	app.controller('MainCtrl', ['$scope', '$mdSidenav', function ($scope, $mdSidenav) {
		$scope.openLeftMenu = function() {
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
					link  : '',
					title : 'Portfolio',
					icon  : 'dashboard'
				}
			],

			projects : [
				{
					link  : '',
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
					link  : '',
					title : 'Old Website',
					icon  : 'web'
				}
			]
		};
	}]);

	ng.bootstrap(document, ['MainApp'], {
		strictDi: true
	});
});