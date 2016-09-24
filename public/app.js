/**
 * @fileOverview Main application
 */
require([
	'angular',
	'angular-material',
	'angular-route',
	'angular-resource',

	'./controllers'
], function (ng) {
	'use strict';

	var app = ng.module('MainApp', [
		'ngMaterial',
		'ngRoute',
		'ngResource',
		'allControllers'
	]);

	/** Angular Material Set up*/
	app.config(['$mdThemingProvider', '$locationProvider', '$routeProvider',
		function ($mdThemingProvider, $locationProvider, $routeProvider) {
			/** Setting html5 */
			$locationProvider.html5Mode({
				enabled: true,
				requireBase: false
			});

			var customGrey = $mdThemingProvider.extendPalette('grey', {
				'50': '#ffffff',
				'100': '#eeeeee'
			});

			var customBlue = $mdThemingProvider.extendPalette('light-blue', {
				'50': '#ffffff',
			});

			$mdThemingProvider.definePalette('customGrey', customGrey);

			$mdThemingProvider.definePalette('customBlue', customBlue);

			$mdThemingProvider.theme('default')
				.primaryPalette('customBlue', {
					'default' : '600',
					'hue-3'   : '800',
					'hue-2'   : '100',
					'hue-1'		: '50'
				})
				.accentPalette('pink')
				.warnPalette('red')
				.backgroundPalette('customGrey', {
					'default' : '50',
					'hue-1'   : '100'
				})

			$routeProvider.when('/home', {
				templateUrl : '/template/home',
				controller  : 'HomeCtrl'
			}).when('/project/chatter', {
				templateUrl : '/template/chatter',
				controller  : 'ChatterCtrl'
			}).otherwise({
				redirectTo: '/home'
			});
		}
	]);

	ng.bootstrap(document, ['MainApp'], {
		strictDi: true
	});
});