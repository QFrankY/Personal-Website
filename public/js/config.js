/**
 * @fileOverview RequireJS configuration.
 */

'use strict';

require.config({
	/** Base Url for JS files */
	baseUrl: '/js',

	/** Dependency Shortcuts */
	paths: {
		/** Angular */
		'angular': [
			'//ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular.min',
			'lib/angular/angular.min'
		],

		'angular-resource': [
			'//ajax.googleapis.com/ajax/libs/angularjs/1.5.7/angular-resource.min',
			'lib/angular-resource/angular-resource.min'
		],
		
		'angular-route': [
			'//ajax.googleapis.com/ajax/libs/angularjs/1.5.7/angular-route.min',
			'lib/angular-route/angular-route.min'
		],

		/** Angular Material */
		'angular-aria': [
			'//ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular-aria.min',
			'lib/angular-aria/angular-aria.min'
		],

		'angular-animate': [
			'//ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular-animate.min',
			'lib/angular-animate/angular-animate.min'
		],

		'angular-messages': [
			'//ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular-messages.min',
			'lib/angular-messages/angular-messages.min'
		],

		'angular-material': [
			'//ajax.googleapis.com/ajax/libs/angular_material/1.1.1/angular-material.min',
			'lib/angular-material/angular-material.min'
		],

		/** Sockets */
		'socket': [
			'//cdn.socket.io/socket.io-1.4.5',
			'lib/socket.io-client/socket.io'
		],

		'angular-socket': 'lib/socket.min'
	},

	shim: {
		/** Angular */
		'angular': {
			exports: 'angular'
		},

		'angular-route': {
			deps: ['angular']
		},

		'angular-resource': {
			deps: ['angular']
		},

		'angular-aria': {
			deps: ['angular']
		},

		'angular-messages': {
			deps: ['angular']
		},

		'angular-animate': {
			deps: ['angular']
		},

		'angular-material': {
			deps: ['angular-messages', 'angular-aria', 'angular-animate']
		},

		'angular-socket': {
			deps: ['angular', 'socket']
		}
	}
});

require(['app'], function () {
	angular.element(document).ready(
		function () {
			angular.bootstrap(document, ['app']);
		});
});