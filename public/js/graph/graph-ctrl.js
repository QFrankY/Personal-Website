/**
 * @fileOverview Main controller for Graph Sort project
 */
define([
	'angular'
], function (ng) {
	'use strict';

	return [
		'$rootScope',
		'errorSvc',
		function ($rootScope, errorSvc) {
			$rootScope.siteBannerTitle   = 'Projects / Graph Sort ( Under Construction )';
			$rootScope.projectSourceCode = 'https://github.com/QFrankY/graph-sort';
		}
	];
});