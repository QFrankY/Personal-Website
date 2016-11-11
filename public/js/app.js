/**
 * @fileOverview Main application
 */
define([
	'angular',
	'./themes',
	'./options',

	'angular-route',
	'angular-resource',

	'./controllers'
], function (ng, themes, options) {
	'use strict';

	var app = ng.module('app', [
		'ngMaterial',
		'ngMessages',
		'ngRoute',
		'ngResource',
		'allControllers'
	]);

	/** Angular Material Set up*/
	app.config(['$locationProvider', '$logProvider', '$routeProvider',
			function ($locationProvider, $logProvider, $routeProvider) {
				/** Setting html5 */
				$locationProvider.html5Mode({
					enabled     : true,
					requireBase : false
				});

				$routeProvider.when('/home', {
					templateUrl : '/template/home',
					controller  : 'HomeCtrl'
				}).when('/projects/chatter', {
					templateUrl : '/template/chatter',
					controller  : 'ChatterCtrl'
				}).otherwise({
					redirectTo: '/home'
				});

				$logProvider.debugEnabled(options.debugEnabled);
			}])
		.config(themes); // Importing themes

	return app;
});