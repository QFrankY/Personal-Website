define([
	'angular',
	'angular-material'

], function (ng) {
	'use strict';

	return [
		'$mdThemingProvider',
		function ($mdThemingProvider) {
			// Default theme
			var customGrey = $mdThemingProvider.extendPalette('blue-grey', {
				'50'  : '#ffffff'
			});

			var customBlue = $mdThemingProvider.extendPalette('light-blue', {
				'50': '#ffffff',
			});

			$mdThemingProvider.definePalette('customGrey', customGrey);

			$mdThemingProvider.definePalette('customBlue', customBlue);

			$mdThemingProvider.theme('default')
				.primaryPalette('customBlue', {
					'hue-3'   : '800',
					'hue-2'   : '100',
					'hue-1'		: '50'
				})
				.accentPalette('pink')
				.warnPalette('red')
				.backgroundPalette('customGrey', {
					'hue-1' : '50'
				});

			// Chatter Theme
			$mdThemingProvider.theme('chatter')
				.primaryPalette('light-blue')
				.accentPalette('pink')
				.warnPalette('red')
				.backgroundPalette('blue-grey')
				.dark();

			// Graph Sort Theme
			$mdThemingProvider.theme('graphsort')
				.primaryPalette('blue-grey')
				.accentPalette('pink')
				.warnPalette('red')
				.backgroundPalette('customGrey', {
					'hue-1' : '50'
				});
		}
	];
});