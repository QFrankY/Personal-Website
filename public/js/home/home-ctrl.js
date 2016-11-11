/**
 * @fileOverview Main controller for Chatter project
 */
define([
	'angular'
], function (ng) {
	'use strict';

	return [
		'$rootScope',
		function ($rootScope) {
			$rootScope.siteBannerTitle = 'Home';
		}
	];
});