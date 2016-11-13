/**
 * @fileOverview Main controller for Chatter project
 */
define([
	'angular'
], function (ng) {
	'use strict';

	return [
		'$rootScope',
		'$mdDialog',
		'$timeout',
		function ($rootScope, $mdDialog, $timeout) {
			$rootScope.siteBannerTitle = 'Home ( Under Construction )';

			$mdDialog.show(
				$mdDialog.alert()
					.clickOutsideToClose(true)
					.title('Home page under construction.')
					.textContent('Redirecting to latest completed project...')
					.ariaLabel('Redirect prompt')
					.ok('Got it!')
			).finally(function () {
				location.href='/projects/chatter';
			});

			$timeout(function () {
				location.href='/projects/chatter';
			}, 3000)
		}
	];
});