/**
 * @fileOverview Main controller for Graph Sort project
 */
define([
	'd3'
], function (d3) {
	'use strict';

	return [
		'$http',
		'$rootScope',
		'errorSvc',
		function ($http, $rootScope, errorSvc) {
			$rootScope.siteBannerTitle   = 'Projects / Graph Sort ( Under Construction )';
			$rootScope.projectSourceCode = 'https://github.com/QFrankY/graph-sort';

			// d3.select("md-content")
			// 	.selectAll("p")
			// 	.data([4, 8, 15, 16, 23, 42])
			// 	.enter().append("p")
			// 	.text(function(d) { return "I’m number " + d + "!"; });
		}
	];
});