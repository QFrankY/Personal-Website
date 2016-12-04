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
					title       : 'Personal Website',
					templateUrl : '/template/home',
					controller  : 'HomeCtrl'
				}).when('/projects/chatter', {
					title       : 'Chatter',
					templateUrl : '/template/chatter',
					controller  : 'ChatterCtrl'
				}).when('/projects/graph-sort', {
					title       : 'Graph Sort',
					templateUrl : '/template/graph',
					controller  : 'GraphCtrl'
				}).otherwise({
					redirectTo: '/home'
				});

				$logProvider.debugEnabled(options.debugEnabled);
			}])
		.config(themes); // Importing themes

	return app;
});