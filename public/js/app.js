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
	app.config(['$httpProvider', '$locationProvider', '$logProvider', '$routeProvider',
			function ($httpProvider, $locationProvider, $logProvider, $routeProvider) {
				/** Setting html5 */
				$locationProvider.html5Mode({
					enabled     : true,
					requireBase : false
				});

				$routeProvider.when('/', {
					title       : 'Personal Website',
					templateUrl : '/template/home',
					controller  : 'HomeCtrl'
				}).when('/project/:projectId', {
					title       : 'Project Description',
					templateUrl : '/template/home/project',
					controller  : 'ProjectCtrl'
				}).when('/chatter', {
					title       : 'Chatter',
					templateUrl : '/template/chatter',
					controller  : 'ChatterCtrl'
				}).otherwise({
					redirectTo: '/'
				});

				$logProvider.debugEnabled(options.debugEnabled);

				$httpProvider.interceptors.push('httpIntercept');
			}])
		.config(themes); // Importing themes

	return app;
});