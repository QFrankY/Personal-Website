define([
	'angular',
	'angular-material'

], function (ng) {
	'use strict';

	return [
		'$mdThemingProvider',
		function ($mdThemingProvider) {
			// Default theme
			var customGrey = $mdThemingProvider.extendPalette('grey', {
				'50'  : '#ffffff',
				'100' : '#eeeeee',
				'200' : '#eff0f1'
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
					'default' : '50',
					'hue-1'   : '50',
					'hue-2'   : '200'
				});

			// Chatter Theme
			var customLightBlue = $mdThemingProvider.extendPalette('light-blue', {
				'50'  : '#FFFCEB',
				'900' : '#37474F'
			});

			$mdThemingProvider.definePalette('customLightBlue', customLightBlue);

			// var customDarkBlue = $mdThemingProvider.extendPalette('blue', {
			// 	'50'  : '#ffffff',
			// 	'100' : '#f9f7f7',
			// 	'900' : '#2b333d'
			// });

			// $mdThemingProvider.definePalette('customDarkBlue', customDarkBlue);

			$mdThemingProvider.theme('chatter')
				.primaryPalette('light-blue')
				.accentPalette('indigo')
				.warnPalette('orange')
				.backgroundPalette('blue-grey')
				.dark();
		}
	];
});