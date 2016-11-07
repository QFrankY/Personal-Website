define([
	'angular',
	'chatter/directives/sidebar',
	'chatter/directives/messenger',

	'services/index'
], function(ng, chatterSidebar, chatterMessenger) {
	'use strict';

	return ng.module('directives', ['services'])
		.directive('chatterSidebar', chatterSidebar)
		.directive('chatterMessenger', chatterMessenger)
		.run(['$log', function ($log) {
			$log.debug('directives loaded');
		}]);
});