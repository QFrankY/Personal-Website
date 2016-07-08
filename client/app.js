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

			$mdThemingProvider.definePalette('customGrey', customGrey);

			$mdThemingProvider.theme('default')
				.primaryPalette('light-blue', {
					'default' : '600',
					'hue-2'   : '800',
					'hue-1'   : '100'
				})
				.accentPalette('pink')
				.warnPalette('red')
				.backgroundPalette('customGrey', {
					'default' : '50',
					'hue-1'   : '100'
				})

			$routeProvider.when('/home', {
				templateUrl : 'home/template.html',
				controller  : 'HomeCtrl'
			}).when('/chatter', {
				templateUrl : 'chatter/template.html',
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