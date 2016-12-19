/**
 * @fileOverview Controller for Wiki Search project
 */
define([
	'angular'
], function (ng) {
	'use strict';

	return [
		'$http',
		'$rootScope',
		'$scope',
		'errorSvc',
		function ($http, $rootScope, $scope, errorSvc) {
			$rootScope.siteBannerTitle   = 'Projects / Graph Sort ( Under Construction )';
			$rootScope.projectSourceCode = 'https://github.com/QFrankY/graph-sort';

			/** SCOPE VARIABLES */
			$scope.welcomeMsgOpen = true;
			$scope.closeWelcomeMsg = function () {
				$scope.welcomeMsgOpen = false;
			};
		}
	];
});