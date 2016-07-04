/**
 * @fileOverview RequireJS configuration.
 */

require.config({
	/** Dependency Shortcuts */
	paths: {
		/** Angular */
		'angular'          : '/resources/lib/angular/angular.min',
		'angular-resource' : '/resources/lib/angular-resource/angular-resource.min',
		'angular-route'    : '/resources/lib/angular-route/angular-route.min',

		/** Angular Material */
		'angular-aria'     : '/resources/lib/angular-aria/angular-aria.min',
		'angular-animate'  : '/resources/lib/angular-animate/angular-animate.min',
		'angular-messages' : '/resources/lib/angular-messages/angular-messages.min',
		'angular-material' : '/resources/lib/angular-material/angular-material.min'
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
			deps: ['angular-messages', 'angular-aria', 'angular-animate']
		}
	}
});