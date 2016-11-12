define(function () {
	'use strict';

	return [
		'$http',
		'$mdDialog',
		'$timeout',
		'chatterSvc',
		'errorSvc',
		function ($http, $mdDialog, $timeout, chatterSvc, errorSvc) {
			return {
				restrict    : 'E',
				templateUrl : '/directive/chatter/window',

				scope: {
					model: '='
				},

				link: {
					pre: function (scope, elem, attrs) {
						var model = scope.model;

						model.menuOpen = false;

						scope.$watch('model.menuOpen', function (isOpen) {
							if (isOpen) {
								$timeout(function() {
									scope.tooltipVisible = model.menuOpen;
								}, 200);
							} else {
								scope.tooltipVisible = model.menuOpen;
							}
						});

						scope.leaveRoom = function (tab) {
							chatterSvc.leaveRoom(tab.name, tab.id).then(function () {
								for (var i = 0; i < model.tabs.length; i++) {
									if (model.tabs[i] === tab) {
										model.tabs.splice(i, 1);
										break;
									}
								}

								if (model.tabs.length === 0) {
									model.resetSidebar();
								}
							});
						};
					}
				} 
			};
		}
	];
});