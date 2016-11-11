define([
	'angular',
	'chatter/directives/sidebar',
	'chatter/directives/messenger',
	'chatter/directives/window',

	'services/index'
], function(ng, chatterSidebar, chatterMessenger, chatterWindow) {
	'use strict';

	return ng.module('directives', ['services'])
		.directive('chatterSidebar', chatterSidebar)
		.directive('chatterMessenger', chatterMessenger)
		.directive('chatterWindow', chatterWindow)
		.run(['$log', function ($log) {
			$log.debug('directives loaded');
		}]);
});