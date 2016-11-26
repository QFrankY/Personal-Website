/**
 * @fileOverview Main controller for Chatter project
 */
define([
	'angular'
], function (ng) {
	'use strict';

	return [
		'$location',
		'$mdDialog',
		'$rootScope',
		'$timeout',
		function ($location, $mdDialog, $rootScope, $timeout) {
			$rootScope.siteBannerTitle = 'Home ( Under Construction )';

			var dialog = $mdDialog.show(
				$mdDialog.alert()
					.clickOutsideToClose(true)
					.title('Home page under construction.')
					.textContent('Redirecting to latest completed project...')
					.ariaLabel('Redirect prompt')
					.ok('Got it!')
			).finally(function () {
				$location.path('/projects/chatter');
			});

			$timeout(function () {
				$mdDialog.hide();
				$location.path('/projects/chatter');
			}, 3000)
		}
	];
});