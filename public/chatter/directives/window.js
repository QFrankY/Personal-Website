define(function () {
	'use strict';

	return [
		'$http',
		'$mdDialog',
		'chatterSvc',
		'errorSvc',
		function ($http, $mdDialog, chatterSvc, errorSvc) {
			return {
				restrict    : 'E',
				templateUrl : '/directive/chatter/window',

				scope: {
					model: '='
				},

				link: {
					pre: function (scope, elem, attrs) {
						var model = scope.model;

					}
				} 
			};
		}
	];
});