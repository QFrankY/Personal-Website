/**
 * @fileOverview RequireJS configuration.
 */

require.config({

	/** Dependency Shortcuts */
	paths: {
		/** Angular */
		'angular'          : '/lib/angular/angular.min',
		'angular-resource' : '/lib/angular-resource/angular-resource.min',
		'angular-route'    : '/lib/angular-route/angular-route.min',

		/** Angular Material */
		'angular-aria'     : '/lib/angular-aria/angular-aria.min',
		'angular-animate'  : '/lib/angular-animate/angular-animate.min',
		'angular-messages' : '/lib/angular-messages/angular-messages.min',
		'angular-material' : '/lib/angular-material/angular-material.min'
	},

	shim: {
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
			deps: ['angular','angular-messages', 'angular-aria', 'angular-animate']
		}
	}
});